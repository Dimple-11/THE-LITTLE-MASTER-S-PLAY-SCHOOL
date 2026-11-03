# THE LITTLE MASTER'S PLAY WAY SCHOOL
## Premium Interactive Preschool Website & Administration Dashboard

> **"Little Steps, Big Dreams!"**  
> A customized, production-ready digital identity and web application designed as a gift for the school's owner.

---

## 🌟 Executive Summary & Brand Identity

The digital identity for **The Little Master's Play Way School** is handcrafted around its official branding assets:

1. **Official School Logo (`assets/logo.png`)**:
   - Red arched typography for *"The Little Master's"* with bright yellow highlights and white stroke.
   - Royal blue playful lettering for *"Play Way School"*.
   - The cheerful illustrated child with open arms in a red sweater featuring a white star and swirl crest.
   - Chalkboard green circular board (`3+2=5`, `3-2=1`).
   - 3D alphabet blocks (Red A, Blue B, Green C), musical notes, golden stars, and an open blue storybook.
2. **School Uniform Reference (`assets/Dress.png`)**:
   - Bright sunshine yellow upper polo shirt with contrast tangerine collar and sleeve trims.
   - Deep tangerine orange dungaree / pinafore shorts dress.

### Official Digital Colour Palette
| Token Name | Hex Code | Purpose & Ratio |
| :--- | :--- | :--- |
| **Warm Cream** | `#FFF9E9` | 50% Primary background surface |
| **Sunshine Yellow** | `#FFD929` | 25% Brand joy, buttons, star highlights |
| **Tangerine Orange** | `#FF941E` | 15% Uniform collar tone, badges, focus rings |
| **Deep Orange** | `#E87528` | Uniform dress tone, primary CTA gradients |
| **Logo Red** | `#F21D1D` | Logo lettering, high-priority alert badges |
| **Royal Blue** | `#1749D6` | Logo lettering, literacy badges, water accents |
| **Chalkboard Green** | `#07852C` | Logo blackboard tone, nature & success accents |
| **Dark Brown** | `#49301F` | High-contrast readable typography |
| **Soft Peach** | `#FFE3CA` | Card backgrounds & subtle divider accents |

---

## 🎨 Asset Ethics & Anti-Fabrication Guarantee

- **Zero Fake Photos**: No stock photos of unknown children or classrooms are used.
- **Pure SVG & CSS Vector Artwork**: Before real verified photos are uploaded, the website showcases rich, handcrafted vector illustrations (playground, storybooks, pencils, crayons, alphabet blocks, activity icons).
- **Graceful Empty State**: The photo gallery features an empty-state illustration explaining that real campus moments are being curated, with immediate photo upload capability for the administrator.
- **Original Logo Protection**: The official school logo is preserved unaltered in `assets/logo.png` and served safely via `public/logo.png`.

---

## 🚀 Complete Feature Overview

### 1. Public School Website
- **Sticky Navigation**: Animated dropdown menus, mobile slide-out drawer, admissions alert banner, and one-click "Enquire Now" modal.
- **12 Homepage Sections**:
  1. *Hero*: Bold typography, "Little Steps, Big Dreams!", floating educational doodles, and `HeroPlaygroundIllustration`.
  2. *Welcome Section*: Warm greeting, official emblem display, philosophy highlights.
  3. *Why Choose Us*: 6 core educational pillars (Learning Through Play, Creative Development, Caring Environment, Confidence Building, Social Development, Activity-Based Learning).
  4. *Our Programs*: Interactive cards for Playgroup, Nursery, Junior KG (LKG), and Senior KG (UKG) with age eligibility, timings, and custom vector mascots.
  5. *Learning Through Activities*: Art & Craft, Storytelling, Music & Dance, Sports & Play, Celebrations, and Creative STEM.
  6. *School Environment*: Illustrated cards highlighting child-proportioned washrooms, sensory studio, soft lawn, and reading treehouse.
  7. *Photo Gallery*: Category filters, lightbox preview, and polite empty state.
  8. *Events & Celebrations*: Upcoming milestones and festival announcements.
  9. *Parent Testimonials*: Verified parent reviews with approval-gate.
  10. *Little Learners' Corner*: 5 interactive mini-games for toddlers!
  11. *Admission CTA*: "Every Big Journey Begins With A Little Step!" with phone CTA and online form.
  12. *Contact & Campus Map*: Timings, WhatsApp link, direct call, and Google Maps integration.
- **19 Dedicated Pages**:
  - `Home` (`/`)
  - `About Us` (`/about`, `/about/story`, `/about/philosophy`, `/about/principal`, `/about/facilities`)
  - `Academics` (`/academics`, `/academics/playgroup`, `/academics/nursery`, `/academics/lkg`, `/academics/ukg`, `/academics/approach`)
  - `Life at School` (`/activities`, `/gallery`, `/celebrations`, `/events`)
  - `Admissions` (`/admissions`, `/admissions/process`, `/admissions/eligibility`, `/admissions/documents`, `/admissions/faqs`)
  - `Contact Us` (`/contact`)
  - `Privacy Policy` (`/privacy-policy`)

