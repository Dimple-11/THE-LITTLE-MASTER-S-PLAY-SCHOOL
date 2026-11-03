import React from 'react';
import { motion } from 'framer-motion';

export const HeroPlaygroundIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-lg mx-auto flex items-center justify-center p-4 ${className}`}>
      {/* Decorative Aura / Background Glow */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-brand-yellow/30 filter blur-3xl -z-10 animate-pulse-soft" />
      <div className="absolute -bottom-6 w-80 h-32 rounded-full bg-brand-peach/50 filter blur-xl -z-10" />

      <svg
        viewBox="0 0 540 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl overflow-visible select-none"
      >
        <defs>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD929" />
            <stop offset="100%" stopColor="#FF941E" />
          </linearGradient>
          <linearGradient id="chalkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B9835" />
            <stop offset="100%" stopColor="#055C1E" />
          </linearGradient>
          <linearGradient id="bookCoverGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1749D6" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#49301F" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* --- 1. CHEERFUL SMILING SUN (TOP RIGHT) --- */}
        <g transform="translate(380, 45)">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {/* Sun Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1="0"
                y1="-44"
                x2="0"
                y2="-54"
                stroke="#FF941E"
                strokeWidth="5"
                strokeLinecap="round"
                transform={`rotate(${angle})`}
              />
            ))}
          </motion.g>
          {/* Sun Body */}
          <circle r="36" fill="url(#sunGrad)" filter="url(#softShadow)" />
          {/* Rosy Cheeks */}
          <ellipse cx="-16" cy="6" rx="6" ry="4" fill="#FF7A00" opacity="0.6" />
          <ellipse cx="16" cy="6" rx="6" ry="4" fill="#FF7A00" opacity="0.6" />
          {/* Eyes */}
          <circle cx="-12" cy="-4" r="3.5" fill="#49301F" />
          <circle cx="12" cy="-4" r="3.5" fill="#49301F" />
          {/* Smiling Mouth */}
          <path d="M-10 10 Q 0 20 10 10" stroke="#49301F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>

        {/* --- 2. CHALKBOARD (BACK CENTER) --- */}
        <g transform="translate(130, 70)" filter="url(#softShadow)">
          {/* Wooden Border */}
          <rect x="-10" y="-10" width="280" height="170" rx="18" fill="#E87528" stroke="#49301F" strokeWidth="3" />
          <rect x="-6" y="-6" width="272" height="162" rx="14" fill="#FFD929" opacity="0.3" />
          {/* Green Board */}
          <rect x="6" y="6" width="248" height="138" rx="10" fill="url(#chalkGrad)" />
          {/* Board Chalk Inscriptions */}
          <text x="28" y="44" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontSize="20" fontWeight="600" opacity="0.95">
            A B C  •  1 2 3
          </text>
          <text x="32" y="76" fill="#FFD929" fontFamily="Fredoka, sans-serif" fontSize="18" fontWeight="600">
            ★ 2 + 3 = 5
          </text>
          <text x="32" y="106" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontSize="16" opacity="0.85">
            Play • Learn • Grow
          </text>
          {/* Little Chalk & Duster on ledge */}
          <rect x="180" y="132" width="26" height="8" rx="3" fill="#FFFFFF" />
          <rect x="210" y="130" width="34" height="10" rx="2" fill="#D97706" />
        </g>

        {/* --- 3. FLOATING PAPER PLANE WITH DOTTED TRAIL --- */}
        <g>
          <path
            d="M 60 140 Q 110 80 200 60"
            stroke="#1749D6"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            fill="none"
            opacity="0.6"
          />
          <motion.g
            animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            transform="translate(195, 52) rotate(15)"
          >
            <polygon points="0,0 26,-6 10,14" fill="#FFFFFF" stroke="#1749D6" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="10,14 26,-6 14,0" fill="#E2E8F0" />
          </motion.g>
        </g>

        {/* --- 4. GIANT OPEN STORYBOOK (FRONT BOTTOM) --- */}
        <g transform="translate(90, 230)" filter="url(#softShadow)">
          {/* Blue Book Cover */}
          <path
            d="M 10 140 Q 180 160 180 80 Q 180 160 350 140 L 340 160 Q 180 180 180 100 Q 180 180 20 160 Z"
            fill="url(#bookCoverGrad)"
          />
          {/* Open Pages - Left Page */}
          <path
            d="M 15 130 C 50 115 120 115 175 125 L 175 40 C 120 30 50 30 15 45 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          {/* Open Pages - Right Page */}
          <path
            d="M 185 125 C 240 115 310 115 345 130 L 345 45 C 310 30 240 30 185 40 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          {/* Page Curvatures & Lines */}
          <path d="M 35 60 C 70 50 130 52 155 58" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 35 78 C 70 68 130 70 155 76" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 35 96 C 70 86 130 88 155 94" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Page Magic Illustration (Rainbow & Star) */}
          <path
            d="M 215 95 A 35 35 0 0 1 315 95"
            stroke="#FF941E"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 225 95 A 25 25 0 0 1 305 95"
            stroke="#FFD929"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 235 95 A 15 15 0 0 1 295 95"
            stroke="#07852C"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Magic Star popping from book */}
          <polygon
            points="265 42 268 50 276 51 270 56 272 64 265 60 258 64 260 56 254 51 262 50"
            fill="#FFD929"
            stroke="#FF941E"
            strokeWidth="1"
          />
        </g>

        {/* --- 5. 3D ALPHABET BLOCKS --- */}
        {/* Block A (Red - Bottom Left) */}
        <g transform="translate(35, 275)" filter="url(#softShadow)">
          <rect width="65" height="65" rx="14" fill="#F21D1D" />
          <rect x="4" y="4" width="57" height="57" rx="10" fill="#FF4D4D" />
          <text x="32" y="44" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontSize="36" fontWeight="700" textAnchor="middle">
            A
          </text>
        </g>

        {/* Block B (Royal Blue - Bottom Center-Right) */}
        <g transform="translate(435, 260)" filter="url(#softShadow)">
          <rect width="65" height="65" rx="14" fill="#1749D6" />
          <rect x="4" y="4" width="57" height="57" rx="10" fill="#3B82F6" />
          <text x="32" y="44" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontSize="36" fontWeight="700" textAnchor="middle">
            B
          </text>
        </g>

        {/* Block C (Chalkboard Green - Right Lower) */}
        <g transform="translate(390, 335)" filter="url(#softShadow)">
          <rect width="55" height="55" rx="12" fill="#07852C" />
          <rect x="4" y="4" width="47" height="47" rx="8" fill="#10B981" />
          <text x="27" y="38" fill="#FFFFFF" fontFamily="Fredoka, sans-serif" fontSize="30" fontWeight="700" textAnchor="middle">
            C
          </text>
        </g>

        {/* --- 6. CRAYONS / PENCILS IN FRONT --- */}
        {/* Yellow Crayon */}
        <g transform="translate(75, 360) rotate(-25)">
          <polygon points="0,0 20,-8 20,8" fill="#FF941E" />
          <rect x="20" y="-8" width="55" height="16" rx="3" fill="#FFD929" />
          <rect x="35" y="-8" width="12" height="16" fill="#FF941E" opacity="0.6" />
        </g>

        {/* Orange Crayon */}
        <g transform="translate(230, 385) rotate(10)">
          <polygon points="0,0 18,-7 18,7" fill="#E87528" />
          <rect x="18" y="-7" width="50" height="14" rx="2" fill="#FF941E" />
          <rect x="30" y="-7" width="10" height="14" fill="#E87528" opacity="0.7" />
        </g>

        {/* --- 7. FLOATING MUSICAL NOTES & SPARKLES --- */}
        <g transform="translate(80, 80)">
          <path d="M10 20 L 10 5 L 25 2 L 25 17 M 10 12 L 25 9" stroke="#E87528" strokeWidth="2.5" fill="none" />
          <circle cx="7" cy="20" r="4.5" fill="#E87528" />
          <circle cx="22" cy="17" r="4.5" fill="#E87528" />
        </g>
      </svg>
    </div>
  );
};
