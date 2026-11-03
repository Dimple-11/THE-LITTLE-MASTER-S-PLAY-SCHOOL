import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  SchoolSettings,
  AdmissionEnquiry,
  AdmissionStatus,
  Program,
  GalleryCategory,
  GalleryItem,
  SchoolEvent,
  Announcement,
  Testimonial,
  FAQ,
  PageContent,
} from '@/types';

// Default initial data matching seed.sql
export const DEFAULT_SETTINGS: SchoolSettings = {
  id: 'school-settings-1',
  school_name: "The Little Master's Play Way School",
  tagline: "Little Steps, Big Dreams!",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "admissions@thelittlemasters.edu.in",
  address: "Near Children's Park, Sector 4, Playway Enclave",
  timings: "Mon - Fri: 9:00 AM - 1:00 PM",
  google_maps_url: "https://maps.google.com",
  facebook_url: "https://facebook.com",
  instagram_url: "https://instagram.com",
  youtube_url: "https://youtube.com",
  is_admission_open: true,
};

export const DEFAULT_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    slug: 'playgroup',
    name: 'Playgroup',
    age_group: '1.5 to 2.5 Years',
    timing: '9:30 AM - 12:00 PM',
    badge_color: 'yellow',
    short_description: 'A gentle and joyful first step away from home focused on sensory play, curiosity, and emotional warmth.',
    full_description: 'Our Playgroup program introduces children to a loving, secure, and cheerful world of discovery. Through soft music, tactile textures, storytelling, and free play, toddlers build emotional security and communication.',
    learning_objectives: [
      'Sensory exploration and fine motor control',
      'Early language stimulation and vocabulary through rhymes',
      'Social comfort, sharing, and peer interaction',
      'Gentle transition and routine building'
    ],
    key_features: [
      'Low child-to-teacher ratio (1:6)',
      'Sensory play stations & safe soft corners',
      'Music & movement sessions daily'
    ],
    display_order: 1,
    is_active: true,
  },
  {
    id: 'prog-2',
    slug: 'nursery',
    name: 'Nursery',
    age_group: '2.5 to 3.5 Years',
    timing: '9:00 AM - 12:30 PM',
    badge_color: 'orange',
    short_description: 'Sparking curiosity, foundational phonics, color wonder, and expressive creativity in a joyful atmosphere.',
    full_description: 'In Nursery, children expand their horizons through structured play, phonetic songs, creative art, and theme-based activities that celebrate their natural wonder.',
    learning_objectives: [
      'Pre-reading readiness and phonemic awareness',
      'Number sense, counting, and pattern recognition',
      'Creative self-expression with colors, shapes, and clay',
      'Confidence in expressing thoughts and feelings'
    ],
    key_features: [
      'Storytelling theatre & puppet circle',
      'Colour & shape learning lab',
      'Gross motor obstacle fun and outdoor games'
    ],
    display_order: 2,
    is_active: true,
  },
  {
    id: 'prog-3',
    slug: 'lkg',
    name: 'Junior KG (LKG)',
    age_group: '3.5 to 4.5 Years',
    timing: '9:00 AM - 1:15 PM',
    badge_color: 'blue',
    short_description: 'Structured early literacy, numeracy, logical thinking, and collaborative team play.',
    full_description: 'LKG bridges instinctive curiosity with systematic concepts. Children begin reading two-letter blends, understanding quantities, exploring basic science phenomena, and expressing thoughts articulately.',
    learning_objectives: [
      'Letter-sound blending and early sight words',
      'Quantitative math: counting up to 50, addition concepts',
      'Scientific curiosity: weather, animals, plants, and community helpers',
      'Collaborative teamwork and problem solving'
    ],
    key_features: [
      'Interactive literacy corner',
      'Hands-on math manipulative games',
      'Speech, rhythm, and confidence builders'
    ],
    display_order: 3,
    is_active: true,
  },
  {
    id: 'prog-4',
    slug: 'ukg',
    name: 'Senior KG (UKG)',
    age_group: '4.5 to 5.5 Years',
    timing: '9:00 AM - 1:30 PM',
    badge_color: 'green',
    short_description: 'Comprehensive readiness for primary school with strong reading, creative writing, arithmetic, and leadership.',
    full_description: 'UKG equips young scholars with the confidence, critical thinking, language richness, and joyful discipline needed to excel in formal primary education.',
    learning_objectives: [
      'Fluent sentence reading, comprehension, and expressive writing',
      'Math operations: addition, subtraction, time, and money awareness',
      'General awareness: environment, geography concepts, and logical reasoning',
      'Leadership, independence, self-management, and project work'
    ],
    key_features: [
      'Primary school readiness curriculum',
      'Show-and-tell public speaking practice',
      'STEM exploration & creative problem-solving'
    ],
    display_order: 4,
    is_active: true,
  },
];

