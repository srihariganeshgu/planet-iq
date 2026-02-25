import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const videos = [
  {
    title: 'Waste Management',
    src: '/Learn/WasteManagement.mp4',
  },
  {
    title: 'Greenhouse Effect',
    src: '/Learn/GreenHouse.mp4',
  },
  {
    title: 'Global Warming',
    src: '/Learn/GlobalWarming.mp4',
  },
];

export default function Learn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-eco px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            Learn & Explore 🌱
          </h1>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="
                relative rounded-2xl p-[2px]
                bg-gradient-to-br from-primary/60 via-accent/40 to-secondary/60
                shadow-xl
              "
            >
              {/* Inner frame */}
              <div className="rounded-2xl bg-background/90 backdrop-blur p-4">
                {/* Title Bar */}
                <div className="flex items-center gap-2 mb-3">
                  <PlayCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    {video.title}
                  </h2>
                </div>

                {/* Video (NO BACKGROUND) */}
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="
                    w-full
                    aspect-video
                    rounded-xl
                    bg-black
                  "
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
