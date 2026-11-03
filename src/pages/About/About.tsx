import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Sparkles, BookOpen, Smile, ShieldCheck, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          About Our School
        </span>
        <h1 className="text-4xl md:text-6xl font-bubble text-brand-brown">
          Where Every Child Is A Master of Their Own Imagination
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          The Little Master's Play Way School was founded with a singular, joyful mission: to provide a vibrant, safe, and nurturing environment where early childhood is celebrated every single day.
        </p>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white rounded-5xl p-8 md:p-12 border-3 border-brand-yellow shadow-card space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-orange text-white flex items-center justify-center font-bubble text-2xl">
            🌱
          </div>
          <h2 className="text-3xl font-bubble text-brand-brown">Our Purpose & Vision</h2>
          <p className="text-stone-600 leading-relaxed font-medium">
            We understand that a child's earliest memories of school shape their attitude toward learning for decades to come. That is why our curriculum replaces rigid drills with tactile exploration, cooperative games, imaginative storytelling, and warm emotional encouragement.
          </p>
          <div className="space-y-3 pt-2 font-semibold text-stone-700 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span>Cultivating natural curiosity, wonder, and empathy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span>Building communication skills through joyful self-expression</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              <span>Instilling emotional confidence before formal academics begin</span>
            </div>
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Our Story',
              desc: 'How our joyful community was born from love for children.',
              href: '/about/story',
              emoji: '📖',
            },
            {
              title: 'Our Philosophy',
              desc: 'Why play-way learning forms the bedrock of our pedagogy.',
              href: '/about/philosophy',
              emoji: '✨',
            },
            {
              title: "Principal's Message",
              desc: 'A warm note of welcome from our school leadership.',
              href: '/about/principal',
              emoji: '💌',
            },
            {
              title: 'Our Facilities',
              desc: 'Explore our child-safe, hygienic learning spaces.',
              href: '/about/facilities',
              emoji: '🏫',
            },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className="bg-brand-cream hover:bg-white rounded-3xl p-6 border-2 border-brand-orange/30 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bubble text-xl text-brand-brown mb-1">{item.title}</h3>
                <p className="text-stone-600 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-bold text-brand-deepOrange">
                <span>Discover more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
