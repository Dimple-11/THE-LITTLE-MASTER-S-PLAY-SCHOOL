-- ============================================================
-- THE LITTLE MASTER'S PLAY WAY SCHOOL
-- SEED DATA (INITIAL DRAFT CONTENT & PLACEHOLDERS)
-- ============================================================

-- 1. Initial School Settings
INSERT INTO public.school_settings (
    school_name,
    tagline,
    phone,
    whatsapp,
    email,
    address,
    timings,
    google_maps_url,
    is_admission_open
) VALUES (
    'The Little Master''s Play Way School',
    'Little Steps, Big Dreams!',
    '+91 98765 43210',
    '+91 98765 43210',
    'admissions@thelittlemasters.edu.in',
    'Near Children''s Park, Sector 4, Playway Enclave',
    'Monday - Friday: 9:00 AM - 12:30 PM (Playgroup & Nursery) | 9:00 AM - 1:30 PM (LKG & UKG)',
    'https://maps.google.com',
    true
) ON CONFLICT DO NOTHING;

-- 2. Programs (Playgroup, Nursery, LKG, UKG)
INSERT INTO public.programs (slug, name, age_group, timing, badge_color, short_description, full_description, learning_objectives, key_features, display_order)
VALUES
(
    'playgroup',
    'Playgroup',
    '1.5 to 2.5 Years',
    '9:30 AM - 12:00 PM',
    'yellow',
    'A gentle and joyful first step away from home focused on sensory play, curiosity, and social warmth.',
    'Our Playgroup program introduces children to a loving, secure, and cheerful world of discovery. Through soft music, tactile textures, storytelling, and free play, toddlers build emotional security and communication.',
    ARRAY['Sensory exploration and fine motor control', 'Early language stimulation and vocabulary through rhymes', 'Social comfort, sharing, and peer interaction', 'Gentle transition and routine building'],
    ARRAY['Low child-to-teacher ratio', 'Sensory play stations & safe soft corners', 'Music & movement sessions daily'],
    1
),
(
    'nursery',
    'Nursery',
    '2.5 to 3.5 Years',
    '9:00 AM - 12:30 PM',
    'orange',
    'Sparking curiosity, foundational phonics, color wonder, and expressive creativity in a joyful atmosphere.',
    'In Nursery, children expand their horizons through structured play, phonetic songs, creative art, and theme-based activities that celebrate their natural wonder.',
    ARRAY['Pre-reading readiness and phonemic awareness', 'Number sense, counting, and pattern recognition', 'Creative self-expression with colors, shapes, and clay', 'Confidence in expressing thoughts and feelings'],
    ARRAY['Storytelling theatre & puppet circle', 'Colour & shape learning lab', 'Gross motor obstacle fun and outdoor games'],
    2
),
(
    'lkg',
    'Junior KG (LKG)',
    '3.5 to 4.5 Years',
    '9:00 AM - 1:15 PM',
    'blue',
    'Structured early literacy, numeracy, logical thinking, and collaborative team play.',
    'LKG bridges instinctive curiosity with systematic concepts. Children begin reading two-letter blends, understanding quantities, exploring basic science phenomena, and expressing thoughts articulately.',
    ARRAY['Letter-sound blending and early sight words', 'Quantitative math: counting up to 50, addition concepts', 'Scientific curiosity: weather, animals, plants, and community helpers', 'Collaborative teamwork and problem solving'],
    ARRAY['Interactive literacy corner', 'Hands-on math manipulative games', 'Speech, rhythm, and confidence builders'],
    3
),
(
    'ukg',
    'Senior KG (UKG)',
    '4.5 to 5.5 Years',
    '9:00 AM - 1:30 PM',
    'green',
    'Comprehensive readiness for primary school with strong reading, creative writing, arithmetic, and leadership.',
    'UKG equips young scholars with the confidence, critical thinking, language richness, and joyful discipline needed to excel in formal primary education.',
    ARRAY['Fluent sentence reading, comprehension, and expressive writing', 'Math operations: addition, subtraction, time, and money awareness', 'General awareness: environment, geography concepts, and logical reasoning', 'Leadership, independence, self-management, and project work'],
    ARRAY['Primary school readiness curriculum', 'Show-and-tell public speaking practice', 'STEM exploration & creative problem-solving'],
    4
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    age_group = EXCLUDED.age_group,
    short_description = EXCLUDED.short_description;

-- 3. Gallery Categories
INSERT INTO public.gallery_categories (slug, name, description, display_order)
VALUES
('classrooms', 'Classrooms & Spaces', 'Our cheerful, child-centric learning spaces', 1),
('activities', 'Creative Activities', 'Art, crafts, science wonders, and sensory fun', 2),
('celebrations', 'Celebrations & Festivals', 'Joyful festivals, colors, and cultural celebrations', 3),
('sports', 'Sports & Play', 'Physical fitness, balancing, swings, and outdoor joy', 4),
('school-moments', 'School Moments', 'Daily smiles, wonder, and shared friendships', 5)
ON CONFLICT (slug) DO NOTHING;

-- 4. Initial FAQs
INSERT INTO public.faqs (category, question, answer, display_order)
VALUES
('Admissions', 'What is the right age for admission to Playgroup and Nursery?', 'Children aged 1.5 to 2.5 years are eligible for Playgroup, and 2.5 to 3.5 years for Nursery as of the start of the academic session.', 1),
('Admissions', 'How can parents apply for admission?', 'You can fill out our online Admission Enquiry form on this website or visit our school campus during working hours to meet our admissions coordinator.', 2),
('Academics', 'What teaching methodology does the school follow?', 'We follow an activity-based Play-Way methodology that integrates sensory exploration, Montessori-inspired manipulatives, and theme-based learning.', 3),
('Safety', 'How do you ensure student safety and well-being?', 'Our campus features child-safe rounded furniture, secure gated access, hygienic washrooms sized for little ones, and trained caring female support staff.', 4),
('Daily Life', 'What are the school operating hours?', 'Playgroup & Nursery operate from 9:00 AM to 12:30 PM. LKG & UKG operate from 9:00 AM to 1:30 PM, Monday through Friday.', 5)
ON CONFLICT DO NOTHING;

-- 5. Dynamic Page Content Blocks
INSERT INTO public.page_content (section_key, title, subtitle, body_text)
VALUES
('home_hero', 'Little Steps, Big Dreams!', 'Every little mind has a big world waiting to be discovered.', 'Welcome to The Little Master''s Play Way School, where every day is an adventure filled with laughter, curiosity, colors, and the magic of early learning.'),
('home_welcome', 'Welcome to The Little Master''s Play Way School', 'A warm, nurturing second home for your child', 'At The Little Master''s Play Way School, we believe childhood is a sacred season of wonder. Our play-centric curriculum inspires children to ask questions, explore colors, embrace friendships, and build a lifelong love for learning in a safe, affectionate, and stimulating environment.'),
('principals_message', 'Message from the Principal', 'Nurturing little minds with love, care, and curiosity', 'Welcome to our vibrant learning family. Every child who walks through our doors brings a unique spark of creativity and wonder. Our dedicated educators nurture this spark through warm encouragement, joyful discovery, and play-based learning.')
ON CONFLICT (section_key) DO NOTHING;
