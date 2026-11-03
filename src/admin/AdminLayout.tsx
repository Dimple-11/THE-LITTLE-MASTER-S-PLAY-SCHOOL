import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Calendar,
  Bell,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Settings,
  FileEdit,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Database,
} from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  onLogout,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLiveDb = isSupabaseConfigured();

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'admissions', label: 'Admission Enquiries', icon: Users, badgeKey: 'newEnquiries' },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'events', label: 'Events & Celebrations', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'programs', label: 'Programs (Playgroup-UKG)', icon: BookOpen },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'faqs', label: 'FAQs Management', icon: HelpCircle },
    { id: 'content', label: 'Website Content (CMS)', icon: FileEdit },
    { id: 'settings', label: 'School Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown flex flex-col md:flex-row font-sans">
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white border-b-2 border-brand-yellow px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
          <span className="font-bubble text-base font-bold text-brand-brown">Admin Portal</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="p-2 rounded-xl bg-brand-cream text-brand-orange border border-brand-orange/30 text-xs font-bold"
            title="Preview Public Website"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-brand-yellow/40 text-brand-brown"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-72 bg-white border-r-2 border-brand-yellow/60 z-40 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 overflow-y-auto">
          {/* Brand Emblem */}
          <div className="flex items-center gap-3 pb-5 border-b border-brand-cream">
            <img src="/logo.png" alt="School Emblem" className="w-12 h-12 object-contain" />
            <div>
              <span className="block text-brand-red font-bubble text-sm font-bold leading-tight">
                The Little Master's
              </span>
              <span className="block text-xs text-stone-500 font-semibold">
                Admin Control Room
              </span>
            </div>
          </div>

          {/* Database Live Status Indicator */}
          <div className="my-3 px-3 py-2 rounded-2xl bg-brand-cream border border-brand-orange/20 flex items-center gap-2 text-xs font-semibold">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isLiveDb ? 'bg-brand-green animate-pulse' : 'bg-brand-orange'
              }`}
            />
            <span className="text-stone-600 truncate">
              {isLiveDb ? 'Connected to Supabase' : 'Offline / Local Demo Store'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 mt-2">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bubble text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-orange text-white font-bold shadow-playful-orange'
                      : 'text-stone-700 hover:bg-brand-cream hover:text-brand-orange'
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-left flex-1 truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-brand-cream space-y-2 bg-brand-cream/30">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white border border-brand-orange/30 text-brand-deepOrange font-bubble text-xs font-bold hover:bg-brand-peach transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-brand-red font-bubble text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
};
