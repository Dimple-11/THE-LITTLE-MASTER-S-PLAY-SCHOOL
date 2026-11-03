import React, { useState, useEffect } from 'react';
import { FileEdit, Save, Check, Sparkles } from 'lucide-react';
import { DataStore } from '@/services/store';
import { PageContent } from '@/types';

export const ContentModule: React.FC = () => {
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroBody, setHeroBody] = useState('');

  const [welcomeTitle, setWelcomeTitle] = useState('');
  const [welcomeSubtitle, setWelcomeSubtitle] = useState('');
  const [welcomeBody, setWelcomeBody] = useState('');

  const [principalTitle, setPrincipalTitle] = useState('');
  const [principalBody, setPrincipalBody] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [h, w, p] = await Promise.all([
        DataStore.getPageContent('home_hero'),
        DataStore.getPageContent('home_welcome'),
        DataStore.getPageContent('principals_message'),
      ]);
      setHeroTitle(h.title || 'Little Steps, Big Dreams!');
      setHeroSubtitle(h.subtitle || 'Every little mind has a big world waiting to be discovered.');
      setHeroBody(h.body_text || '');

      setWelcomeTitle(w.title || "Welcome to The Little Master's Play Way School");
      setWelcomeSubtitle(w.subtitle || 'A warm, nurturing second home for your child');
      setWelcomeBody(w.body_text || '');

      setPrincipalTitle(p.title || 'Message from the Principal');
      setPrincipalBody(p.body_text || '');
    };
    load();
  }, []);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await Promise.all([
        DataStore.updatePageContent('home_hero', {
          title: heroTitle,
          subtitle: heroSubtitle,
          body_text: heroBody,
        }),
        DataStore.updatePageContent('home_welcome', {
          title: welcomeTitle,
          subtitle: welcomeSubtitle,
          body_text: welcomeBody,
        }),
        DataStore.updatePageContent('principals_message', {
          title: principalTitle,
          body_text: principalBody,
        }),
      ]);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bubble text-brand-brown">Website Content (CMS)</h1>
          <p className="text-stone-500 text-sm">
            Modify homepage banners, welcome greetings, and leadership messages
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Hero Section Card */}
        <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-cream pb-3">
            <span className="w-8 h-8 rounded-xl bg-brand-yellow/30 text-brand-deepOrange flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h3 className="text-xl font-bubble text-brand-brown">Homepage Hero Banner</h3>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Hero Big Headline
            </label>
            <input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Supporting Sub-headline
            </label>
            <input
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Hero Paragraph Text
            </label>
            <textarea
              rows={2}
              value={heroBody}
              onChange={(e) => setHeroBody(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange resize-none"
            />
          </div>
        </div>

        {/* Welcome Section Card */}
        <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-orange/30 shadow-card space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-cream pb-3">
            <span className="w-8 h-8 rounded-xl bg-brand-orange/20 text-brand-deepOrange flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h3 className="text-xl font-bubble text-brand-brown">Welcome Section</h3>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Section Title
            </label>
            <input
              value={welcomeTitle}
              onChange={(e) => setWelcomeTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Section Body Text
            </label>
            <textarea
              rows={3}
              value={welcomeBody}
              onChange={(e) => setWelcomeBody(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange resize-none"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between bg-white rounded-3xl p-4 border-2 border-brand-yellow shadow-card sticky bottom-4 z-20">
          <div className="text-xs text-stone-500 font-semibold">
            {savedMsg ? (
              <span className="text-brand-green font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Content changes published live!
              </span>
            ) : (
              'Changes update immediately across the entire website.'
            )}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing...' : 'Save & Publish CMS Content'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