export const DEFAULT_CATEGORIES: GalleryCategory[] = [
  { id: 'cat-1', slug: 'all', name: 'All Photos', display_order: 0, is_active: true },
  { id: 'cat-2', slug: 'classrooms', name: 'Classrooms & Spaces', display_order: 1, is_active: true },
  { id: 'cat-3', slug: 'activities', name: 'Creative Activities', display_order: 2, is_active: true },
  { id: 'cat-4', slug: 'celebrations', name: 'Celebrations & Festivals', display_order: 3, is_active: true },
  { id: 'cat-5', slug: 'sports', name: 'Sports & Play', display_order: 4, is_active: true },
  { id: 'cat-6', slug: 'school-moments', name: 'School Moments', display_order: 5, is_active: true },
];

export const DEFAULT_EVENTS: SchoolEvent[] = [
  {
    id: 'event-1',
    title: 'Annual Sports & Splash Day',
    slug: 'annual-sports-day',
    event_date: '2026-11-20',
    start_time: '09:30 AM',
    end_time: '12:30 PM',
    location: 'School Playground & Green Lawn',
    short_description: 'A day of cheerful obstacle races, relay fun, and ribbon games celebrating active little bodies!',
    full_details: 'Parents are cordially invited to cheer our tiny athletes as they participate in fun balancing games, bean bag toss, and rainbow parachute drills.',
    is_published: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'event-2',
    title: 'Colors & Rhymes Carnival',
    slug: 'colors-carnival',
    event_date: '2026-12-05',
    start_time: '10:00 AM',
    end_time: '01:00 PM',
    location: 'Open Activity Amphitheatre',
    short_description: 'An interactive showcase of children’s artwork, music performances, and puppet theater.',
    full_details: 'Join us for a joyful celebration of creativity! Each child will exhibit their own colorful clay models, finger paintings, and perform lively nursery rhymes.',
    is_published: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Admissions Open for Academic Session 2026-27',
    category: 'Admissions',
    content: 'Enquiries and campus visits are now open for Playgroup, Nursery, LKG, and UKG. Limited seats per batch to preserve our high teacher-to-student care ratio.',
    priority: 'high',
    is_pinned: true,
    is_published: true,
    published_date: '2026-11-01',
    created_at: new Date().toISOString(),
  },
  {
    id: 'ann-2',
    title: 'Winter Uniform & Activity Kit Distribution',
    category: 'General Notice',
    content: 'School uniform sets and winter play jackets can be collected from the school administrative desk between 10:00 AM and 1:00 PM on weekdays.',
    priority: 'normal',
    is_pinned: false,
    is_published: true,
    published_date: '2026-11-02',
    created_at: new Date().toISOString(),
  },
];

export const DEFAULT_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'What is the age criteria for Playgroup and Nursery?',
    answer: 'For Playgroup, children should be between 1.5 and 2.5 years old. For Nursery, the age is 2.5 to 3.5 years as of the beginning of the academic session.',
    display_order: 1,
    is_published: true,
  },
  {
    id: 'faq-2',
    category: 'Admissions',
    question: 'What documents are required during admission?',
    answer: 'Required documents include: Child’s Birth Certificate (copy), 4 passport-size photographs of the child, 2 photographs each of parents/guardians, address proof, and immunization/vaccination record.',
    display_order: 2,
    is_published: true,
  },
  {
    id: 'faq-3',
    category: 'Academics & Care',
    question: 'What is your student-to-teacher ratio?',
    answer: 'We strictly maintain a caring 1:6 ratio for Playgroup and 1:10 for Nursery to UKG, supported by attentive female caretakers (didis) at all times.',
    display_order: 3,
    is_published: true,
  },
  {
    id: 'faq-4',
    category: 'Safety & Hygiene',
    question: 'How do you maintain campus safety and hygiene?',
    answer: 'Our campus is fully child-proofed with rounded furniture corners, non-slip flooring, age-adapted child washrooms, CCTV coverage, and clean filtered drinking water.',
    display_order: 4,
    is_published: true,
  },
  {
    id: 'faq-5',
    category: 'Timings',
    question: 'What are the daily school timings?',
    answer: 'Playgroup & Nursery attend from 9:00 AM to 12:30 PM. LKG & UKG attend from 9:00 AM to 1:30 PM, Monday through Friday.',
    display_order: 5,
    is_published: true,
  },
];

