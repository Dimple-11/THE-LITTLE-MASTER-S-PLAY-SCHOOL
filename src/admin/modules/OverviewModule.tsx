import React from 'react';
import { Users, Image as ImageIcon, Calendar, Bell, Sparkles, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { AdmissionEnquiry, SchoolEvent, Announcement, GalleryItem } from '@/types';

interface OverviewModuleProps {
  enquiries: AdmissionEnquiry[];
  events: SchoolEvent[];
  announcements: Announcement[];
  galleryItems: GalleryItem[];
  onNavigateTab: (tab: string) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({
  enquiries,
  events,
  announcements,
  galleryItems,
  onNavigateTab,
}) => {
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const publishedPhotosCount = galleryItems.filter((g) => g.is_published).length;
  const upcomingEventsCount = events.filter((e) => e.is_published).length;
  const publishedAnnouncementsCount = announcements.filter((a) => a.is_published).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-brand-orange via-brand-deepOrange to-brand-orange rounded-4xl p-6 md:p-8 text-white shadow-playful-orange flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow block mb-1">
            School Administration Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-bubble font-bold">
            Welcome, Administrator!
          </h1>
          <p className="text-white/90 text-sm mt-1 max-w-lg">
            Manage your school’s digital presence with ease. View new student enquiries, post campus announcements, and update classroom moments.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('admissions')}
          className="px-6 py-3 rounded-full bg-brand-yellow hover:bg-white text-brand-brown font-bubble text-sm font-bold shadow-playful-yellow transition-all whitespace-nowrap cursor-pointer"
        >
          Review {newEnquiriesCount} New Enquiries
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigateTab('admissions')}
          className="bg-white rounded-3xl p-5 border-2 border-brand-orange/30 shadow-card hover:border-brand-orange cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            {newEnquiriesCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-brand-red text-white text-xs font-bold">
                {newEnquiriesCount} New
              </span>
            )}
          </div>
          <div className="text-3xl font-bubble text-brand-brown font-bold">{enquiries.length}</div>
          <div className="text-xs text-stone-500 font-semibold mt-1">Total Enquiries</div>
        </div>

        <div
          onClick={() => onNavigateTab('gallery')}
          className="bg-white rounded-3xl p-5 border-2 border-brand-yellow shadow-card hover:border-brand-yellow cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow/30 text-brand-deepOrange flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bubble text-brand-brown font-bold">{publishedPhotosCount}</div>
          <div className="text-xs text-stone-500 font-semibold mt-1">Published Photographs</div>
        </div>

        <div
          onClick={() => onNavigateTab('events')}
          className="bg-white rounded-3xl p-5 border-2 border-brand-blue/30 shadow-card hover:border-brand-blue cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bubble text-brand-brown font-bold">{upcomingEventsCount}</div>
          <div className="text-xs text-stone-500 font-semibold mt-1">Active Events</div>
        </div>

        <div
          onClick={() => onNavigateTab('announcements')}
          className="bg-white rounded-3xl p-5 border-2 border-brand-green/30 shadow-card hover:border-brand-green cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bubble text-brand-brown font-bold">{publishedAnnouncementsCount}</div>
          <div className="text-xs text-stone-500 font-semibold mt-1">Active Notices</div>
        </div>
      </div>

      {/* Recent Enquiries Box */}
      <div className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-brand-cream pb-4">
          <div>
            <h2 className="text-xl font-bubble text-brand-brown">Recent Admission Enquiries</h2>
            <p className="text-xs text-stone-500">Parents who submitted an enquiry form online</p>
          </div>
          <button
            onClick={() => onNavigateTab('admissions')}
            className="text-xs font-bold text-brand-deepOrange hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {enquiries.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-sm">
            No enquiries received yet. Forms filled on the website will instantly appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-2xl bg-brand-cream/60 border border-brand-orange/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bubble text-base text-brand-brown font-bold">{enq.parent_name}</span>
                    <span className="text-xs text-stone-500">({enq.reference_id})</span>
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    Phone: <span className="font-semibold">{enq.phone}</span> | Class: <span className="font-semibold text-brand-deepOrange">{enq.interested_class}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      enq.status === 'new'
                        ? 'bg-brand-red text-white'
                        : enq.status === 'contacted'
                        ? 'bg-brand-blue text-white'
                        : enq.status === 'enrolled'
                        ? 'bg-brand-green text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {enq.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => onNavigateTab('admissions')}
                    className="px-3 py-1 rounded-xl bg-white text-xs font-bold border border-brand-orange/30 hover:bg-brand-yellow/30"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
