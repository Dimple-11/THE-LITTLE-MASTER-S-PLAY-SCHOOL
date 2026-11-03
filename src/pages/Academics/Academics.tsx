import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sparkles, CheckCircle2, Clock, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { DataStore } from '@/services/store';
import { Program } from '@/types';
import {
  PlaygroupIllustration,
  NurseryIllustration,
  LkgIllustration,
  UkgIllustration,
} from '@/components/illustrations/ProgramIllustrations';

interface AcademicsProps {
  onOpenAdmission: (defaultClass?: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG') => void;
}

export const Academics: React.FC<AcademicsProps> = ({ onOpenAdmission }) => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    DataStore.getPrograms().then(setPrograms);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Early Childhood Education
        </span>
        <h1 className="text-4xl md:text-6xl font-bubble text-brand-brown">
          Joyful Learning Programs
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Thoughtfully sequenced developmental milestones from early toddlerhood to primary school readiness.
        </p>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((prog) => {
          const illustrations = {
            playgroup: <PlaygroupIllustration className="w-24 h-24" />,
            nursery: <NurseryIllustration className="w-24 h-24" />,
            lkg: <LkgIllustration className="w-24 h-24" />,
            ukg: <UkgIllustration className="w-24 h-24" />,
          };

          return (
            <div
              key={prog.id}
              className="bg-white rounded-5xl p-8 border-3 border-brand-yellow shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  {illustrations[prog.slug] || <PlaygroupIllustration className="w-24 h-24" />}
                  <div>
                    <h2 className="text-3xl font-bubble text-brand-brown">{prog.name}</h2>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-3 py-0.5 rounded-full bg-brand-cream border border-brand-orange/30 text-xs font-bold text-brand-deepOrange">
                        Age: {prog.age_group}
                      </span>
                      <span className="px-3 py-0.5 rounded-full bg-brand-cream border border-brand-yellow text-xs font-bold text-stone-600">
                        {prog.timing}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mb-6 font-medium">
                  {prog.full_description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold text-brand-brown uppercase tracking-wider">
                    Core Learning Objectives:
                  </p>
                  {prog.learning_objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-brand-cream flex flex-wrap gap-3">
                <Link
                  to={`/academics/${prog.slug}`}
                  className="px-5 py-2.5 rounded-full bg-brand-cream hover:bg-brand-yellow/30 text-brand-brown font-bubble text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span>Detailed Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                </Link>

                <button
                  onClick={() =>
                    onOpenAdmission(
                      prog.slug === 'playgroup'
                        ? 'Playgroup'
                        : prog.slug === 'nursery'
                        ? 'Nursery'
                        : prog.slug === 'lkg'
                        ? 'LKG'
                        : 'UKG'
                    )
                  }
                  className="px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-xs font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
                >
                  Enquire for {prog.name}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ProgramDetail: React.FC<AcademicsProps> = ({ onOpenAdmission }) => {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    DataStore.getPrograms().then((progs) => {
      const match = progs.find((p) => p.slug === slug);
      setProgram(match || progs[0]);
    });
  }, [slug]);

  if (!program) return null;

  const illustrations = {
    playgroup: <PlaygroupIllustration className="w-32 h-32 mx-auto" />,
    nursery: <NurseryIllustration className="w-32 h-32 mx-auto" />,
    lkg: <LkgIllustration className="w-32 h-32 mx-auto" />,
    ukg: <UkgIllustration className="w-32 h-32 mx-auto" />,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-white rounded-5xl p-8 md:p-12 border-4 border-brand-yellow shadow-card text-center space-y-4">
        {illustrations[program.slug] || <PlaygroupIllustration className="w-32 h-32 mx-auto" />}
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/30 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider inline-block">
          Class: {program.name}
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">{program.name} Program</h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-stone-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-orange" />
            <span>Age: {program.age_group}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-blue" />
            <span>Timing: {program.timing}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-4xl p-8 border-2 border-brand-orange/30 shadow-card space-y-4">
        <h2 className="text-2xl font-bubble text-brand-brown">Program Overview</h2>
        <p className="text-stone-700 leading-relaxed font-medium text-base md:text-lg">
          {program.full_description}
        </p>
      </div>

      {/* Objectives & Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-cream rounded-4xl p-6 border-2 border-brand-yellow space-y-3">
          <h3 className="text-xl font-bubble text-brand-brown">🎯 Learning Objectives</h3>
          <ul className="space-y-2">
            {program.learning_objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-brand-cream rounded-4xl p-6 border-2 border-brand-orange/30 space-y-3">
          <h3 className="text-xl font-bubble text-brand-brown">⭐ Special Features</h3>
          <ul className="space-y-2">
            {program.key_features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-700 font-semibold">
                <Sparkles className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Admission CTA Box */}
      <div className="bg-gradient-to-r from-brand-yellow/30 via-brand-peach/40 to-brand-cream rounded-4xl p-8 text-center border-2 border-brand-orange/40 space-y-4">
        <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown">
          Ready to Enroll in {program.name}?
        </h3>
        <p className="text-stone-600 text-sm max-w-md mx-auto font-medium">
          Seats are intentionally limited to preserve our caring child-to-teacher attention ratio.
        </p>
        <button
          onClick={() =>
            onOpenAdmission(
              program.slug === 'playgroup'
                ? 'Playgroup'
                : program.slug === 'nursery'
                ? 'Nursery'
                : program.slug === 'lkg'
                ? 'LKG'
                : 'UKG'
            )
          }
          className="px-8 py-3.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-base font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
        >
          Enquire for {program.name} Admission
        </button>
      </div>
    </div>
  );
};

export const LearningApproach: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green font-bubble text-sm font-bold uppercase tracking-wider">
          Pedagogical Framework
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          The Play-Way Learning Approach
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          How intentional play transforms active play into lasting cognitive and emotional foundations.
        </p>
      </div>

      <div className="bg-white rounded-5xl p-8 md:p-12 border-3 border-brand-green/40 shadow-card space-y-6 text-stone-700 leading-relaxed font-medium">
        <p>
          At The Little Master's Play Way School, <strong className="text-brand-brown">"Play-Way"</strong> is not simply free time; it is a meticulously structured educational approach where every song, puzzle, circle time discussion, and block-building session is mapped to key developmental milestones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-3xl bg-brand-cream border border-brand-yellow">
            <h4 className="font-bubble text-lg text-brand-brown mb-2">1. Hands-On Exploration</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Children manipulate real physical materials—counting wooden beads, blending playdough colors, planting tiny seeds—before encountering abstract numbers and letters.
            </p>
          </div>
          <div className="p-5 rounded-3xl bg-brand-cream border border-brand-yellow">
            <h4 className="font-bubble text-lg text-brand-brown mb-2">2. Language Immersion</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Phonics is taught through humorous character rhymes, animal sounds, rhythm claps, and interactive puppet conversations that children adore.
            </p>
          </div>
          <div className="p-5 rounded-3xl bg-brand-cream border border-brand-yellow">
            <h4 className="font-bubble text-lg text-brand-brown mb-2">3. Emotional Confidence</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We teach toddlers to name their feelings, celebrate their classmates’ victories, and develop resilience without fear of making a mistake.
            </p>
          </div>
          <div className="p-5 rounded-3xl bg-brand-cream border border-brand-yellow">
            <h4 className="font-bubble text-lg text-brand-brown mb-2">4. Holistic Readiness</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Graduates of our UKG enter formal primary schools with fluent early reading skills, solid arithmetic concepts, and eager, inquiring minds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
