import { Question, HintResult, HintType } from '@/types/game';
import { GoogleGenerativeAI } from '@google/generative-ai';

/* ---------------------------------------
   Gemini Setup (FINAL & CORRECT)
---------------------------------------- */

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: 'models/gemini-flash-latest', // ✅ EXACT from listModels
});

/* ---------------------------------------
   Utils
---------------------------------------- */

const simulateAPIDelay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 300)
  );

const sanitize = (text: string) =>
  text
    .replace(/correct answer.*$/gi, '')
    .replace(/option\s*\d+/gi, '')
    .replace(/\*\*/g, '')
    .trim();

/* ---------------------------------------
   Main Hint Generator
---------------------------------------- */

export async function generateHint(
  question: Question,
  hintType: HintType,
  hintStrength: 'weak' | 'medium' | 'strong'
): Promise<HintResult> {
  await simulateAPIDelay();

  // 🚀 LOCAL ELIMINATION (no AI cost)
  if (hintType === 'eliminate') {
    const wrongOptions = question.options
      .map((_, i) => i)
      .filter(i => i !== question.correctAnswer);

    const eliminated =
      wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

    return {
      type: 'eliminate',
      content: `❌ "${question.options[eliminated]}" is not correct.`,
      eliminatedOption: eliminated,
    };
  }

  try {
    const prompt = buildGeminiPrompt(
      question,
      hintType,
      hintStrength
    );

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ??
      getFallbackHint(question, hintStrength);

    return {
      type: hintType,
      content: sanitize(text),
    };
  } catch (error) {
    console.error('Gemini Hint Error:', error);

    // 🔁 FALLBACK (offline-safe)
    return {
      type: hintType,
      content: getFallbackHint(question, hintStrength),
    };
  }
}

/* ---------------------------------------
   Explain Correct Answer
---------------------------------------- */

export async function explainAnswer(
  question: Question
): Promise<string> {
  await simulateAPIDelay();

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
Explain this answer simply for a student.

Question:
${question.question}

Correct Answer:
${question.options[question.correctAnswer]}

Keep it short, simple, and educational.
              `,
            },
          ],
        },
      ],
    });

    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    return sanitize(text ?? question.explanation);
  } catch {
    return question.explanation;
  }
}

/* ---------------------------------------
   Encouragement Generator (Local)
---------------------------------------- */

export async function generateEncouragement(
  isCorrect: boolean,
  streak: number,
  lives: number
): Promise<string> {
  await simulateAPIDelay();

  if (isCorrect) {
    if (streak >= 5)
      return `🔥 ${streak} in a row! You’re unstoppable!`;

    if (streak >= 3)
      return `⭐ Awesome streak! Keep going!`;

    return [
      '🌟 Amazing work!',
      '🌍 Great job helping the planet!',
      '♻️ Eco-genius move!',
      '🌱 You’re learning fast!',
    ][Math.floor(Math.random() * 4)];
  }

  if (lives <= 1)
    return '⚠️ Last life! Think carefully!';

  return [
    '💪 Don’t give up!',
    '🌱 Every mistake helps you learn!',
    '📘 You’re improving!',
    '🌍 Try again — you got this!',
  ][Math.floor(Math.random() * 4)];
}

/* ---------------------------------------
   Gemini Prompt Builder
---------------------------------------- */

function buildGeminiPrompt(
  question: Question,
  hintType: HintType,
  strength: 'weak' | 'medium' | 'strong'
): string {
  return `
You are an educational assistant for school students.

RULES:
- DO NOT reveal the correct answer
- DO NOT mention option numbers
- Use simple language
- Max 2 sentences

Hint type: ${hintType}
Hint strength: ${strength}

Question:
"${question.question}"

Options:
${question.options.join(', ')}

Topic: ${question.topic}

Provide a helpful learning hint.
`;
}

/* ---------------------------------------
   Offline Fallback
---------------------------------------- */

function getFallbackHint(
  question: Question,
  strength: 'weak' | 'medium' | 'strong'
): string {
  if (strength === 'weak')
    return 'Think about what best protects the environment 🌱';

  if (strength === 'medium')
    return `Focus on the idea related to ${question.topic}.`;

  return question.explanation.split('.')[0];
}
