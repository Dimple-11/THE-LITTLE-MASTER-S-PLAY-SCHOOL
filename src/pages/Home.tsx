import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Heart,
  Smile,
  ShieldCheck,
  Star,
  Users,
  Compass,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { DataStore } from '@/services/store';
import { Program, SchoolEvent, Announcement, GalleryItem, SchoolSettings, PageContent } from '@/types';
import { FloatingDoodles } from '@/components/illustrations/FloatingDoodles';
import { HeroPlaygroundIllustration } from '@/components/illustrations/HeroPlaygroundIllustration';
import {
  PlaygroupIllustration,
  NurseryIllustration,
  LkgIllustration,
  UkgIllustration,
} from '@/components/illustrations/ProgramIllustrations';
import {
  ArtCraftIcon,
  StorytellingIcon,
  MusicDanceIcon,
  SportsIcon,
  CelebrationsIcon,
  CreativeLearningIcon,
} from '@/components/illustrations/ActivityIllustrations';
import { EmptyGalleryIllustration } from '@/components/illustrations/EmptyGalleryIllustration';
import { LittleLearnersCorner } from '@/components/games/LittleLearnersCorner';

interface HomeProps {
  settings: SchoolSettings;
  onOpenAdmission: (defaultClass?: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG') => void;
}

export const Home: React.FC<HomeProps> = ({ settings, onOpenAdmission }) => {
  const [heroContent, setHeroContent] = useState<PageContent | null>(null);
  const [welcomeContent, setWelcomeContent] = useState<PageContent | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [hero, welcome, progs, evts, anns, gal] = await Promise.all([
        DataStore.getPageContent('home_hero'),
        DataStore.getPageContent('home_welcome'),
        DataStore.getPrograms(),
        DataStore.getEvents(),
        DataStore.getAnnouncements(),
        DataStore.getGalleryItems(),
      ]);
      setHeroContent(hero);
      setWelcomeContent(welcome);
      setPrograms(progs);
      setEvents(evts.filter((e) => e.is_published));
      setAnnouncements(anns.filter((a) => a.is_published));
      setGalleryItems(gal.filter((g) => g.is_published));
    };
    loadData();
  }, []);

  return (
    <div className="space-y-20 md:space-y-28 overflow-hidden">
      {/* ======================================================== */}
      {/* SECTION 1: HERO */}
      {/* ======================================================== */}
      <section className="relative pt-6 pb-12 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <FloatingDoodles />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Playful Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border-2 border-brand-yellow shadow-sm text-brand-brown font-bubble text-sm md:text-base"
            >
              <span className="w-3 h-3 rounded-full bg-brand-orange animate-ping" />
              <span className="font-bold text-brand-deepOrange">Welcome to Pure Joyful Learning</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-bubble text-brand-brown leading-[1.08] tracking-tight"
            >
              Little Steps,{' '}
              <span className="relative inline-block text-brand-deepOrange">
                Big Dreams!
                <svg
                  className="absolute -bottom-2 left-0 w-full h-4 text-brand-yellow -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-stone-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {heroContent?.subtitle || 'Every little mind has a big world waiting to be discovered.'}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-stone-600 text-base max-w-xl mx-auto lg:mx-0"
            >
              {heroContent?.body_text ||
                "At The Little Master's Play Way School, we believe every child is born a curious explorer. Through play, music, storytelling, and warm encouragement, we spark a lifelong love for learning."}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => onOpenAdmission()}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange to-brand-deepOrange hover:from-brand-deepOrange hover:to-brand-orange text-white font-bubble text-lg font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-brand-yellow" />
                <span>Enquire for Admission</span>
              </button>

              <a
                href="#our-programs"
                className="px-7 py-4 rounded-full bg-white hover:bg-brand-yellow/30 text-brand-brown font-bubble text-lg font-bold border-2 border-brand-yellow shadow-playful hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-5 h-5 text-brand-orange" />
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-bold text-stone-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                <span>Caring 1:6 Ratio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Activity-Based Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                <span>Child-Safe Campus</span>
              </div>
            </motion.div>
          </div>

          {/* Right Vector Illustration Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroPlaygroundIllustration />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PINNED ANNOUNCEMENTS (IF ANY) */}
      {/* ======================================================== */}
      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-peach/80 via-white to-brand-peach/80 border-2 border-brand-orange/40 rounded-3xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-brand-orange text-white flex items-center justify-center flex-shrink-0 font-bubble text-lg font-bold">
                📢
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-deepOrange">
                  Latest Announcement
                </span>
                <h4 className="font-bubble text-base md:text-lg text-brand-brown font-bold">
                  {announcements[0].title}
                </h4>
                <p className="text-stone-600 text-xs md:text-sm line-clamp-1">
                  {announcements[0].content}
                </p>
              </div>
            </div>

            <Link
              to="/events"
              className="px-4 py-2 rounded-full bg-white hover:bg-brand-orange hover:text-white border border-brand-orange/40 text-brand-deepOrange font-bubble text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>View All Notices</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: WELCOME TO OUR SCHOOL */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-5xl p-8 md:p-14 border-4 border-brand-yellow/60 shadow-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 text-center">
              <div className="relative inline-block">
                <img
                  src="/logo.png"
                  alt="Official Logo"
                  className="w-56 md:w-72 h-auto mx-auto drop-shadow-xl animate-float-medium"
                />
                <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-brand-cream border border-brand-orange/30 font-bubble text-xs font-bold text-brand-brown">
                  Official School Emblem
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-yellow/30 text-brand-deepOrange font-bubble text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 text-brand-red fill-brand-red" />
                <span>Our Heartfelt Welcome</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bubble text-brand-brown leading-tight">
                {welcomeContent?.title || "Welcome to The Little Master's Play Way School"}
              </h2>

              <p className="text-lg font-semibold text-brand-deepOrange">
                {welcomeContent?.subtitle || 'A warm, nurturing second home where little hearts feel secure and cherished.'}
              </p>

              <p className="text-stone-600 leading-relaxed font-medium">
                {welcomeContent?.body_text ||
                  "At The Little Master's Play Way School, we believe childhood is a sacred season of wonder. Our play-centric curriculum inspires children to ask questions, explore colors, embrace friendships, and build a lifelong love for learning in a safe, affectionate, and stimulating environment."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-brand-cream border border-brand-yellow">
                  <div className="font-bubble text-2xl font-bold text-brand-red">100%</div>
                  <div className="text-xs font-bold text-stone-600">Play-Way Method</div>
                </div>
                <div className="p-4 rounded-2xl bg-brand-cream border border-brand-yellow">
                  <div className="font-bubble text-2xl font-bold text-brand-blue">1 : 6</div>
                  <div className="text-xs font-bold text-stone-600">Teacher Ratio</div>
                </div>
                <div className="p-4 rounded-2xl bg-brand-cream border border-brand-yellow col-span-2 sm:col-span-1">
                  <div className="font-bubble text-2xl font-bold text-brand-green">Safe</div>
                  <div className="text-xs font-bold text-stone-600">Child-First Campus</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-brand-deepOrange hover:text-brand-orange font-bubble text-base font-bold underline decoration-2 underline-offset-4"
                >
                  <span>Read Our Complete Story & Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: WHY CHOOSE US (6 PILLARS) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-brand-orange/20 text-brand-deepOrange font-bubble text-xs font-bold uppercase tracking-wider">
            Why Parents Love Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bubble text-brand-brown mt-2 mb-3">
            Six Pillars of Joyful Learning
          </h2>
          <p className="text-stone-600 font-medium">
            Every day is thoughtfully shaped to inspire young hearts and active minds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Learning Through Play',
              desc: 'Children learn best when their hands are busy and hearts are smiling. Our tactile toys and sensory puzzles turn curiosity into knowledge.',
              color: 'border-brand-yellow bg-white',
              badge: 'bg-brand-yellow text-brand-brown',
              icon: Smile,
            },
            {
              title: 'Creative Development',
              desc: 'From messy finger-painting to modeling soft dough, we encourage unfettered imagination and original self-expression.',
              color: 'border-brand-orange bg-white',
              badge: 'bg-brand-orange text-white',
              icon: Sparkles,
            },
            {
              title: 'Caring Environment',
              desc: 'Gentle, trained educators and attentive caretakers ensure every child feels emotionally secure, listened to, and loved.',
              color: 'border-brand-red bg-white',
              badge: 'bg-brand-red text-white',
              icon: Heart,
            },
            {
              title: 'Confidence Building',
              desc: 'Show-and-tell circles, stage performances, and rhyme recitals help little ones speak boldly and discover their unique voice.',
              color: 'border-brand-blue bg-white',
              badge: 'bg-brand-blue text-white',
              icon: Star,
            },
            {
              title: 'Social Development',
              desc: 'We cultivate kindness, sharing, waiting for one’s turn, empathy, and joyful camaraderie through group games and collaborative projects.',
              color: 'border-brand-green bg-white',
              badge: 'bg-brand-green text-white',
              icon: Users,
            },
            {
              title: 'Activity-Based Curriculum',
              desc: 'Every week explores a vibrant theme—from animals and seasons to community heroes—bringing concepts to vivid life.',
              color: 'border-brand-deepOrange bg-white',
              badge: 'bg-brand-deepOrange text-white',
              icon: Compass,
            },
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className={`p-7 rounded-4xl border-2 ${pillar.color} shadow-card transition-all flex flex-col justify-between`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${pillar.badge} flex items-center justify-center mb-4 shadow-sm`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bubble text-brand-brown mb-2">{pillar.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: OUR PROGRAMS (PLAYGROUP, NURSERY, LKG, UKG) */}
      {/* ======================================================== */}
      <section id="our-programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-xs font-bold uppercase tracking-wider">
            Academic Programs
          </span>
          <h2 className="text-3xl md:text-5xl font-bubble text-brand-brown mt-2 mb-3">
            Designed for Every Stage of Wonder
          </h2>
          <p className="text-stone-600 font-medium">
            Age-appropriate curricula that nurture cognitive, motor, linguistic, and emotional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => {
            const illustrations = {
              playgroup: <PlaygroupIllustration className="w-24 h-24 mx-auto" />,
              nursery: <NurseryIllustration className="w-24 h-24 mx-auto" />,
              lkg: <LkgIllustration className="w-24 h-24 mx-auto" />,
              ukg: <UkgIllustration className="w-24 h-24 mx-auto" />,
            };

            const borderColors = {
              yellow: 'border-brand-yellow hover:border-brand-orange',
              orange: 'border-brand-orange hover:border-brand-deepOrange',
              blue: 'border-brand-blue hover:border-brand-blue',
              green: 'border-brand-green hover:border-brand-green',
              red: 'border-brand-red hover:border-brand-red',
            };

            const headerColors = {
              yellow: 'bg-brand-yellow/30 text-brand-deepOrange',
              orange: 'bg-brand-orange/20 text-brand-deepOrange',
              blue: 'bg-blue-100 text-brand-blue',
              green: 'bg-green-100 text-brand-green',
              red: 'bg-red-100 text-brand-red',
            };

            return (
              <motion.div
                key={prog.id}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-4xl p-6 border-3 ${borderColors[prog.badge_color]} shadow-card transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="text-center mb-4">
                    {illustrations[prog.slug] || <PlaygroupIllustration className="w-24 h-24 mx-auto" />}
                    <h3 className="text-2xl font-bubble text-brand-brown mt-3">{prog.name}</h3>
                    <div className="mt-1 inline-block px-3 py-1 rounded-full font-bubble text-xs font-bold uppercase tracking-wide">
                      <span className={`px-2.5 py-0.5 rounded-full ${headerColors[prog.badge_color]}`}>
                        Age: {prog.age_group}
                      </span>
                    </div>
                  </div>

                  <p className="text-stone-600 text-xs sm:text-sm font-medium leading-relaxed mb-4 text-center">
                    {prog.short_description}
                  </p>

                  <div className="border-t border-brand-cream pt-3 space-y-1.5 mb-6">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Key Highlights:
                    </p>
                    {prog.learning_objectives.slice(0, 2).map((obj, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-stone-600 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to={`/academics/${prog.slug}`}
                    className="w-full py-2.5 rounded-2xl bg-brand-cream hover:bg-brand-yellow/40 text-brand-brown font-bubble text-xs font-bold text-center block transition-colors"
                  >
                    View Curriculum & Details
                  </Link>
                  <button
                    onClick={() =>
                      onOpenAdmission(
                        prog.slug === 'playgroup'
                          ? 'Playgroup'
                          : prog.slug === 'nursery'
                          ? 'Nursery'
                          : prog.slug === 'lkg'
                          ? 'LKG'
                          : 'UKG'
                      )
                    }
                    className="w-full py-2.5 rounded-2xl bg-brand-orange hover:bg-brand-deepOrange text-white font-bubble text-xs font-bold text-center block shadow-playful-orange hover:scale-102 active:scale-98 transition-all"
                  >
                    Enquire for {prog.name}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: LEARNING THROUGH ACTIVITIES */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-brand-green/20 text-brand-green font-bubble text-xs font-bold uppercase tracking-wider">
            Hands-on Discovery
          </span>
          <h2 className="text-3xl md:text-5xl font-bubble text-brand-brown mt-2 mb-3">
            Learning Through Activities
          </h2>
          <p className="text-stone-600 font-medium">
            Where creativity flows freely and every lesson is a delightful game.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Art & Craft', icon: <ArtCraftIcon className="w-16 h-16 mx-auto mb-2" />, desc: 'Colors, clay & collages' },
            { name: 'Storytelling', icon: <StorytellingIcon className="w-16 h-16 mx-auto mb-2" />, desc: 'Puppets & picture books' },
            { name: 'Music & Dance', icon: <MusicDanceIcon className="w-16 h-16 mx-auto mb-2" />, desc: 'Rhythm, bells & songs' },
            { name: 'Sports & Play', icon: <SportsIcon className="w-16 h-16 mx-auto mb-2" />, desc: 'Obstacle fun & balance' },
            { name: 'Celebrations', icon: <CelebrationsIcon className="w-16 h-16 mx-auto mb-2" />, desc: 'Festivals & color days' },
            { name: 'Creative STEM', icon: <CreativeLearningIcon className="w-16 h-16 mx-auto mb-2" />, desc: 'Sensory science sparks' },
          ].map((act, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-3xl p-5 border-2 border-brand-yellow/60 text-center shadow-card flex flex-col items-center justify-center transition-all"
            >
              {act.icon}
              <h4 className="font-bubble text-base text-brand-brown font-bold">{act.name}</h4>
              <p className="text-stone-500 text-xs font-semibold mt-1">{act.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: OUR SCHOOL ENVIRONMENT (ILLUSTRATED CARDS) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-yellow/20 via-brand-peach/30 to-brand-cream rounded-5xl p-8 md:p-14 border-4 border-brand-yellow/40">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3.5 py-1 rounded-full bg-white border border-brand-orange/30 text-brand-deepOrange font-bubble text-xs font-bold uppercase tracking-wider">
              Campus Spaces
            </span>
            <h2 className="text-3xl md:text-5xl font-bubble text-brand-brown mt-2 mb-3">
              Our Thoughtful Learning Environment
            </h2>
            <p className="text-stone-600 font-medium">
              Child-proportioned, safety-certified spaces designed for laughter, wonder, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sensory Activity Studio',
                desc: 'Soft textured floors, Montessori tactile cubes, play dough tables, and water-sand sensory tubs.',
                emoji: '🎨',
              },
              {
                title: 'Little Readers’ Treehouse',
                desc: 'Cozy cushions, soft lighting, and hundreds of vibrant picture storybooks within easy child reach.',
                emoji: '📚',
              },
              {
                title: 'Safe Soft Play & Outdoor Lawn',
                desc: 'Rounded rubberized corners, gentle slides, mini obstacle courses, and green grass for running.',
                emoji: '🏃‍♂️',
              },
              {
                title: 'Hygiene-First Child Washrooms',
                desc: 'Miniature toilets, low-height warm-water sinks, sanitized touchpoints, and dedicated female attendants.',
                emoji: '🧼',
              },
              {
                title: 'Music & Movement Arena',
                desc: 'Xylophones, tambourines, soft floor mats, and open space for rhythmic morning yoga and joyful dance.',
                emoji: '🎵',
              },
              {
                title: 'Gated Secure Reception',
                desc: 'Full CCTV monitoring, verified pickup cards, and single secure entry to protect our young scholars.',
                emoji: '🛡️',
              },
            ].map((facility, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border-2 border-brand-orange/20 shadow-sm"
              >
                <div className="text-3xl mb-3">{facility.emoji}</div>
                <h3 className="font-bubble text-xl text-brand-brown mb-2">{facility.title}</h3>
                <p className="text-stone-600 text-sm font-medium leading-relaxed">{facility.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-stone-500 font-medium">
              📸 Notice: Actual campus photographs can be uploaded directly by school administrators in the admin dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: PHOTO GALLERY */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-brand-orange/20 text-brand-deepOrange font-bubble text-xs font-bold uppercase tracking-wider">
            Moments & Smiles
          </span>
          <h2 className="text-3xl md:text-5xl font-bubble text-brand-brown mt-2 mb-3">
            Campus Photo Gallery
          </h2>
          <p className="text-stone-600 font-medium">
            A window into the joy, friendships, and milestone moments at our school.
          </p>
        </div>

        {galleryItems.length === 0 ? (
          <EmptyGalleryIllustration />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryImg(item)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-yellow shadow-card hover:scale-102 transition-transform"
              >
                <div className="relative aspect-square overflow-hidden bg-brand-cream">
                  <img
                    src={item.image_url}
                    alt={item.alt_text}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bubble text-base text-brand-brown font-bold truncate">{item.title}</h4>
                  {item.caption && <p className="text-xs text-stone-500 line-clamp-1">{item.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedGalleryImg && (
          <div
            onClick={() => setSelectedGalleryImg(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="relative max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-hidden p-2">
              <img
                src={selectedGalleryImg.image_url}
                alt={selectedGalleryImg.alt_text}
                className="max-h-[75vh] w-auto mx-auto rounded-2xl object-contain"
              />
              <div className="p-4 text-center">
                <h4 className="font-bubble text-xl text-brand-brown">{selectedGalleryImg.title}</h4>
                {selectedGalleryImg.caption && (
                  <p className="text-stone-600 text-sm">{selectedGalleryImg.caption}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* SECTION 8: EVENTS AND CELEBRATIONS */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-brand-blue/20 text-brand-blue font-bubble text-xs font-bold uppercase tracking-wider">
            Calendar of Fun
          </span>
          <h2 className="text-3xl md:text-5xl font-bubble text-brand-brown mt-2 mb-3">
            Upcoming Events & Celebrations
          </h2>
          <p className="text-stone-600 font-medium">
            Exciting milestones, carnival days, and festive gatherings for our students and families.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-4xl p-8 border-2 border-brand-yellow text-center max-w-md mx-auto">
            <Calendar className="w-12 h-12 text-brand-orange mx-auto mb-3" />
            <h4 className="font-bubble text-xl text-brand-brown mb-1">Events Calendar Coming Soon</h4>
            <p className="text-stone-600 text-sm">
              Our seasonal celebrations schedule will be updated right here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-4xl p-6 border-2 border-brand-orange/30 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-deepOrange uppercase tracking-wider mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{evt.event_date}</span>
                    {evt.start_time && (
                      <>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{evt.start_time}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bubble text-brand-brown mb-2">{evt.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{evt.short_description}</p>
                </div>

                <div className="pt-3 border-t border-brand-cream flex items-center justify-between text-xs text-stone-500 font-bold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    <span>{evt.location || 'School Campus'}</span>
                  </span>
                  <Link to="/events" className="text-brand-orange hover:underline">
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* PART 9: LITTLE LEARNERS' CORNER (INTERACTIVE MINI-GAMES) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LittleLearnersCorner />
      </section>

      {/* ======================================================== */}
      {/* SECTION 10: ADMISSION CTA */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-orange via-brand-deepOrange to-brand-orange rounded-5xl p-8 md:p-14 text-white text-center shadow-playful-orange relative overflow-hidden">
          {/* Subtle floating dots */}
          <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-brand-yellow font-bubble text-xs md:text-sm font-bold uppercase tracking-wider">
              ✨ Admissions Open 2026-27
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bubble text-white leading-tight">
              Every Big Journey Begins With A Little Step!
            </h2>

            <p className="text-white/90 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Give your child the gift of a joyful childhood, compassionate mentors, and a lifelong thirst for learning.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenAdmission()}
                className="px-8 py-4 rounded-full bg-brand-yellow hover:bg-white text-brand-brown font-bubble text-lg font-bold shadow-playful-yellow hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Apply for Admission Now
              </button>

              <a
                href={`tel:${settings.phone}`}
                className="px-7 py-4 rounded-full bg-white/20 hover:bg-white/30 text-white font-bubble text-lg font-bold border-2 border-white/40 transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Admissions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 11: CONTACT & MAP */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-5xl p-8 md:p-12 border-4 border-brand-yellow/60 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Contact Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="px-3.5 py-1 rounded-full bg-brand-cream border border-brand-orange/30 text-brand-deepOrange font-bubble text-xs font-bold uppercase tracking-wider">
                  Get in Touch
                </span>
                <h3 className="text-3xl md:text-4xl font-bubble text-brand-brown mt-2">
                  Visit The Little Master's
                </h3>
                <p className="text-stone-600 font-medium text-sm mt-1">
                  We warmly invite you for a personal walkthrough of our classrooms and play areas.
                </p>
              </div>

              <div className="space-y-4 text-sm font-semibold">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-bold block uppercase">Campus Address</span>
                    <span className="text-brand-brown">{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-bold block uppercase">Call Us Directly</span>
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
                    <span className="text-xs text-stone-500 font-bold block uppercase">WhatsApp Coordinator</span>
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
                    <span className="text-xs text-stone-500 font-bold block uppercase">Email Inquiries</span>
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
                    <span className="text-xs text-stone-500 font-bold block uppercase">School Timings</span>
                    <span className="text-stone-700">{settings.timings}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder / Card */}
            <div className="lg:col-span-6">
              <div className="bg-brand-cream border-2 border-dashed border-brand-orange/40 rounded-4xl p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8" />
                </div>
                <h4 className="font-bubble text-xl text-brand-brown">
                  Interactive Campus Map
                </h4>
                <p className="text-stone-600 text-xs sm:text-sm max-w-sm mx-auto">
                  Located conveniently near playparks and family neighborhoods with easy drop-off and pickup parking.
                </p>
                <a
                  href={settings.google_maps_url || 'https://maps.google.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-orange text-white font-bubble text-sm font-bold shadow-playful-orange hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
