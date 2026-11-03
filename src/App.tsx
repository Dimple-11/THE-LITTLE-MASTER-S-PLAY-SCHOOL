import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { AdmissionModal } from '@/components/common/AdmissionModal';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About/About';
import { OurStory, OurPhilosophy, PrincipalsMessage, Facilities } from '@/pages/About/OurStory';
import { Academics, ProgramDetail, LearningApproach } from '@/pages/Academics/Academics';
import { Activities, Gallery, Celebrations, Events } from '@/pages/LifeAtSchool/Activities';
import {
  Admissions,
  AdmissionProcess,
  AgeEligibility,
  DocumentsRequired,
  FAQsPage,
} from '@/pages/Admissions/Admissions';
import { Contact, PrivacyPolicy } from '@/pages/Contact/Contact';
import { AdminPage } from '@/admin/AdminPage';
import { DataStore, DEFAULT_SETTINGS } from '@/services/store';
import { SchoolSettings } from '@/types';
import { Sparkles, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Scroll to top helper on page route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 404 Not Found Page
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="w-24 h-24 rounded-full bg-brand-yellow/40 flex items-center justify-center font-bubble text-5xl">
      🧸
    </div>
    <h1 className="text-4xl font-bubble text-brand-brown">Oops, Little Explorer!</h1>
    <p className="text-stone-600 max-w-md font-medium">
      This page seems to be playing hide-and-seek. Let's head back to our cheerful school home!
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange text-white font-bubble text-base font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
    >
      <HomeIcon className="w-4 h-4" />
      <span>Back to Homepage</span>
    </Link>
  </div>
);

export function App() {
  const [settings, setSettings] = useState<SchoolSettings>(DEFAULT_SETTINGS);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [defaultClass, setDefaultClass] = useState<'Playgroup' | 'Nursery' | 'LKG' | 'UKG'>('Playgroup');

  useEffect(() => {
    DataStore.getSettings().then(setSettings);
  }, []);

  const openAdmissionModal = (cls?: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG') => {
    if (cls) setDefaultClass(cls);
    setIsAdmissionOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Protected Administration Portal (Has its own dedicated layout) */}
        <Route path="/admin/*" element={<AdminPage />} />

        {/* Public Website Routes (Shared Navigation, Footer, and Admission Modal) */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col bg-brand-cream text-brand-brown selection:bg-brand-yellow selection:text-brand-brown">
              <Navbar onOpenAdmission={openAdmissionModal} />

              <main className="flex-1">
                <Routes>
                  {/* Home */}
                  <Route
                    path="/"
                    element={<Home settings={settings} onOpenAdmission={openAdmissionModal} />}
                  />

                  {/* About Group */}
                  <Route path="/about" element={<About />} />
                  <Route path="/about/story" element={<OurStory />} />
                  <Route path="/about/philosophy" element={<OurPhilosophy />} />
                  <Route path="/about/principal" element={<PrincipalsMessage />} />
                  <Route path="/about/facilities" element={<Facilities />} />

                  {/* Academics Group */}
                  <Route path="/academics" element={<Academics onOpenAdmission={openAdmissionModal} />} />
                  <Route
                    path="/academics/:slug"
                    element={<ProgramDetail onOpenAdmission={openAdmissionModal} />}
                  />
                  <Route path="/academics/approach" element={<LearningApproach />} />

                  {/* Life at School */}
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/celebrations" element={<Celebrations />} />
                  <Route path="/events" element={<Events />} />

                  {/* Admissions */}
                  <Route
                    path="/admissions"
                    element={<Admissions settings={settings} onOpenAdmission={openAdmissionModal} />}
                  />
                  <Route
                    path="/admissions/process"
                    element={<AdmissionProcess settings={settings} onOpenAdmission={openAdmissionModal} />}
                  />
                  <Route path="/admissions/eligibility" element={<AgeEligibility />} />
                  <Route path="/admissions/documents" element={<DocumentsRequired />} />
                  <Route path="/admissions/faqs" element={<FAQsPage />} />

                  {/* Contact & Legal */}
                  <Route path="/contact" element={<Contact settings={settings} />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer settings={settings} onOpenAdmission={() => openAdmissionModal()} />

              {/* Global Interactive Admission Enquiry Modal */}
              <AdmissionModal
                isOpen={isAdmissionOpen}
                onClose={() => setIsAdmissionOpen(false)}
                defaultClass={defaultClass}
              />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
