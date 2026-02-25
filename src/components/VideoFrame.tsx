import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

interface VideoFrameProps {
  title: string;
  src: string;
}

export default function VideoFrame({ title, src }: VideoFrameProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="
        relative rounded-2xl overflow-hidden
        border border-primary/30
        bg-gradient-to-br from-primary/10 to-secondary/5
        shadow-lg hover:shadow-xl
      "
    >
      {/* Title Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur text-white">
        <PlayCircle className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>

      {/* Video */}
      <div className="p-3">
        <video
          controls
          preload="metadata"
          playsInline
          className="w-full rounded-xl bg-black"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
}
