import React, { useState } from 'react';
import { BookOpen, Check, Save, Sparkles } from 'lucide-react';
import { Program } from '@/types';
import { DataStore } from '@/services/store';

interface ProgramsModuleProps {
  programs: Program[];
  onRefresh: () => void;
}

export const ProgramsModule: React.FC<ProgramsModuleProps> = ({ programs, onRefresh }) => {
  const [selectedProg, setSelectedProg] = useState<Program | null>(programs[0] || null);
  const [ageGroup, setAgeGroup] = useState(programs[0]?.age_group || '');
  const [timing, setTiming] = useState(programs[0]?.timing || '');
  const [shortDesc, setShortDesc] = useState(programs[0]?.short_description || '');
  const [fullDesc, setFullDesc] = useState(programs[0]?.full_description || '');
  const [objectives, setObjectives] = useState(programs[0]?.learning_objectives.join('\n') || '');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const selectProgram = (prog: Program) => {
    setSelectedProg(prog);
    setAgeGroup(prog.age_group);
    setTiming(prog.timing);
    setShortDesc(prog.short_description);
    setFullDesc(prog.full_description);
    setObjectives(prog.learning_objectives.join('\n'));
    setSavedMsg(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProg) return;

    setIsSaving(true);
    try {
      await DataStore.updateProgram(selectedProg.id, {
        age_group: ageGroup.trim(),
        timing: timing.trim(),
        short_description: shortDesc.trim(),
        full_description: fullDesc.trim(),
        learning_objectives: objectives.split('\n').filter((l) => l.trim().length > 0),
      });
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
      onRefresh();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bubble text-brand-brown">Programs Management</h1>
        <p className="text-stone-500 text-sm">
          Edit age eligibility, class timings, and curriculum highlights for all four grades
        </p>
      </div>

      {/* Program Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {programs.map((prog) => (
          <button
            key={prog.id}
            onClick={() => selectProgram(prog)}
            className={`px-5 py-2.5 rounded-full font-bubble text-sm transition-all cursor-pointer ${
              selectedProg?.id === prog.id
                ? 'bg-brand-orange text-white shadow-playful-orange font-bold'
                : 'bg-white hover:bg-brand-yellow/30 text-brand-brown border border-brand-orange/20'
            }`}
          >
            {prog.name}
          </button>
        ))}
      </div>

      {selectedProg && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-4xl p-6 md:p-8 border-3 border-brand-yellow shadow-card space-y-4"
        >
          <div className="flex items-center justify-between border-b border-brand-cream pb-3">
            <h3 className="text-2xl font-bubble text-brand-brown">
              Editing: {selectedProg.name}
            </h3>
            {savedMsg && (
              <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Age Eligibility Range *
              </label>
              <input
                required
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                placeholder="e.g. 1.5 to 2.5 Years"
                className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                Daily Class Timings *
              </label>
              <input
                required
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="e.g. 9:00 AM - 12:30 PM"
                className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Short Description (Card Summary) *
            </label>
            <input
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Full Program Overview *
            </label>
            <textarea
              required
              rows={3}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Learning Objectives (One objective per line)
            </label>
            <textarea
              rows={4}
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="Sensory exploration&#10;Language building&#10;Social warmth"
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Program Updates'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
