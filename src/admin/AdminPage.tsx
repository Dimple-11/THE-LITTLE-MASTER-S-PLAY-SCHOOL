import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import { OverviewModule } from './modules/OverviewModule';
import { AdmissionsModule } from './modules/AdmissionsModule';
import { GalleryModule } from './modules/GalleryModule';
import { EventsModule, AnnouncementsModule } from './modules/EventsModule';
import { ProgramsModule } from './modules/ProgramsModule';
import { SettingsModule } from './modules/SettingsModule';
import { ContentModule } from './modules/ContentModule';
import { TestimonialsModule, FaqsModule } from './modules/TestimonialsFaqsModule';
import { DataStore } from '@/services/store';
import {
  AdmissionEnquiry,
  SchoolEvent,
  Announcement,
  GalleryItem,
  GalleryCategory,
  Program,
  SchoolSettings,
  FAQ,
  Testimonial,
} from '@/types';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('lmpw_admin_session') === 'true';
  });
  const [activeTab, setActiveTab] = useState('overview');

  // State data
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [settings, setSettings] = useState<SchoolSettings | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const refreshData = async () => {
    const [enq, ev, ann, gal, cat, prg, st, fq, tst] = await Promise.all([
      DataStore.getAdmissionEnquiries(),
      DataStore.getEvents(),
      DataStore.getAnnouncements(),
      DataStore.getGalleryItems(),
      DataStore.getGalleryCategories(),
      DataStore.getPrograms(),
      DataStore.getSettings(),
      DataStore.getFAQs(),
      DataStore.getTestimonials(),
    ]);
    setEnquiries(enq);
    setEvents(ev);
    setAnnouncements(ann);
    setGalleryItems(gal);
    setCategories(cat);
    setPrograms(prg);
    setSettings(st);
    setFaqs(fq);
    setTestimonials(tst);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = (email: string) => {
    localStorage.setItem('lmpw_admin_session', 'true');
    localStorage.setItem('lmpw_admin_email', email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('lmpw_admin_session');
    localStorage.removeItem('lmpw_admin_email');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === 'overview' && (
        <OverviewModule
          enquiries={enquiries}
          events={events}
          announcements={announcements}
          galleryItems={galleryItems}
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === 'admissions' && (
        <AdmissionsModule enquiries={enquiries} onRefresh={refreshData} />
      )}

      {activeTab === 'gallery' && (
        <GalleryModule items={galleryItems} categories={categories} onRefresh={refreshData} />
      )}

      {activeTab === 'events' && (
        <EventsModule events={events} onRefresh={refreshData} />
      )}

      {activeTab === 'announcements' && (
        <AnnouncementsModule announcements={announcements} onRefresh={refreshData} />
      )}

      {activeTab === 'programs' && (
        <ProgramsModule programs={programs} onRefresh={refreshData} />
      )}

      {activeTab === 'testimonials' && (
        <TestimonialsModule testimonials={testimonials} onRefresh={refreshData} />
      )}

      {activeTab === 'faqs' && (
        <FaqsModule faqs={faqs} onRefresh={refreshData} />
      )}

      {activeTab === 'content' && <ContentModule />}

      {activeTab === 'settings' && settings && (
        <SettingsModule settings={settings} onRefresh={refreshData} />
      )}
    </AdminLayout>
  );
};
