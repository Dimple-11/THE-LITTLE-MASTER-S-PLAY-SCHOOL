import React from 'react';

export const PlaygroupIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="46" fill="#FFF9E9" stroke="#FFD929" strokeWidth="4" />
    {/* Teddy Bear Head */}
    <circle cx="30" cy="30" r="10" fill="#E87528" />
    <circle cx="30" cy="30" r="5" fill="#FFE3CA" />
    <circle cx="70" cy="30" r="10" fill="#E87528" />
    <circle cx="70" cy="30" r="5" fill="#FFE3CA" />
    <circle cx="50" cy="50" r="24" fill="#FF941E" />
    {/* Snout */}
    <ellipse cx="50" cy="56" rx="11" ry="8" fill="#FFE3CA" />
    <ellipse cx="50" cy="52" rx="4" ry="2.5" fill="#49301F" />
    <path d="M47 57 Q50 61 53 57" stroke="#49301F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    {/* Eyes */}
    <circle cx="41" cy="45" r="3" fill="#49301F" />
    <circle cx="59" cy="45" r="3" fill="#49301F" />
    {/* Rosy Cheeks */}
    <circle cx="36" cy="52" r="3" fill="#F21D1D" opacity="0.4" />
    <circle cx="64" cy="52" r="3" fill="#F21D1D" opacity="0.4" />
    {/* Cute Bowtie */}
    <polygon points="43,72 57,72 50,77" fill="#F21D1D" />
    <circle cx="50" cy="74" r="2.5" fill="#FFD929" />
  </svg>
);

export const NurseryIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="46" fill="#FFF9E9" stroke="#FF941E" strokeWidth="4" />
    {/* Butterfly Body */}
    <ellipse cx="50" cy="52" rx="3.5" ry="16" fill="#49301F" />
    <circle cx="50" cy="33" r="5" fill="#49301F" />
    {/* Antennae */}
    <path d="M48 30 Q42 22 38 24" stroke="#49301F" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M52 30 Q58 22 62 24" stroke="#49301F" strokeWidth="1.5" strokeLinecap="round" />
    {/* Wings - Top Left */}
    <path d="M47 44 C26 26 18 48 46 54 Z" fill="#FFD929" stroke="#FF941E" strokeWidth="2" />
    <circle cx="34" cy="42" r="4" fill="#F21D1D" opacity="0.8" />
    {/* Wings - Bottom Left */}
    <path d="M47 56 C28 58 26 74 46 66 Z" fill="#FF941E" stroke="#E87528" strokeWidth="2" />
    {/* Wings - Top Right */}
    <path d="M53 44 C74 26 82 48 54 54 Z" fill="#FFD929" stroke="#FF941E" strokeWidth="2" />
    <circle cx="66" cy="42" r="4" fill="#1749D6" opacity="0.8" />
    {/* Wings - Bottom Right */}
    <path d="M53 56 C72 58 74 74 54 66 Z" fill="#FF941E" stroke="#E87528" strokeWidth="2" />
    {/* Flower accent */}
    <circle cx="75" cy="75" r="5" fill="#07852C" />
    <circle cx="75" cy="75" r="2" fill="#FFD929" />
  </svg>
);

export const LkgIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="46" fill="#FFF9E9" stroke="#1749D6" strokeWidth="4" />
    {/* Abacus frame */}
    <rect x="24" y="24" width="52" height="52" rx="8" fill="#FFFFFF" stroke="#1749D6" strokeWidth="3" />
    {/* Wire 1 */}
    <line x1="28" y1="36" x2="72" y2="36" stroke="#94A3B8" strokeWidth="2" />
    <circle cx="36" cy="36" r="5" fill="#F21D1D" />
    <circle cx="48" cy="36" r="5" fill="#F21D1D" />
    <circle cx="64" cy="36" r="5" fill="#FFD929" />
    {/* Wire 2 */}
    <line x1="28" y1="50" x2="72" y2="50" stroke="#94A3B8" strokeWidth="2" />
    <circle cx="38" cy="50" r="5" fill="#07852C" />
    <circle cx="54" cy="50" r="5" fill="#1749D6" />
    <circle cx="65" cy="50" r="5" fill="#1749D6" />
    {/* Wire 3 */}
    <line x1="28" y1="64" x2="72" y2="64" stroke="#94A3B8" strokeWidth="2" />
    <circle cx="35" cy="64" r="5" fill="#FF941E" />
    <circle cx="46" cy="64" r="5" fill="#FF941E" />
    <circle cx="57" cy="64" r="5" fill="#FF941E" />
  </svg>
);

export const UkgIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="46" fill="#FFF9E9" stroke="#07852C" strokeWidth="4" />
    {/* Rocket */}
    <g transform="translate(50, 48) rotate(-35)">
      {/* Flame */}
      <polygon points="-5,28 0,42 5,28" fill="#F21D1D" />
      <polygon points="-3,28 0,36 3,28" fill="#FFD929" />
      {/* Rocket Body */}
      <path d="M-12,24 C-12,24 -14,-14 0,-28 C14,-14 12,24 12,24 Z" fill="#FFFFFF" stroke="#07852C" strokeWidth="2" />
      {/* Rocket Nose Tip */}
      <path d="M-8,-14 C-8,-14 0,-28 0,-28 C0,-28 8,-14 8,-14 Z" fill="#F21D1D" />
      {/* Porthole */}
      <circle cx="0" cy="0" r="6" fill="#1749D6" stroke="#FFD929" strokeWidth="2" />
      {/* Fins */}
      <path d="M-12,14 L-20,24 L-12,24 Z" fill="#FF941E" />
      <path d="M12,14 L20,24 L12,24 Z" fill="#FF941E" />
    </g>
    {/* Little Star */}
    <polygon points="76,28 78,32 83,32 79,35 81,39 76,37 72,39 74,35 70,32 75,32" fill="#FFD929" />
  </svg>
);
