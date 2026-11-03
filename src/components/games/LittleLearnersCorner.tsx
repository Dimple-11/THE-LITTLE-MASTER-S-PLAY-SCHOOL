import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Trophy, Heart, Star, CheckCircle2, Award } from 'lucide-react';

type GameMode = 'colors' | 'shapes' | 'alphabet' | 'counting' | 'numbers';

// Game 1: Color questions
const COLOR_QUESTIONS = [
  { targetColor: '#FFD929', colorName: 'Sunshine Yellow', options: ['#FFD929', '#1749D6', '#07852C', '#F21D1D'] },
  { targetColor: '#F21D1D', colorName: 'Apple Red', options: ['#07852C', '#F21D1D', '#FF941E', '#1749D6'] },
  { targetColor: '#1749D6', colorName: 'Royal Blue', options: ['#FFD929', '#1749D6', '#07852C', '#FF941E'] },
  { targetColor: '#07852C', colorName: 'Chalkboard Green', options: ['#07852C', '#FFD929', '#F21D1D', '#1749D6'] },
  { targetColor: '#FF941E', colorName: 'Tangerine Orange', options: ['#1749D6', '#07852C', '#FF941E', '#F21D1D'] },
];

// Game 2: Shapes
const SHAPE_QUESTIONS = [
  { targetShape: 'star', shapeName: 'Shining Star', options: ['circle', 'star', 'square', 'triangle'] },
  { targetShape: 'circle', shapeName: 'Round Circle', options: ['triangle', 'square', 'circle', 'heart'] },
  { targetShape: 'heart', shapeName: 'Sweet Heart', options: ['heart', 'star', 'circle', 'triangle'] },
  { targetShape: 'triangle', shapeName: 'Three-corner Triangle', options: ['square', 'triangle', 'circle', 'star'] },
];

// Game 3: Alphabet
const ALPHABET_QUESTIONS = [
  { letter: 'A', word: 'Apple', emoji: '🍎', options: ['A', 'B', 'C', 'D'] },
  { letter: 'B', word: 'Butterfly', emoji: '🦋', options: ['M', 'B', 'P', 'S'] },
  { letter: 'C', word: 'Crayon', emoji: '🖍️', options: ['D', 'C', 'O', 'G'] },
  { letter: 'S', word: 'Sun', emoji: '☀️', options: ['Z', 'T', 'S', 'F'] },
];

// Game 4: Counting
const COUNTING_QUESTIONS = [
  { count: 3, itemEmoji: '⭐', name: 'Stars', options: [2, 3, 4, 5] },
  { count: 4, itemEmoji: '🐥', name: 'Ducklings', options: [3, 4, 5, 2] },
  { count: 2, itemEmoji: '🎈', name: 'Balloons', options: [1, 2, 3, 4] },
  { count: 5, itemEmoji: '🌸', name: 'Flowers', options: [4, 5, 3, 6] },
];

// Game 5: Numbers
const NUMBER_QUESTIONS = [
  { number: 1, dots: 1, options: [1, 2, 3] },
  { number: 4, dots: 4, options: [3, 4, 5] },
  { number: 3, dots: 3, options: [2, 3, 4] },
  { number: 5, dots: 5, options: [4, 5, 6] },
];