export const DEFAULT_PAGE_CONTENT: Record<string, PageContent> = {
  home_hero: {
    id: 'pc-1',
    section_key: 'home_hero',
    title: 'Little Steps, Big Dreams!',
    subtitle: 'Every little mind has a big world waiting to be discovered.',
    body_text: "Welcome to The Little Master's Play Way School, where every day is a delightful adventure filled with laughter, curiosity, colors, and the magic of play-based early learning.",
  },
  home_welcome: {
    id: 'pc-2',
    section_key: 'home_welcome',
    title: "Welcome to The Little Master's Play Way School",
    subtitle: "A warm, nurturing second home where little hearts feel secure and cherished",
    body_text: "At The Little Master's Play Way School, we believe early childhood is a precious chapter of boundless curiosity. We provide an enchanting, safe, and joyful ecosystem where children learn through tactile play, musical rhymes, storytelling, and friendship.",
  },
  principals_message: {
    id: 'pc-3',
    section_key: 'principals_message',
    title: "Message from the Principal",
    subtitle: "Nurturing tender beginnings into confident futures",
    body_text: "Dear Parents and Friends, It is a profound privilege to welcome you to our joyful school family. Early childhood education is not about rigid drills—it is about igniting the spark of natural curiosity, teaching children how to communicate their feelings, and showering them with unconditional warmth.",
  },
};

// Local storage helper keys
const STORAGE_KEYS = {
  SETTINGS: 'lmpw_settings',
  PROGRAMS: 'lmpw_programs',
  GALLERY_CATEGORIES: 'lmpw_gallery_categories',
  GALLERY_ITEMS: 'lmpw_gallery_items',
  EVENTS: 'lmpw_events',
  ANNOUNCEMENTS: 'lmpw_announcements',
  TESTIMONIALS: 'lmpw_testimonials',
  FAQS: 'lmpw_faqs',
  PAGE_CONTENT: 'lmpw_page_content',
  ENQUIRIES: 'lmpw_enquiries',
};

// Helper for LocalStorage fallback
function loadLocal<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(saved);
  } catch {
    return defaultValue;
  }
}

function saveLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

