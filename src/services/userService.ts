import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export async function savePlayerName(name: string) {
  if (!auth.currentUser) return;

  const ref = doc(db, 'users', auth.currentUser.uid);
  await updateDoc(ref, { name });
}