export const LittleLearnersCorner: React.FC = () => {
  const [activeMode, setActiveMode] = useState<GameMode>('colors');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD929', '#FF941E', '#1749D6', '#07852C', '#F21D1D'],
      });
    } catch {
      // fallback
    }
  };

  const handleCorrect = () => {
    setFeedback('correct');
    setScore((s) => s + 1);
    triggerConfetti();
    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex((prev) => prev + 1);
    }, 1200);
  };

  const handleWrong = () => {
    setFeedback('wrong');
    setTimeout(() => setFeedback(null), 1000);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="bg-gradient-to-b from-brand-cream via-brand-peach/30 to-brand-cream py-16 px-4 md:px-8 relative overflow-hidden rounded-5xl border-4 border-brand-yellow/40 shadow-card">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/30 border border-brand-yellow text-brand-brown font-bubble text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-brand-orange animate-wiggle" />
          <span>Interactive Play Station</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bubble text-brand-brown mb-3">
          Little Learners' Corner
        </h2>
        <p className="text-stone-600 font-medium text-base md:text-lg">
          Tap, match, count, and learn! Simple playful brain-boosters designed for happy toddlers.
        </p>

        {/* Game Mode Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {(
            [
              { id: 'colors', label: '🎨 Colors' },
              { id: 'shapes', label: '⭐ Shapes' },
              { id: 'alphabet', label: '🔤 Alphabet' },
              { id: 'counting', label: '🐥 Counting' },
              { id: 'numbers', label: '🔢 Numbers' },
            ] as const
          ).map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setActiveMode(mode.id);
                resetGame();
              }}
              className={`px-4 py-2 rounded-full font-bubble text-sm md:text-base transition-all duration-200 ${
                activeMode === mode.id
                  ? 'bg-brand-orange text-white shadow-playful-orange scale-105'
                  : 'bg-white hover:bg-brand-yellow/30 text-brand-brown border border-brand-orange/20'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Play Area */}
      <div className="max-w-xl mx-auto bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card relative">
        {/* Game Header Score */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-cream">
          <div className="flex items-center gap-2 font-bubble text-brand-brown text-lg">
            <Trophy className="w-6 h-6 text-brand-yellow" />
            <span>Stars: {score}</span>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-orange transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Start Over</span>
          </button>
        </div>

        {/* FEEDBACK OVERLAY */}
        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 rounded-4xl flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-12 h-12 text-brand-green" />
              </div>
              <h4 className="text-3xl font-bubble text-brand-green mb-1">Super Job, Little Master! 🌟</h4>
              <p className="text-stone-600 font-semibold">That's exactly right!</p>
            </motion.div>
          )}

          {feedback === 'wrong' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 rounded-4xl flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-brand-orange/20 flex items-center justify-center mb-3">
                <Heart className="w-10 h-10 text-brand-orange animate-pulse" />
              </div>
              <h4 className="text-2xl font-bubble text-brand-orange mb-1">Almost! Try Again!</h4>
              <p className="text-stone-600 font-medium">Give it another playful tap!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. COLOR IDENTIFICATION GAME */}
        {activeMode === 'colors' && (
          <div>
            {(() => {
              const q = COLOR_QUESTIONS[currentIndex % COLOR_QUESTIONS.length];
              return (
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-1">Touch the Color</p>
                  <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown mb-6">
                    Where is <span className="underline decoration-wavy decoration-brand-yellow">{q.colorName}</span>?
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {q.options.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => (col === q.targetColor ? handleCorrect() : handleWrong())}
                        style={{ backgroundColor: col }}
                        className="h-28 md:h-32 rounded-3xl border-4 border-white shadow-playful hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                        aria-label={`Color option ${idx + 1}`}
                      >
                        <span className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 2. SHAPE MATCHING GAME */}
        {activeMode === 'shapes' && (
          <div>
            {(() => {
              const q = SHAPE_QUESTIONS[currentIndex % SHAPE_QUESTIONS.length];
              return (
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-blue mb-1">Shape Discovery</p>
                  <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown mb-6">
                    Find the <span className="text-brand-blue">{q.shapeName}</span>!
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {q.options.map((shape, idx) => (
                      <button
                        key={idx}
                        onClick={() => (shape === q.targetShape ? handleCorrect() : handleWrong())}
                        className="h-28 md:h-32 rounded-3xl bg-brand-cream hover:bg-brand-yellow/30 border-2 border-brand-orange/30 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center p-4 shadow-sm"
                      >
                        {shape === 'circle' && <div className="w-16 h-16 rounded-full bg-brand-blue" />}
                        {shape === 'square' && <div className="w-16 h-16 rounded-2xl bg-brand-red" />}
                        {shape === 'triangle' && (
                          <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[56px] border-b-brand-green" />
                        )}
                        {shape === 'star' && <Star className="w-18 h-18 text-brand-yellow fill-brand-yellow" />}
                        {shape === 'heart' && <Heart className="w-16 h-16 text-brand-red fill-brand-red" />}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 3. ALPHABET RECOGNITION */}
        {activeMode === 'alphabet' && (
          <div>
            {(() => {
              const q = ALPHABET_QUESTIONS[currentIndex % ALPHABET_QUESTIONS.length];
              return (
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-red mb-1">Alphabet Fun</p>
                  <div className="text-6xl mb-2">{q.emoji}</div>
                  <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown mb-6">
                    What letter starts <span className="text-brand-red font-bold">"{q.word}"</span>?
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {q.options.map((letOpt, idx) => (
                      <button
                        key={idx}
                        onClick={() => (letOpt === q.letter ? handleCorrect() : handleWrong())}
                        className="h-24 md:h-28 rounded-3xl bg-brand-cream hover:bg-brand-yellow/40 border-2 border-brand-orange/30 font-bubble text-4xl text-brand-brown font-extrabold shadow-playful hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                      >
                        {letOpt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 4. COUNTING OBJECTS */}
        {activeMode === 'counting' && (
          <div>
            {(() => {
              const q = COUNTING_QUESTIONS[currentIndex % COUNTING_QUESTIONS.length];
              return (
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-green mb-1">Little Mathematician</p>
                  <h3 className="text-2xl font-bubble text-brand-brown mb-4">
                    Count the {q.name}!
                  </h3>

                  {/* Display Items */}
                  <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-brand-cream/60 rounded-3xl mb-6 min-h-[90px]">
                    {Array.from({ length: q.count }).map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="text-4xl"
                      >
                        {q.itemEmoji}
                      </motion.span>
                    ))}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-4 gap-3">
                    {q.options.map((num, idx) => (
                      <button
                        key={idx}
                        onClick={() => (num === q.count ? handleCorrect() : handleWrong())}
                        className="h-20 rounded-2xl bg-white hover:bg-brand-green/20 border-2 border-brand-green font-bubble text-3xl font-bold text-brand-brown shadow-playful-green hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* 5. NUMBER RECOGNITION */}
        {activeMode === 'numbers' && (
          <div>
            {(() => {
              const q = NUMBER_QUESTIONS[currentIndex % NUMBER_QUESTIONS.length];
              return (
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-orange mb-1">Number Match</p>
                  <h3 className="text-2xl font-bubble text-brand-brown mb-4">
                    Count the dots and match the number!
                  </h3>

                  <div className="flex items-center justify-center gap-3 p-4 bg-brand-peach/40 rounded-3xl mb-6 min-h-[80px]">
                    {Array.from({ length: q.dots }).map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-brand-orange shadow-sm" />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {q.options.map((n, idx) => (
                      <button
                        key={idx}
                        onClick={() => (n === q.number ? handleCorrect() : handleWrong())}
                        className="h-24 rounded-3xl bg-brand-cream hover:bg-brand-orange/20 border-2 border-brand-orange font-bubble text-4xl font-extrabold text-brand-brown shadow-playful hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