// Data store API
export const DataStore = {
  // SETTINGS
  async getSettings(): Promise<SchoolSettings> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('school_settings').select('*').limit(1).single();
      if (!error && data) return data;
    }
    return loadLocal(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  async updateSettings(settings: Partial<SchoolSettings>): Promise<SchoolSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings, updated_at: new Date().toISOString() };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('school_settings').upsert(updated);
    }
    saveLocal(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // PROGRAMS
  async getPrograms(): Promise<Program[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('programs').select('*').order('display_order');
      if (!error && data && data.length > 0) return data;
    }
    return loadLocal(STORAGE_KEYS.PROGRAMS, DEFAULT_PROGRAMS);
  },

  async updateProgram(id: string, updates: Partial<Program>): Promise<Program[]> {
    const progs = await this.getPrograms();
    const index = progs.findIndex((p) => p.id === id);
    if (index !== -1) {
      progs[index] = { ...progs[index], ...updates };
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('programs').update(updates).eq('id', id);
      }
      saveLocal(STORAGE_KEYS.PROGRAMS, progs);
    }
    return progs;
  },

  // GALLERY CATEGORIES
  async getGalleryCategories(): Promise<GalleryCategory[]> {
    return loadLocal(STORAGE_KEYS.GALLERY_CATEGORIES, DEFAULT_CATEGORIES);
  },

  // GALLERY ITEMS
  async getGalleryItems(): Promise<GalleryItem[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('gallery').select('*').order('display_order');
      if (!error && data) return data;
    }
    return loadLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY_ITEMS, []);
  },

  async addGalleryItem(item: Omit<GalleryItem, 'id' | 'created_at'>): Promise<GalleryItem> {
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      created_at: new Date().toISOString(),
    };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('gallery').insert([newItem]);
    }
    const current = await this.getGalleryItems();
    current.unshift(newItem);
    saveLocal(STORAGE_KEYS.GALLERY_ITEMS, current);
    return newItem;
  },

  async updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem[]> {
    const items = await this.getGalleryItems();
    const idx = items.findIndex((i) => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('gallery').update(updates).eq('id', id);
      }
      saveLocal(STORAGE_KEYS.GALLERY_ITEMS, items);
    }
    return items;
  },

  async deleteGalleryItem(id: string): Promise<GalleryItem[]> {
    let items = await this.getGalleryItems();
    items = items.filter((i) => i.id !== id);
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('gallery').delete().eq('id', id);
    }
    saveLocal(STORAGE_KEYS.GALLERY_ITEMS, items);
    return items;
  },

  // EVENTS
  async getEvents(): Promise<SchoolEvent[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
    return loadLocal(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS);
  },

  async addEvent(event: Omit<SchoolEvent, 'id' | 'created_at'>): Promise<SchoolEvent> {
    const newEvent: SchoolEvent = {
      ...event,
      id: 'event-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('events').insert([newEvent]);
    }
    const events = await this.getEvents();
    events.push(newEvent);
    saveLocal(STORAGE_KEYS.EVENTS, events);
    return newEvent;
  },

  async updateEvent(id: string, updates: Partial<SchoolEvent>): Promise<SchoolEvent[]> {
    const events = await this.getEvents();
    const idx = events.findIndex((e) => e.id === id);
    if (idx !== -1) {
      events[idx] = { ...events[idx], ...updates };
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('events').update(updates).eq('id', id);
      }
      saveLocal(STORAGE_KEYS.EVENTS, events);
    }
    return events;
  },

  async deleteEvent(id: string): Promise<SchoolEvent[]> {
    let events = await this.getEvents();
    events = events.filter((e) => e.id !== id);
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('events').delete().eq('id', id);
    }
    saveLocal(STORAGE_KEYS.EVENTS, events);
    return events;
  },

  // ANNOUNCEMENTS
  async getAnnouncements(): Promise<Announcement[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('announcements').select('*').order('published_date', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    return loadLocal(STORAGE_KEYS.ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS);
  },

  async addAnnouncement(ann: Omit<Announcement, 'id' | 'created_at'>): Promise<Announcement> {
    const newAnn: Announcement = {
      ...ann,
      id: 'ann-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('announcements').insert([newAnn]);
    }
    const anns = await this.getAnnouncements();
    anns.unshift(newAnn);
    saveLocal(STORAGE_KEYS.ANNOUNCEMENTS, anns);
    return newAnn;
  },

  async updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<Announcement[]> {
    const list = await this.getAnnouncements();
    const idx = list.findIndex((a) => a.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('announcements').update(updates).eq('id', id);
      }
      saveLocal(STORAGE_KEYS.ANNOUNCEMENTS, list);
    }
    return list;
  },

  async deleteAnnouncement(id: string): Promise<Announcement[]> {
    let list = await this.getAnnouncements();
    list = list.filter((a) => a.id !== id);
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('announcements').delete().eq('id', id);
    }
    saveLocal(STORAGE_KEYS.ANNOUNCEMENTS, list);
    return list;
  },

  // TESTIMONIALS
  async getTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return loadLocal<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, []);
  },

  async addTestimonial(test: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> {
    const newTest: Testimonial = {
      ...test,
      id: 'test-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('testimonials').insert([newTest]);
    }
    const list = await this.getTestimonials();
    list.unshift(newTest);
    saveLocal(STORAGE_KEYS.TESTIMONIALS, list);
    return newTest;
  },

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial[]> {
    const list = await this.getTestimonials();
    const idx = list.findIndex((t) => t.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('testimonials').update(updates).eq('id', id);
      }
      saveLocal(STORAGE_KEYS.TESTIMONIALS, list);
    }
    return list;
  },

  async deleteTestimonial(id: string): Promise<Testimonial[]> {
    let list = await this.getTestimonials();
    list = list.filter((t) => t.id !== id);
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('testimonials').delete().eq('id', id);
    }
    saveLocal(STORAGE_KEYS.TESTIMONIALS, list);
    return list;
  },

  // FAQS
  async getFAQs(): Promise<FAQ[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('faqs').select('*').order('display_order');
      if (!error && data && data.length > 0) return data;
    }
    return loadLocal(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
  },

  async addFAQ(faq: Omit<FAQ, 'id'>): Promise<FAQ> {
    const newFaq: FAQ = {
      ...faq,
      id: 'faq-' + Date.now(),
    };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('faqs').insert([newFaq]);
    }
    const list = await this.getFAQs();
    list.push(newFaq);
    saveLocal(STORAGE_KEYS.FAQS, list);
    return newFaq;
  },

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<FAQ[]> {
    const list = await this.getFAQs();
    const idx = list.findIndex((f) => f.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('faqs').update(updates).eq('id', id);
      }
      saveLocal(STORAGE_KEYS.FAQS, list);
    }
    return list;
  },

  async deleteFAQ(id: string): Promise<FAQ[]> {
    let list = await this.getFAQs();
    list = list.filter((f) => f.id !== id);
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('faqs').delete().eq('id', id);
    }
    saveLocal(STORAGE_KEYS.FAQS, list);
    return list;
  },

  // PAGE CONTENT
  async getPageContent(sectionKey: string): Promise<PageContent> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('page_content').select('*').eq('section_key', sectionKey).single();
      if (!error && data) return data;
    }
    const all = loadLocal(STORAGE_KEYS.PAGE_CONTENT, DEFAULT_PAGE_CONTENT);
    return all[sectionKey] || {
      id: 'pc-' + sectionKey,
      section_key: sectionKey,
      title: '',
      subtitle: '',
      body_text: '',
    };
  },

  async updatePageContent(sectionKey: string, updates: Partial<PageContent>): Promise<PageContent> {
    const current = await this.getPageContent(sectionKey);
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('page_content').upsert(updated);
    }
    const all = loadLocal(STORAGE_KEYS.PAGE_CONTENT, DEFAULT_PAGE_CONTENT);
    all[sectionKey] = updated;
    saveLocal(STORAGE_KEYS.PAGE_CONTENT, all);
    return updated;
  },

  // ADMISSION ENQUIRIES
  async submitAdmissionEnquiry(form: {
    parent_name: string;
    phone: string;
    email?: string;
    child_name?: string;
    child_age_group: string;
    interested_class: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG';
    message?: string;
  }): Promise<{ success: boolean; reference_id: string; error?: string }> {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const reference_id = `LMPW-${new Date().getFullYear()}-${randomHex}`;

    const newEnquiry: AdmissionEnquiry = {
      id: 'enq-' + Date.now(),
      reference_id,
      parent_name: form.parent_name.trim(),
      phone: form.phone.trim(),
      email: form.email?.trim() || undefined,
      child_name: form.child_name?.trim() || undefined,
      child_age_group: form.child_age_group,
      interested_class: form.interested_class,
      message: form.message?.trim() || undefined,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('admission_enquiries').insert([newEnquiry]);
      if (error) {
        console.error('Supabase insert enquiry error:', error);
      }
    }

    // Always mirror in LocalStorage for admin visibility
    const list = loadLocal<AdmissionEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    list.unshift(newEnquiry);
    saveLocal(STORAGE_KEYS.ENQUIRIES, list);

    return { success: true, reference_id };
  },

  async getAdmissionEnquiries(): Promise<AdmissionEnquiry[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('admission_enquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    }
    return loadLocal<AdmissionEnquiry[]>(STORAGE_KEYS.ENQUIRIES, [
      {
        id: 'sample-enq-1',
        reference_id: 'LMPW-2026-8492',
        parent_name: 'Priya Sharma (Sample)',
        phone: '+91 98765 11223',
        email: 'priya.sample@example.com',
        child_name: 'Aarav',
        child_age_group: '2.5 to 3.5 Years',
        interested_class: 'Nursery',
        message: 'Looking for a warm play-way school starting next term.',
        status: 'new',
        internal_notes: 'Parent enquired about morning transport.',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'sample-enq-2',
        reference_id: 'LMPW-2026-5120',
        parent_name: 'Rahul Verma (Sample)',
        phone: '+91 98450 99887',
        email: 'rahul.sample@example.com',
        child_name: 'Ananya',
        child_age_group: '3.5 to 4.5 Years',
        interested_class: 'LKG',
        message: 'Interested in curriculum and campus tour this Saturday.',
        status: 'contacted',
        internal_notes: 'Telephonic counseling done. Campus visit invited.',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ]);
  },

  async updateAdmissionEnquiry(id: string, updates: Partial<AdmissionEnquiry>): Promise<AdmissionEnquiry[]> {
    const list = await this.getAdmissionEnquiries();
    const idx = list.findIndex((e) => e.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates, updated_at: new Date().toISOString() };
      if (isSupabaseConfigured() && supabase) {
        await supabase.from('admission_enquiries').update(updates).eq('id', id);
      }
      saveLocal(STORAGE_KEYS.ENQUIRIES, list);
    }
    return list;
  },

  async deleteAdmissionEnquiry(id: string): Promise<AdmissionEnquiry[]> {
    let list = await this.getAdmissionEnquiries();
    list = list.filter((e) => e.id !== id);
    if (isSupabaseConfigured() && supabase) {
      await supabase.from('admission_enquiries').delete().eq('id', id);
    }
    saveLocal(STORAGE_KEYS.ENQUIRIES, list);
    return list;
  },

  // Reset to factory defaults
  resetAllDemoData(): void {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  },
};
