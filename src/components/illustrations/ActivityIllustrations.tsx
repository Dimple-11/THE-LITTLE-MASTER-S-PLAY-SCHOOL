import React from 'react';

export const ArtCraftIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="30" fill="#FFE3CA" />
    {/* Wooden Palette */}
    <path
      d="M16 32 C16 22 24 16 34 16 C44 16 50 22 50 30 C50 38 46 42 42 42 C39 42 38 40 36 40 C34 40 33 42 33 44 C33 48 30 50 26 50 C20 50 16 42 16 32 Z"
      fill="#FFD929"
      stroke="#E87528"
      strokeWidth="2"
    />
    {/* Thumb Hole */}
    <ellipse cx="23" cy="36" rx="3.5" ry="4.5" fill="#FFE3CA" stroke="#E87528" strokeWidth="1.5" />
    {/* Color Spots */}
    <circle cx="28" cy="23" r="3.5" fill="#F21D1D" />
    <circle cx="36" cy="22" r="3.5" fill="#1749D6" />
    <circle cx="43" cy="27" r="3.5" fill="#07852C" />
    <circle cx="43" cy="35" r="3.5" fill="#FF941E" />
    {/* Paintbrush */}
    <g transform="translate(32, 28) rotate(-45)">
      <rect x="-2" y="8" width="4" height="24" rx="2" fill="#49301F" />
      <rect x="-3" y="2" width="6" height="6" fill="#CBD5E1" />
      <path d="M-3 2 C-3 -3 3 -3 3 2 Z" fill="#1749D6" />
    </g>
  </svg>
);

export const StorytellingIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
    {/* Open Book */}
    <path d="M12 44 C20 41 28 41 32 44 C36 41 44 41 52 44 L52 20 C44 17 36 17 32 20 C28 17 20 17 12 20 Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
    <line x1="32" y1="20" x2="32" y2="44" stroke="#0284C7" strokeWidth="2" />
    {/* Magical Sparkles coming out */}
    <polygon points="32,9 33.5,13 37,14 34,16 35,20 32,18 29,20 30,16 27,14 30.5,13" fill="#FFD929" stroke="#FF941E" strokeWidth="0.8" />
    <circle cx="24" cy="13" r="1.5" fill="#FF941E" />
    <circle cx="40" cy="13" r="1.5" fill="#FF941E" />
  </svg>
);

export const MusicDanceIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="30" fill="#FEF3C7" />
    {/* Xylophone / Musical notes */}
    <g transform="translate(14, 20)">
      {/* Wooden Bars */}
      <rect x="0" y="0" width="6" height="28" rx="2" fill="#F21D1D" />
      <rect x="8" y="3" width="6" height="25" rx="2" fill="#FF941E" />
      <rect x="16" y="6" width="6" height="22" rx="2" fill="#FFD929" />
      <rect x="24" y="9" width="6" height="19" rx="2" fill="#07852C" />
      <rect x="32" y="12" width="6" height="16" rx="2" fill="#1749D6" />
    </g>
    {/* Floating Note */}
    <path d="M42 16 L42 8 L50 6 L50 14 M42 12 L50 10" stroke="#FF941E" strokeWidth="2" fill="none" />
    <circle cx="40" cy="16" r="3" fill="#FF941E" />
    <circle cx="48" cy="14" r="3" fill="#FF941E" />
  </svg>
);

export const SportsIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="30" fill="#DCFCE7" />
    {/* Bouncing Colorful Ball */}
    <circle cx="32" cy="32" r="18" fill="#FFD929" stroke="#07852C" strokeWidth="2.5" />
    <path d="M20 24 Q32 30 44 24" stroke="#F21D1D" strokeWidth="3" fill="none" />
    <path d="M20 40 Q32 34 44 40" stroke="#1749D6" strokeWidth="3" fill="none" />
    {/* Action lines */}
    <path d="M24 10 L28 14" stroke="#07852C" strokeWidth="2" strokeLinecap="round" />
    <path d="M38 10 L34 14" stroke="#07852C" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CelebrationsIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="30" fill="#FCE7F3" />
    {/* Party Popper / Bunting */}
    <path d="M18 46 L30 20 L44 46 Z" fill="#FF941E" stroke="#E87528" strokeWidth="2" />
    <path d="M22 36 L38 36" stroke="#FFD929" strokeWidth="3" />
    {/* Confetti & Ribbons */}
    <circle cx="22" cy="16" r="2.5" fill="#F21D1D" />
    <circle cx="42" cy="18" r="2.5" fill="#1749D6" />
    <circle cx="32" cy="12" r="3" fill="#07852C" />
    <circle cx="46" cy="28" r="2" fill="#FFD929" />
    <path d="M30 16 Q34 8 38 12" stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const CreativeLearningIcon: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="32" cy="32" r="30" fill="#FEF9C3" />
    {/* Magnifying Glass */}
    <circle cx="28" cy="28" r="14" fill="#FFFFFF" stroke="#E87528" strokeWidth="3" />
    <line x1="38" y1="38" x2="52" y2="52" stroke="#49301F" strokeWidth="5" strokeLinecap="round" />
    {/* Little Green Sprout inside */}
    <path d="M28 35 L28 25" stroke="#07852C" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 27 C24 23 20 27 28 29" fill="#07852C" />
    <path d="M28 25 C32 21 36 25 28 27" fill="#07852C" />
  </svg>
);
