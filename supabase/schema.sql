-- ============================================================
-- THE LITTLE MASTER'S PLAY WAY SCHOOL
-- DATABASE SCHEMA & ROW LEVEL SECURITY (SUPABASE POSTGRESQL)
-- ============================================================

-- Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. ADMINS TABLE (For linking auth.users to admin roles)
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'administrator',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. SCHOOL SETTINGS
CREATE TABLE IF NOT EXISTS public.school_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_name TEXT NOT NULL DEFAULT 'The Little Master''s Play Way School',
    tagline TEXT NOT NULL DEFAULT 'Little Steps, Big Dreams!',
    phone TEXT NOT NULL DEFAULT '+91 98765 43210',
    whatsapp TEXT NOT NULL DEFAULT '+91 98765 43210',
    email TEXT NOT NULL DEFAULT 'contact@thelittlemasters.edu.in',
    address TEXT NOT NULL DEFAULT 'Near Community Park, Playway Lane, Green Valley',
    timings TEXT NOT NULL DEFAULT 'Monday - Friday: 9:00 AM - 1:00 PM',
    google_maps_url TEXT DEFAULT '',
    facebook_url TEXT DEFAULT '',
    instagram_url TEXT DEFAULT '',
    youtube_url TEXT DEFAULT '',
    is_admission_open BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. ADMISSION ENQUIRIES
CREATE TABLE IF NOT EXISTS public.admission_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    child_name TEXT,
    child_age_group TEXT NOT NULL,
    interested_class TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled_visit', 'enrolled', 'archived')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_status ON public.admission_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_created_at ON public.admission_enquiries(created_at DESC);

-- 4. PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    age_group TEXT NOT NULL,
    timing TEXT NOT NULL,
    badge_color TEXT NOT NULL DEFAULT 'orange',
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    learning_objectives TEXT[] NOT NULL DEFAULT '{}',
    key_features TEXT[] NOT NULL DEFAULT '{}',
    display_order INT NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. GALLERY CATEGORIES
CREATE TABLE IF NOT EXISTS public.gallery_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    display_order INT NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. GALLERY ITEMS
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.gallery_categories(id) ON DELETE SET NULL,
    category_slug TEXT NOT NULL DEFAULT 'school-moments',
    title TEXT NOT NULL,
    caption TEXT,
    alt_text TEXT NOT NULL,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_gallery_published ON public.gallery(is_published, display_order);

-- 7. EVENTS & CELEBRATIONS
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    event_date DATE NOT NULL,
    start_time TEXT,
    end_time TEXT,
    location TEXT DEFAULT 'School Campus',
    short_description TEXT NOT NULL,
    full_details TEXT,
    banner_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date DESC);

-- 8. ANNOUNCEMENTS / NOTICES
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General Notice',
    content TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_pinned BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. PARENT TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name TEXT NOT NULL,
    child_info TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    content TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL DEFAULT 'Admissions',
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. DOCUMENTS / FORMS
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'pdf',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. PAGE CONTENT (Dynamic CMS content for customizable sections)
CREATE TABLE IF NOT EXISTS public.page_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    body_text TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ PERMISSIONS (Anonymous visitors can read published items)
CREATE POLICY "Public can view school settings" ON public.school_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active programs" ON public.programs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view gallery categories" ON public.gallery_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published gallery items" ON public.gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published events" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published announcements" ON public.announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true AND is_approved = true);
CREATE POLICY "Public can view published FAQs" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view active documents" ON public.documents FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view page content" ON public.page_content FOR SELECT USING (true);

-- PUBLIC WRITE PERMISSION (Anonymous visitors can submit admission enquiries)
CREATE POLICY "Public can insert admission enquiries" ON public.admission_enquiries FOR INSERT WITH CHECK (true);

-- AUTHENTICATED ADMIN FULL ACCESS
CREATE POLICY "Admins full access to admins table" ON public.admins FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to school settings" ON public.school_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to admission enquiries" ON public.admission_enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to programs" ON public.programs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to gallery categories" ON public.gallery_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to announcements" ON public.announcements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to FAQs" ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to documents" ON public.documents FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins full access to page content" ON public.page_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