### 2. Interactive Little Learners' Corner (Mini-Games)
Built right into the website with zero login requirement and child-friendly confetti rewards:
1. **Color Explorer**: Tap and identify Sunshine Yellow, Apple Red, Royal Blue, and Chalkboard Green.
2. **Shape Matching**: Match Circle, Shining Star, Triangle, Heart, and Square.
3. **Alphabet Recognition**: Match initial sounds and letters (A for Apple, B for Butterfly, C for Crayon, S for Sun).
4. **Counting Fun**: Count the cute ducklings, stars, balloons, and flowers (1 to 5).
5. **Number Match**: Count quantity dots and match to numbers.

### 3. Admission Enquiry System
- **Validation**: Strict schema validation using Zod and React Hook Form.
- **Reference Code Generation**: Automatically generates reference IDs (e.g. `LMPW-2026-8492`).
- **Celebration Effect**: Interactive confetti celebration on submission.
- **Instant Admin Visibility**: Enquiries immediately appear in the admin admissions module.

### 4. Protected Administration Dashboard (`/admin`)
Built specifically for non-technical school administrators with warm, plain-English controls:
- **Module 1: Dashboard Overview**: Live counters for total enquiries, new enquiries, photos, events, and notices.
- **Module 2: Admissions Manager**: Search by parent name/phone/ref ID, filter by class and status (`new`, `contacted`, `scheduled_visit`, `enrolled`, `archived`), internal notes recording, and deletion.
- **Module 3: Gallery Manager**: Upload photographs (PNG/JPG/WebP) with automatic conversion to base64 or Supabase Storage, captioning, categories, publish/unpublish toggle, and deletion.
- **Module 4: Events Manager**: Schedule dates, times, descriptions, and publish/unpublish functions.
- **Module 5: Announcements Manager**: Publish priority circulars with pinned homepage banner support.
- **Module 6: Programs Manager**: Edit Playgroup, Nursery, LKG, and UKG descriptions, age eligibility, and objectives without writing any code.
- **Module 7: Testimonials Manager**: Review and approve genuine parent feedback.
- **Module 8: FAQs Manager**: Add and update answers to parents' questions.
- **Module 9: School Settings**: Update phone, WhatsApp, email, campus address, timings, and toggle admissions OPEN/CLOSED.
- **Module 10: Website Content CMS**: Edit homepage banner headlines and principal's message.
- **Module 11: Public Website Preview**: One-click preview button to see live changes.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite 6 |
| **Styling & Design** | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| **Animations** | Motion for React (`framer-motion`), Canvas-Confetti |
| **Routing** | React Router DOM 6 (with SPA `_redirects` support) |
| **Form Management** | React Hook Form, Zod schema validation |
| **Icons** | Lucide React |
| **Backend & Database** | PostgreSQL via Supabase + Robust Offline/Local Store |
| **Deployment Target** | Cloudflare Pages, GitHub Actions, Vercel |

---

## 💾 Dual Database Operation Mode

The application is built with an **intelligent dual-mode data layer**:
1. **Live Supabase Mode**: When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided in `.env`, the system communicates directly with Supabase PostgreSQL tables and Row Level Security.
2. **Local Demo / Offline Store**: If Supabase credentials have not yet been created, the entire application gracefully operates on reactive `localStorage` pre-seeded with factory defaults. **All admin edits, photo uploads, notices, and admission enquiries work immediately in real-time.**

---

## ⚙️ Setup & Local Development Instructions

### Prerequisites
- Node.js (v18 or higher; tested on Node v26)
- pnpm or npm

### 1. Install Dependencies
```bash
cd The_Little_Master
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Leave values blank to run in offline/local demo mode, or add your Supabase project keys to link the live database).*

### 3. Run Development Server
```bash
pnpm run dev
```
Open `http://localhost:3000` in your web browser.

### 4. Build for Production
```bash
pnpm run build
```
The optimized, minified production assets will be generated in `dist/`.

---

## 🗄️ Supabase Database Setup

When you are ready to connect a live Supabase project:
1. Create a free project at [https://supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` and run it to create tables, indexes, and Row Level Security (RLS) policies.
4. (Optional) Run `supabase/seed.sql` to populate sample programs and initial settings.
5. In your Supabase dashboard under **Settings > API**, copy the **Project URL** and **Anon / Public Key**.
6. Paste them into your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
7. Restart the dev server or re-deploy to Cloudflare Pages.

---

## 🔐 Administration Portal Access

- **URL**: `http://localhost:3000/admin`
- **Default Evaluation Email**: `admin@thelittlemasters.edu.in`
- **Default Evaluation Password**: `playway123`
*(A 1-click "Auto-fill Default Demo Credentials" button is provided on the login page for effortless evaluation).*

---

## ☁️ Deployment Guide (Cloudflare Pages)

The project includes built-in SPA routing (`public/_redirects`), `public/robots.txt`, and `public/sitemap.xml`.

### Steps to Deploy to Cloudflare Pages:
1. Push your repository to **GitHub**.
2. Log into the **Cloudflare Dashboard** and navigate to **Workers & Pages > Create application > Pages > Connect to Git**.
3. Select your repository.
4. Configure Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `pnpm run build` (or `npm run build`)
   - **Build output directory**: `dist`
5. Under **Environment variables**, optionally add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Save and Deploy**. Cloudflare Pages will build and deploy your site on its global edge network.

---

## ❤️ Dedicated to The Little Master's Play Way School
*"Little Steps, Big Dreams!"*
