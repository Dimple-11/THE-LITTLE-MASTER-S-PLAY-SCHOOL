import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Camera, Check } from 'lucide-react';
import { DataStore } from '@/services/store';
import { GalleryItem, GalleryCategory, SchoolEvent } from '@/types';
import {
  ArtCraftIcon,
  StorytellingIcon,
  MusicDanceIcon,
  SportsIcon,
  CelebrationsIcon,
  CreativeLearningIcon,
} from '@/components/illustrations/ActivityIllustrations';
import { EmptyGalleryIllustration } from '@/components/illustrations/EmptyGalleryIllustration';

export const Activities: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-brand-orange/20 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Life at School
        </span>
        <h1 className="text-4xl md:text-6xl font-bubble text-brand-brown">
          Activities That Spark Wonder
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Every day at The Little Master's is an invigorating blend of imagination, physical movement, creative art, and social joy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Art, Craft & Sensory Play',
            icon: <ArtCraftIcon className="w-20 h-20" />,
            desc: 'Finger-painting, sponge-dabbing, clay modeling, vegetable printing, and sensory collage work that strengthens fine motor finger coordination.',
          },
          {
            title: 'Interactive Storytelling',
            icon: <StorytellingIcon className="w-20 h-20" />,
            desc: 'Puppet theatre, voice modulations, big picture book reading circles, and dramatization that awaken rich vocabulary and imagination.',
          },
          {
            title: 'Music, Rhythm & Dance',
            icon: <MusicDanceIcon className="w-20 h-20" />,
            desc: 'Tambourines, xylophones, rhythm clapping, daily morning rhymes, and lively creative movement that foster auditory sequencing.',
          },
          {
            title: 'Sports, Balance & Outdoor Games',
            icon: <SportsIcon className="w-20 h-20" />,
            desc: 'Parachute games, bean-bag toss, crawl tunnels, balance beams, and splash games promoting agility and gross motor health.',
          },
          {
            title: 'Festivals & Theme Celebrations',
            icon: <CelebrationsIcon className="w-20 h-20" />,
            desc: 'Cultural festivals, seasonal dress-up days, grand carnival celebrations, and grandparent appreciation mornings.',
          },
          {
            title: 'Early STEM & Wonder Lab',
            icon: <CreativeLearningIcon className="w-20 h-20" />,
            desc: 'Hands-on discovery: plant seed germination, magnetic curiosities, color mixing experiments, and floating/sinking experiments.',
          },
        ].map((act, i) => (
          <div
            key={i}
            className="bg-white rounded-5xl p-8 border-3 border-brand-yellow shadow-card space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="mb-4">{act.icon}</div>
              <h3 className="text-2xl font-bubble text-brand-brown mb-2">{act.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed font-medium">{act.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  useEffect(() => {
    DataStore.getGalleryCategories().then(setCategories);
    DataStore.getGalleryItems().then(setItems);
  }, []);

  const filteredItems = items.filter(
    (item) => item.is_published && (activeCategory === 'all' || item.category_slug === activeCategory)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-brand-yellow/40 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          Moments & Memories
        </span>
        <h1 className="text-4xl md:text-6xl font-bubble text-brand-brown">
          Campus Photo Gallery
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          A visual record of smiles, activities, and joyful milestones at The Little Master's Play Way School.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full font-bubble text-sm transition-all cursor-pointer ${
                activeCategory === cat.slug
                  ? 'bg-brand-orange text-white shadow-playful-orange scale-105'
                  : 'bg-white hover:bg-brand-yellow/30 text-brand-brown border border-brand-orange/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <EmptyGalleryIllustration />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImg(item)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-brand-yellow shadow-card hover:scale-102 transition-transform"
            >
              <div className="aspect-square bg-brand-cream overflow-hidden">
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

      {/* Lightbox */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-hidden p-3">
            <img
              src={selectedImg.image_url}
              alt={selectedImg.alt_text}
              className="max-h-[75vh] w-auto mx-auto rounded-2xl object-contain"
            />
            <div className="p-4 text-center">
              <h4 className="font-bubble text-2xl text-brand-brown">{selectedImg.title}</h4>
              {selectedImg.caption && <p className="text-stone-600 text-sm mt-1">{selectedImg.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Celebrations: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-orange/20 text-brand-deepOrange font-bubble text-sm font-bold uppercase tracking-wider">
          School Festivals
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Joyful Celebrations
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Celebrating unity in diversity, colors of nature, and childhood milestones.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            title: 'Colors & Seasons Carnival',
            desc: 'Each term we host dedicated Yellow Day, Rainbow Day, and Green Nature Days where children bring themed toys and wear bright outfits.',
            emoji: '🌈',
          },
          {
            title: 'Festivals of Unity',
            desc: 'Diwali, Eid, Christmas, Holi, and Independence Day are celebrated with simple storytelling, traditional art, sweet sharing, and communal friendship.',
            emoji: '✨',
          },
          {
            title: 'Grandparents’ Day Circle',
            desc: 'A cherished morning where grandparents visit our classrooms for storytelling, classic nursery games, and warm family bonding.',
            emoji: '👵👴',
          },
          {
            title: 'Annual Graduation & Wings Ceremony',
            desc: 'A proud milestone for our UKG scholars as they receive graduation scrolls and step forward into primary schooling with confidence.',
            emoji: '🎓',
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-yellow shadow-card flex gap-5 items-start">
            <span className="text-4xl p-3 rounded-2xl bg-brand-cream border border-brand-orange/20 flex-shrink-0">
              {item.emoji}
            </span>
            <div>
              <h3 className="text-2xl font-bubble text-brand-brown mb-2">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Events: React.FC = () => {
  const [events, setEvents] = useState<SchoolEvent[]>([]);

  useEffect(() => {
    DataStore.getEvents().then((evts) => setEvents(evts.filter((e) => e.is_published)));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-brand-blue/20 text-brand-blue font-bubble text-sm font-bold uppercase tracking-wider">
          School Calendar
        </span>
        <h1 className="text-4xl md:text-5xl font-bubble text-brand-brown">
          Events Calendar
        </h1>
        <p className="text-stone-600 text-lg font-medium">
          Mark your calendars for our upcoming school happenings, sports days, and parent workshops.
        </p>
      </div>

      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="bg-white rounded-4xl p-10 border-2 border-brand-yellow text-center">
            <Calendar className="w-12 h-12 text-brand-orange mx-auto mb-3" />
            <h4 className="font-bubble text-2xl text-brand-brown mb-2">Upcoming Events Being Scheduled</h4>
            <p className="text-stone-600 text-sm">Please check back soon or follow our school notices.</p>
          </div>
        ) : (
          events.map((evt) => (
            <div key={evt.id} className="bg-white rounded-4xl p-6 md:p-8 border-2 border-brand-orange/30 shadow-card">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-brand-deepOrange uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4" />
                <span>{evt.event_date}</span>
                {evt.start_time && (
                  <>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{evt.start_time} - {evt.end_time || 'Finish'}</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl md:text-3xl font-bubble text-brand-brown mb-3">{evt.title}</h3>
              <p className="text-stone-600 leading-relaxed font-medium mb-4">{evt.short_description}</p>
              {evt.full_details && (
                <div className="p-4 rounded-2xl bg-brand-cream border border-brand-yellow text-xs text-stone-700 leading-relaxed">
                  {evt.full_details}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
