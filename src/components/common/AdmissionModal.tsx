import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2, Phone, User, Mail, Calendar, HelpCircle, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DataStore } from '@/services/store';

const admissionSchema = z.object({
  parent_name: z.string().min(2, 'Please enter parent/guardian name'),
  phone: z.string().regex(/^[0-9+ -]{10,15}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  child_name: z.string().optional().or(z.literal('')),
  child_age_group: z.string().min(1, 'Please select age group'),
  interested_class: z.enum(['Playgroup', 'Nursery', 'LKG', 'UKG'], {
    errorMap: () => ({ message: 'Please select class' }),
  }),
  message: z.string().optional(),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClass?: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG';
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  defaultClass = 'Playgroup',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      parent_name: '',
      phone: '',
      email: '',
      child_name: '',
      child_age_group: '2.5 to 3.5 Years',
      interested_class: defaultClass,
      message: '',
    },
  });

  const onSubmit = async (data: AdmissionFormData) => {
    setIsSubmitting(true);
    try {
      const result = await DataStore.submitAdmissionEnquiry({
        parent_name: data.parent_name,
        phone: data.phone,
        email: data.email || undefined,
        child_name: data.child_name || undefined,
        child_age_group: data.child_age_group,
        interested_class: data.interested_class,
        message: data.message || undefined,
      });

      if (result.success) {
        setSubmittedRef(result.reference_id);
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD929', '#FF941E', '#1749D6', '#07852C', '#F21D1D'],
          });
        } catch {
          // ignore
        }
        reset();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedRef(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center bg-brand-brown/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-brand-cream border-4 border-brand-yellow rounded-4xl shadow-2xl p-6 md:p-8 overflow-hidden text-brand-brown"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white hover:bg-brand-orange hover:text-white border border-brand-orange/30 flex items-center justify-center transition-all z-10 shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown mb-2">
              Enquiry Received with Joy!
            </h3>
            <p className="text-stone-600 mb-6 font-medium">
              Thank you for considering The Little Master's Play Way School. Our admissions coordinator will connect with you shortly for a warm campus walkthrough.
            </p>

            <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-brand-orange/40 max-w-sm mx-auto mb-6">
              <p className="text-xs uppercase font-bold tracking-wider text-stone-500 mb-1">
                Your Enquiry Reference ID
              </p>
              <p className="text-2xl font-bubble text-brand-deepOrange tracking-wide font-extrabold">
                {submittedRef}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-lg font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
            >
              Done & Explore Website
            </button>
          </div>
        ) : (
          /* Form State */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                Session 2026-27 Open
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown mb-1">
              Admission Enquiry
            </h3>
            <p className="text-stone-600 text-sm mb-6">
              Fill in your details below. We would love to welcome you and your child into our cheerful learning family!
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Parent Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Parent / Guardian Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                  <input
                    {...register('parent_name')}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-brand-orange/30 focus:border-brand-orange focus:ring-2 focus:ring-brand-yellow/50 outline-none font-medium text-sm transition-all"
                  />
                </div>
                {errors.parent_name && (
                  <p className="text-xs text-brand-red font-semibold mt-1">{errors.parent_name.message}</p>
                )}
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-brand-orange/30 focus:border-brand-orange focus:ring-2 focus:ring-brand-yellow/50 outline-none font-medium text-sm transition-all"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-brand-red font-semibold mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                    <input
                      {...register('email')}
                      placeholder="parent@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-brand-orange/30 focus:border-brand-orange focus:ring-2 focus:ring-brand-yellow/50 outline-none font-medium text-sm transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-brand-red font-semibold mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Child Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Child's Name (Optional)
                  </label>
                  <input
                    {...register('child_name')}
                    placeholder="Child's first name"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-brand-orange/30 focus:border-brand-orange focus:ring-2 focus:ring-brand-yellow/50 outline-none font-medium text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                    Interested Class *
                  </label>
                  <select
                    {...register('interested_class')}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-brand-orange/30 focus:border-brand-orange focus:ring-2 focus:ring-brand-yellow/50 outline-none font-medium text-sm transition-all cursor-pointer"
                  >
                    <option value="Playgroup">Playgroup (1.5 - 2.5 yrs)</option>
                    <option value="Nursery">Nursery (2.5 - 3.5 yrs)</option>
                    <option value="LKG">Junior KG / LKG (3.5 - 4.5 yrs)</option>
                    <option value="UKG">Senior KG / UKG (4.5 - 5.5 yrs)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-1">
                  Questions or Preferred Visit Timing (Optional)
                </label>
                <textarea
                  {...register('message')}
                  rows={2}
                  placeholder="Tell us about your child or when you would like to visit..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white border border-brand-orange/30 focus:border-brand-orange focus:ring-2 focus:ring-brand-yellow/50 outline-none font-medium text-sm transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-deepOrange hover:from-brand-deepOrange hover:to-brand-orange text-white font-bubble text-lg font-bold shadow-playful-orange hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <span>Sending Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Admission Enquiry</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-stone-500 font-medium">
                🔒 We respect your privacy. No spam. Only warm school communications.
              </p>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
