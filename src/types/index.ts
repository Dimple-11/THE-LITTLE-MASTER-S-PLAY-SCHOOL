export interface SchoolSettings {
  id: string;
  school_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  timings: string;
  google_maps_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  is_admission_open: boolean;
  updated_at?: string;
}

export type AdmissionStatus = 'new' | 'contacted' | 'scheduled_visit' | 'enrolled' | 'archived';

export interface AdmissionEnquiry {
  id: string;
  reference_id: string;
  parent_name: string;
  phone: string;
  email?: string;
  child_name?: string;
  child_age_group: string;
  interested_class: 'Playgroup' | 'Nursery' | 'LKG' | 'UKG';
  message?: string;
  status: AdmissionStatus;
  internal_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Program {
  id: string;
  slug: 'playgroup' | 'nursery' | 'lkg' | 'ukg';
  name: string;
  age_group: string;
  timing: string;
  badge_color: 'yellow' | 'orange' | 'blue' | 'green' | 'red';
  short_description: string;
  full_description: string;
  learning_objectives: string[];
  key_features: string[];
  display_order: number;
  is_active: boolean;
}

export interface GalleryCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  display_order: number;
  is_active: boolean;
}

export interface GalleryItem {
  id: string;
  category_slug: string;
  title: string;
  caption?: string;
  alt_text: string;
  image_url: string;
  thumbnail_url?: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  slug: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  short_description: string;
  full_details?: string;
  banner_url?: string;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
}

export type AnnouncementPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Announcement {
  id: string;
  title: string;
  category: string;
  content: string;
  priority: AnnouncementPriority;
  is_pinned: boolean;
  is_published: boolean;
  published_date: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  parent_name: string;
  child_info: string;
  rating: number;
  content: string;
  is_approved: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  is_published: boolean;
}

export interface PageContent {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  body_text?: string;
  metadata?: Record<string, any>;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'administrator' | 'staff';
}
