import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  HeartHandshake,
  BookOpen,
  Sun,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';

interface NavbarProps {
  onOpenAdmission: (defaultClass?: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmission }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const navGroups = [
    {
      title: 'About Us',
      links: [
        { label: 'About School', href: '/about' },
        { label: 'Our Story', href: '/about/story' },
        { label: 'Our Philosophy', href: '/about/philosophy' },
        { label: "Principal's Message", href: '/about/principal' },
        { label: 'Our Facilities', href: '/about/facilities' },
      ],
    },
    {
      title: 'Academics',
      links: [
        { label: 'All Programs', href: '/academics' },
        { label: 'Playgroup (1.5 - 2.5 yrs)', href: '/academics/playgroup' },
        { label: 'Nursery (2.5 - 3.5 yrs)', href: '/academics/nursery' },
        { label: 'Junior KG / LKG (3.5 - 4.5 yrs)', href: '/academics/lkg' },
        { label: 'Senior KG / UKG (4.5 - 5.5 yrs)', href: '/academics/ukg' },
        { label: 'Learning Approach', href: '/academics/approach' },
      ],
    },
    {
      title: 'Life at School',
      links: [
        { label: 'Daily Activities', href: '/activities' },
        { label: 'Photo Gallery', href: '/gallery' },
        { label: 'Celebrations', href: '/celebrations' },
        { label: 'Events Calendar', href: '/events' },
      ],
    },
    {
      title: 'Admissions',
      links: [
        { label: 'Overview', href: '/admissions' },
        { label: 'Admission Process', href: '/admissions/process' },
        { label: 'Age Eligibility', href: '/admissions/eligibility' },
        { label: 'Documents Required', href: '/admissions/documents' },
        { label: 'Admissions FAQ', href: '/admissions/faqs' },
      ],
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-cream/95 backdrop-blur-md shadow-card border-b border-brand-orange/20 py-2'
          : 'bg-brand-cream/90 py-3.5 border-b border-brand-yellow/30'
      }`}
    >
      {/* Top Banner Notice: Admissions Alert */}
      <div className="bg-brand-orange text-white text-xs font-semibold py-1 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Admissions Open for 2026-27 Session! Limited Seats for Caring 1:6 Ratio</span>
        <button
          onClick={() => onOpenAdmission()}
          className="underline font-bold hover:text-brand-yellow ml-1 cursor-pointer"
        >
          Enquire Online
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-1">
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="The Little Master's Play Way School"
            className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <span className="block text-brand-red font-bubble text-lg md:text-xl font-bold leading-tight">
              The Little Master's
            </span>
            <span className="block text-brand-blue font-bubble text-sm md:text-base font-semibold leading-tight tracking-wide">
              Play Way School
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION MENU */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            to="/"
            className={`px-3 py-2 rounded-2xl font-bubble text-base font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-brand-deepOrange bg-brand-yellow/30'
                : 'text-brand-brown hover:text-brand-orange hover:bg-brand-yellow/15'
            }`}
          >
            Home
          </Link>

          {/* DROPDOWN GROUPS */}
          {navGroups.map((group) => {
            const isGroupActive = group.links.some((l) => location.pathname === l.href);
            return (
              <div
                key={group.title}
                className="relative"
                onMouseEnter={() => setOpenDropdown(group.title)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`px-3 py-2 rounded-2xl font-bubble text-base font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                    isGroupActive
                      ? 'text-brand-deepOrange bg-brand-yellow/30'
                      : 'text-brand-brown hover:text-brand-orange hover:bg-brand-yellow/15'
                  }`}
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdown === group.title ? 'rotate-180 text-brand-orange' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Card */}
                <AnimatePresence>
                  {openDropdown === group.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-64 bg-white rounded-3xl p-3 border-2 border-brand-yellow shadow-card z-50 mt-1"
                    >
                      <div className="space-y-1">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className={`block px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                              location.pathname === link.href
                                ? 'bg-brand-peach text-brand-deepOrange font-bold'
                                : 'text-stone-700 hover:bg-brand-cream hover:text-brand-orange'
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <Link
            to="/contact"
            className={`px-3 py-2 rounded-2xl font-bubble text-base font-medium transition-colors ${
              location.pathname === '/contact'
                ? 'text-brand-deepOrange bg-brand-yellow/30'
                : 'text-brand-brown hover:text-brand-orange hover:bg-brand-yellow/15'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* CTA BUTTONS (RIGHT) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin link shortcut */}
          <Link
            to="/admin"
            title="School Admin Portal"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-peach text-brand-brown text-xs font-bold border border-brand-orange/30 hover:bg-brand-yellow/40 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-brand-orange" />
            <span>Admin</span>
          </Link>

          {/* Prominent Enquire Now Button */}
          <button
            onClick={() => onOpenAdmission()}
            className="px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-deepOrange hover:from-brand-deepOrange hover:to-brand-orange text-white font-bubble text-sm sm:text-base font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            <span>Enquire Now</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-brand-yellow/40 text-brand-brown border border-brand-yellow hover:bg-brand-yellow transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-cream border-t border-brand-orange/20 px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2.5 rounded-2xl font-bubble text-lg font-semibold text-brand-brown hover:bg-brand-yellow/30"
              >
                🏠 Home
              </Link>

              {navGroups.map((group) => (
                <div key={group.title} className="bg-white/80 rounded-2xl p-2 border border-brand-orange/20">
                  <div className="px-3 py-1 font-bubble text-xs uppercase tracking-wider text-brand-deepOrange font-bold">
                    {group.title}
                  </div>
                  <div className="space-y-1 mt-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block px-3 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-brand-peach hover:text-brand-orange"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                to="/contact"
                className="block px-4 py-2.5 rounded-2xl font-bubble text-lg font-semibold text-brand-brown hover:bg-brand-yellow/30"
              >
                📞 Contact Us
              </Link>

              <div className="pt-2 border-t border-brand-orange/20 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmission();
                  }}
                  className="w-full py-3 rounded-2xl bg-brand-orange text-white font-bubble text-base font-bold shadow-playful-orange text-center"
                >
                  ✨ Enquire for Admission
                </button>

                <Link
                  to="/admin"
                  className="w-full py-2.5 rounded-2xl bg-white border border-brand-orange/40 text-brand-brown font-bubble text-sm font-bold text-center flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-brand-orange" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
