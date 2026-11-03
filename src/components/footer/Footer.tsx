import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { SchoolSettings } from '@/types';

interface FooterProps {
  settings: SchoolSettings;
  onOpenAdmission: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmission }) => {
  return (
    <footer className="relative bg-gradient-to-b from-brand-cream via-brand-peach/40 to-brand-cream border-t-4 border-brand-yellow pt-16 pb-12 overflow-hidden">
      {/* Wave Accent at top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="The Little Master's Play Way School"
                className="h-20 w-auto object-contain drop-shadow-sm"
              />
              <div>
                <span className="block text-brand-red font-bubble text-xl font-bold leading-tight">
                  The Little Master's
                </span>
                <span className="block text-brand-blue font-bubble text-base font-semibold leading-tight">
                  Play Way School
                </span>
              </div>
            </Link>
            <p className="text-stone-600 text-sm leading-relaxed font-medium">
              A joyful, nurturing, play-based preschool where curious little minds take their first confident steps into a universe of wonder, creativity, and lasting friendship.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmission}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-sm font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-brand-yellow" />
                <span>Admissions 2026-27</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bubble text-lg text-brand-brown font-bold mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow" />
              <span>Explore Programs</span>
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-stone-600">
              <li>
                <Link to="/academics/playgroup" className="hover:text-brand-orange transition-colors">
                  Playgroup (1.5 - 2.5 yrs)
                </Link>
              </li>
              <li>
                <Link to="/academics/nursery" className="hover:text-brand-orange transition-colors">
                  Nursery (2.5 - 3.5 yrs)
                </Link>
              </li>
              <li>
                <Link to="/academics/lkg" className="hover:text-brand-orange transition-colors">
                  Junior KG / LKG (3.5 - 4.5 yrs)
                </Link>
              </li>
              <li>
                <Link to="/academics/ukg" className="hover:text-brand-orange transition-colors">
                  Senior KG / UKG (4.5 - 5.5 yrs)
                </Link>
              </li>
              <li>
                <Link to="/academics/approach" className="hover:text-brand-orange transition-colors">
                  Our Play-Way Approach
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-brand-orange transition-colors">
                  Daily Activities & Play
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information & Help */}
          <div>
            <h4 className="font-bubble text-lg text-brand-brown font-bold mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
              <span>Admissions & Info</span>
            </h4>
            <ul className="space-y-2 text-sm font-semibold text-stone-600">
              <li>
                <Link to="/admissions/process" className="hover:text-brand-orange transition-colors">
                  Admission Process
                </Link>
              </li>
              <li>
                <Link to="/admissions/eligibility" className="hover:text-brand-orange transition-colors">
                  Age Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link to="/admissions/documents" className="hover:text-brand-orange transition-colors">
                  Documents Required
                </Link>
              </li>
              <li>
                <Link to="/admissions/faqs" className="hover:text-brand-orange transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-brand-orange transition-colors">
                  Campus Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-brand-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Timings */}
          <div>
            <h4 className="font-bubble text-lg text-brand-brown font-bold mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
              <span>Visit Our Campus</span>
            </h4>
            <ul className="space-y-3 text-sm text-stone-600 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-brand-deepOrange font-semibold">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-green font-semibold"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-brand-blue font-semibold">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-stone-500 pt-1">
                <Clock className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                <span>{settings.timings}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Built with Love */}
        <div className="pt-8 border-t border-brand-orange/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-stone-500">
          <p>
            © {new Date().getFullYear()} The Little Master's Play Way School. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/admin" className="text-brand-deepOrange hover:underline font-bold">
              School Administration Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
