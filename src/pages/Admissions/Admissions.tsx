import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, FileText, Calendar, HelpCircle, ArrowRight, Phone } from 'lucide-react';
import { DataStore } from '@/services/store';
import { FAQ, SchoolSettings } from '@/types';

interface AdmissionsProps {
  settings: SchoolSettings;
  onOpenAdmission: (defaultClass?: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG') => void;
}

export const Admissions: React.FC<AdmissionsProps> = ({ settings, onOpenAdmission }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Enrolling for 2026-27
        </span>
        <h1 className="text-4xl md:text-6xl font-bubble text-brand-brown">
          Begin Your Child's Big Journey
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          A seamless, welcoming, and transparent admission process designed to help you make the best choice for your little one.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onOpenAdmission()}
            className="px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-lg font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
          >
            Fill Online Admission Enquiry Form
          </button>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Admission Process',
            desc: 'Step-by-step guide from initial enquiry to classroom induction.',
            href: '/admissions/process',
            icon: Sparkles,
            color: 'border-brand-yellow',
          },
          {
            title: 'Age Eligibility',
            desc: 'Cut-off dates and age criteria for Playgroup, Nursery, LKG, and UKG.',
            href: '/admissions/eligibility',
            icon: Calendar,
            color: 'border-brand-orange',
          },
          {
            title: 'Documents Required',
            desc: 'Checklist of certificates and photographs needed for enrollment.',
            href: '/admissions/documents',
            icon: FileText,
            color: 'border-brand-blue',
          },
          {
            title: 'Admissions FAQ',
            desc: 'Frequently asked parent questions regarding timings, fees, and care.',
            href: '/admissions/faqs',
            icon: HelpCircle,
            color: 'border-brand-green',
          },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className={`bg-white rounded-4xl p-6 border-3 ${item.color} shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between`}
          >
            <div>
              <item.icon className="w-10 h-10 text-brand-deepOrange mb-4" />
              <h3 className="font-bubble text-xl text-brand-brown mb-2">{item.title}</h3>
              <p className="text-stone-600 text-xs font-medium leading-relaxed">{item.desc}</p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-brand-orange">
              <span>View details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const AdmissionProcess: React.FC<AdmissionsProps> = ({ onOpenAdmission }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Step-by-Step
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          The Admission Process
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Four simple steps to welcoming your child to The Little Master's.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            step: '01',
            title: 'Online Enquiry or Campus Visit',
            desc: 'Submit our brief online enquiry form or visit our administrative reception during working hours.',
          },
          {
            step: '02',
            title: 'Personal Campus Walkthrough & Interaction',
            desc: 'Meet our lead educators, observe cheerful classroom activities, and let your child explore our play zones freely.',
          },
          {
            step: '03',
            title: 'Registration & Documentation',
            desc: 'Submit the registration form along with standard documents (birth certificate, immunization record, photographs).',
          },
          {
            step: '04',
            title: 'Welcome Kit & Gentle Induction',
            desc: 'Receive the school uniform kit, student badge, and academic calendar. We begin with shorter hours to ensure gentle transition.',
          },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card flex gap-6 items-center">
            <span className="w-14 h-14 rounded-2xl bg-brand-cream border-2 border-brand-orange/30 font-bubble text-2xl font-bold text-brand-deepOrange flex items-center justify-center flex-shrink-0">
              {s.step}
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-bubble text-brand-brown mb-1">{s.title}</h3>
              <p className="text-stone-600 text-sm font-medium leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => onOpenAdmission()}
          className="px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-lg font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
        >
          Enquire for Admission Now
        </button>
      </div>
    </div>
  );
};

export const AgeEligibility: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-orange/20 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Age Criteria
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Age Eligibility (Session 2026-27)
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Age standards as of the beginning of the academic year.
        </p>
      </div>

      <div className="bg-white rounded-5xl p-8 border-3 border-brand-yellow shadow-card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-orange/20">
              <th className="py-4 px-4 font-bubble text-lg text-brand-brown">Program</th>
              <th className="py-4 px-4 font-bubble text-lg text-brand-brown">Age Criteria</th>
              <th className="py-4 px-4 font-bubble text-lg text-brand-brown">Daily Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-cream text-stone-700 font-semibold text-sm">
            <tr>
              <td className="py-4 px-4 font-bubble text-base text-brand-deepOrange">Playgroup</td>
              <td className="py-4 px-4">1.5 to 2.5 Years</td>
              <td className="py-4 px-4 text-stone-500">9:30 AM - 12:00 PM</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bubble text-base text-brand-deepOrange">Nursery</td>
              <td className="py-4 px-4">2.5 to 3.5 Years</td>
              <td className="py-4 px-4 text-stone-500">9:00 AM - 12:30 PM</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bubble text-base text-brand-deepOrange">Junior KG (LKG)</td>
              <td className="py-4 px-4">3.5 to 4.5 Years</td>
              <td className="py-4 px-4 text-stone-500">9:00 AM - 1:15 PM</td>
            </tr>
            <tr>
              <td className="py-4 px-4 font-bubble text-base text-brand-deepOrange">Senior KG (UKG)</td>
              <td className="py-4 px-4">4.5 to 5.5 Years</td>
              <td className="py-4 px-4 text-stone-500">9:00 AM - 1:30 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DocumentsRequired: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-bubble text-sm font-bold uppercase tracking-wider">
          Checklist
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Documents Required for Admission
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Please keep these standard records ready during registration.
        </p>
      </div>

      <div className="bg-white rounded-5xl p-8 md:p-10 border-3 border-brand-blue/40 shadow-card space-y-4">
        {[
          'Self-attested photocopy of Child’s Birth Certificate (issued by Municipal Corporation / competent authority).',
          '4 recent passport-size color photographs of the child.',
          '2 recent passport-size photographs of each parent / legal guardian.',
          'Photocopy of Address Proof (Aadhaar Card, Passport, Electricity Bill, or Voter ID).',
          'Photocopy of Child’s Immunization / Medical Vaccination Record.',
          'Previous preschool progress report or transfer certificate (if applicable for UKG transfer).',
        ].map((doc, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-brand-cream/60 border border-brand-orange/20">
            <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
            <span className="text-stone-700 text-sm font-semibold">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    DataStore.getFAQs().then((list) => setFaqs(list.filter((f) => f.is_published)));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green font-bubble text-sm font-bold uppercase tracking-wider">
          Got Questions?
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Common answers to questions parents ask about admissions, safety, and curriculum.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-3xl p-6 border-2 border-brand-yellow shadow-sm space-y-2">
            <h3 className="font-bubble text-xl text-brand-brown flex items-center gap-2">
              <span className="text-brand-orange font-bold">Q.</span>
              <span>{faq.question}</span>
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed pl-6 font-medium">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
