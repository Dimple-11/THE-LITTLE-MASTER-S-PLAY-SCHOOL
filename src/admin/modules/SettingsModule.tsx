import React, { useState } from 'react';
import { Settings, Save, Check, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { SchoolSettings } from '@/types';
import { DataStore } from '@/services/store';
import { isSupabaseConfigured } from '@/lib/supabase';

interface SettingsModuleProps {
  settings: SchoolSettings;
  onRefresh: () => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({ settings, onRefresh }) => {
  const [formData, setFormData] = useState<SchoolSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const isLiveDb = isSupabaseConfigured();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await DataStore.updateSettings(formData);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2500);
      onRefresh();
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Reset demo data to initial factory state? Any custom additions in local storage will be refreshed.'
      )
    ) {
      DataStore.resetAllDemoData();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bubble text-brand-brown">School Settings & Contact Info</h1>
        <p className="text-stone-500 text-sm">
          Update phone numbers, WhatsApp, timings, campus address, and admission availability
        </p>
      </div>

      {/* Database Connection Info Box */}
      <div
        className={`p-4 rounded-3xl border-2 flex items-start gap-3 ${
          isLiveDb
            ? 'bg-green-50/80 border-brand-green/30 text-green-900'
            : 'bg-brand-peach/60 border-brand-orange/30 text-stone-800'
        }`}
      >
        <div className="mt-0.5">
          {isLiveDb ? (
            <ShieldCheck className="w-5 h-5 text-brand-green" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-brand-orange" />
          )}
        </div>
        <div className="text-xs leading-relaxed">
          <p className="font-bold">
            {isLiveDb
              ? 'Database Status: Connected to Live Supabase Backend'
              : 'Database Status: Local Demo / Offline Storage Active'}
          </p>
          <p className="mt-0.5 text-stone-600">
            {isLiveDb
              ? 'All enquiries, photos, notices, and settings are synchronizing directly with your PostgreSQL database.'
              : 'The website and admin dashboard are operating on real-time browser persistence. To link a production cloud database, add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env and run supabase/schema.sql.'}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-4xl p-6 md:p-8 border-3 border-brand-yellow shadow-card space-y-4"
      >
        <div className="flex items-center justify-between border-b border-brand-cream pb-3">
          <h3 className="text-xl font-bubble text-brand-brown">General School Information</h3>
          {savedMsg && (
            <span className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Saved!</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Official School Name *
            </label>
            <input
              required
              value={formData.school_name}
              onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              School Tagline *
            </label>
            <input
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              Contact Phone Number *
            </label>
            <input
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              WhatsApp Support Number *
            </label>
            <input
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              School Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
              School Operating Timings *
            </label>
            <input
              required
              value={formData.timings}
              onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
            Physical Campus Address *
          </label>
          <input
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
            Google Maps Link (Optional)
          </label>
          <input
            value={formData.google_maps_url || ''}
            onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 text-xs font-semibold outline-none focus:border-brand-orange"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-3 p-3 rounded-2xl bg-brand-cream border border-brand-orange/20 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_admission_open}
              onChange={(e) => setFormData({ ...formData, is_admission_open: e.target.checked })}
              className="w-5 h-5 rounded text-brand-orange"
            />
            <div>
              <span className="font-bubble text-sm text-brand-brown font-bold block">
                Admissions Status: {formData.is_admission_open ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="text-xs text-stone-500">
                Display the "Admissions Open" ribbon and CTA on the public website.
              </span>
            </div>
          </label>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="text-xs font-bold text-stone-400 hover:text-brand-red flex items-center gap-1 cursor-pointer"
            title="Reset demo data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Store</span>
          </button>
        </div>
      </form>
    </div>
  );
};
