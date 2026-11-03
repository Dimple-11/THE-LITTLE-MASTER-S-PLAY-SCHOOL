import React from 'react';
import { motion } from 'framer-motion';

export const FloatingDoodles: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Golden Star 1 */}
      <motion.svg
        animate={{ y: [0, -14, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-[6%] w-9 h-9 text-brand-yellow drop-shadow-sm opacity-80"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </motion.svg>

      {/* Musical Note 1 - Royal Blue */}
      <motion.svg
        animate={{ y: [0, -18, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-28 right-[10%] w-8 h-8 text-brand-blue opacity-75"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </motion.svg>

      {/* Tangerine Orange Crayon / Pencil */}
      <motion.svg
        animate={{ y: [0, 15, 0], rotate: [25, 35, 25] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[48%] left-[3%] w-10 h-10 text-brand-orange opacity-70"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </motion.svg>

      {/* Fluffy White/Cream Cloud */}
      <motion.svg
        animate={{ x: [0, 20, 0], y: [0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 right-[28%] w-16 h-10 text-white/90 drop-shadow-sm"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </motion.svg>

      {/* Red Letter A Block */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-20 left-[8%] hidden md:flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-red text-white font-bubble text-xl font-bold shadow-playful-red"
      >
        A
      </motion.div>

      {/* Chalkboard Green Dot */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-[4%] w-4 h-4 rounded-full bg-brand-green"
      />

      {/* Sunshine Yellow Star 2 */}
      <motion.svg
        animate={{ y: [0, 12, 0], rotate: [0, -25, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-16 right-[7%] w-10 h-10 text-brand-yellow drop-shadow-sm opacity-85"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </motion.svg>
    </div>
  );
};
