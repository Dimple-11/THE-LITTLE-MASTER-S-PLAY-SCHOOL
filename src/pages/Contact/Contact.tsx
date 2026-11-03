import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { SchoolSettings } from '@/types';
import { DataStore } from '@/services/store';
import confetti from 'canvas-confetti';

interface ContactProps {
  settings: SchoolSettings;
}

export const Contact: React.FC<ContactProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    parent_name: '',
    phone: '',
    email: '',
    child_age_group: '2.5 to 3.5 Years',
    interested_class: 'Playgroup' as 'Playgroup' | 'Nursery' | 'LKG' | 'UKG',
    message: '',
  });
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parent_name || !formData.phone) return;
    setIsSubmitting(true);
    try {
      const res = await DataStore.submitAdmissionEnquiry(formData);
      if (res.success) {
        setSubmittedRef(res.reference_id);
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch {}
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Connect With Us
        </span>
        <h1 className="text-4xl md:text-6xl font-bubble text-brand-brown">
          Contact Our Admissions Office
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Have questions about admissions, fees, or daily school schedules? We would love to talk!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info (Left) */}
        <div className="lg:col-span-5 bg-white rounded-5xl p-8 md:p-10 border-4 border-brand-yellow shadow-card space-y-6">
          <h2 className="text-2xl font-bubble text-brand-brown">Campus Information</h2>

          <div className="space-y-4 text-sm font-semibold text-stone-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 block uppercase font-bold">Address</span>
                <span>{settings.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 block uppercase font-bold">Direct Phone</span>
                <a href={`tel:${settings.phone}`} className="text-brand-deepOrange hover:underline">
                  {settings.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 block uppercase font-bold">WhatsApp Direct</span>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-green hover:underline"
                >
                  {settings.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 block uppercase font-bold">Email</span>
                <a href={`mailto:${settings.email}`} className="text-brand-blue hover:underline">
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-yellow/30 text-brand-brown flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 block uppercase font-bold">Operating Timings</span>
                <span>{settings.timings}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-cream">
            <a
              href={settings.google_maps_url || 'https://maps.google.com'}
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 rounded-2xl bg-brand-cream hover:bg-brand-yellow/30 text-brand-brown font-bubble text-sm font-bold text-center border border-brand-orange/30 transition-all"
            >
              📍 View School on Google Maps
            </a>
          </div>
        </div>

        {/* Message / Enquiry Form (Right) */}
        <div className="lg:col-span-7 bg-white rounded-5xl p-8 md:p-10 border-4 border-brand-orange/30 shadow-card">
          {submittedRef ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bubble text-brand-brown">Message Sent with Joy!</h3>
              <p className="text-stone-600 font-medium">
                Thank you for contacting us. Your reference number is <strong className="text-brand-deepOrange">{submittedRef}</strong>.
              </p>
              <button
                onClick={() => setSubmittedRef(null)}
                className="px-6 py-2.5 rounded-full bg-brand-orange text-white font-bubble text-sm font-bold shadow-playful-orange"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-1">
                  Send A Message
                </span>
                <h3 className="text-2xl font-bubble text-brand-brown">Send Us An Enquiry</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Your Full Name *
                </label>
                <input
                  required
                  value={formData.parent_name}
                  onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                  placeholder="e.g. Sunita Mehta"
                  className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 outline-none focus:border-brand-orange text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 outline-none focus:border-brand-orange text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 outline-none focus:border-brand-orange text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Child's Age Group
                  </label>
                  <select
                    value={formData.child_age_group}
                    onChange={(e) => setFormData({ ...formData, child_age_group: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 outline-none focus:border-brand-orange text-sm font-medium cursor-pointer"
                  >
                    <option value="1.5 to 2.5 Years">1.5 to 2.5 Years</option>
                    <option value="2.5 to 3.5 Years">2.5 to 3.5 Years</option>
                    <option value="3.5 to 4.5 Years">3.5 to 4.5 Years</option>
                    <option value="4.5 to 5.5 Years">4.5 to 5.5 Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Class of Interest
                  </label>
                  <select
                    value={formData.interested_class}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interested_class: e.target.value as 'Playgroup' | 'Nursery' | 'LKG' | 'UKG',
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 outline-none focus:border-brand-orange text-sm font-medium cursor-pointer"
                  >
                    <option value="Playgroup">Playgroup</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Your Message or Question
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full px-4 py-2.5 rounded-2xl bg-brand-cream border border-brand-orange/30 outline-none focus:border-brand-orange text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-base font-bold shadow-playful-orange hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Legal & Privacy
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Privacy Policy
        </h1>
        <p className="text-stone-600 text-sm">
          Last updated: November 2026
        </p>
      </div>

      <div className="bg-white rounded-5xl p-8 md:p-12 border-3 border-brand-yellow shadow-card space-y-6 text-stone-700 leading-relaxed font-medium text-sm">
        <h3 className="font-bubble text-xl text-brand-brown">1. Information We Collect</h3>
        <p>
          We collect basic contact details provided voluntarily by parents when submitting an admission enquiry, including parent name, phone number, email address, and the child's age group. We do NOT collect unnecessary sensitive personal data.
        </p>

        <h3 className="font-bubble text-xl text-brand-brown">2. How We Use Information</h3>
        <p>
          Submitted contact details are used exclusively to respond to your queries, arrange campus walkthroughs, and share verified school admissions updates. We never sell, rent, or trade parent details to third-party marketing companies.
        </p>

        <h3 className="font-bubble text-xl text-brand-brown">3. Student Photographs & Media</h3>
        <p>
          Student safety and dignity are paramount. Official school event photographs published in our gallery require explicit written consent from parents upon enrollment.
        </p>

        <h3 className="font-bubble text-xl text-brand-brown">4. Security</h3>
        <p>
          We employ strict security standards, secure databases with Row Level Security (RLS), and encrypted connections to protect enquiry records against unauthorized access.
        </p>
      </div>
    </div>
  );
};
