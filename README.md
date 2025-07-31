# 🎧 Spotify Clone

A full-featured Spotify-inspired music streaming platform built with **Next.js 14** (App Router) and powered by **Supabase** for authentication and backend.

[![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=nextdotjs)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![MIT License](https://img.shields.io/github/license/giogocadze/spotify-clone)](LICENSE)

![Screenshot](./public/screenshot.png) <!-- Replace this with an actual screenshot -->

---

## 🚀 Featured

- 🎶 Fully functional **audio player** – play, pause, seek, shuffle, repeat
- 📁 **Playlist & Library** management – user-based playlists
- 🔐 **Authentication** – email & OAuth via **Supabase**
- 📤 **Music upload & streaming** – via Supabase Storage
- 🎨 **Dark-themed, responsive UI**
- ☁️ **Deployed on Vercel**

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **React 18**
- **TypeScript**
- **SCSS** or **TailwindCSS**
- **Howler.js** – audio control
- **Framer Motion** – transitions & animations

### Backend
- **Supabase**
  - Supabase Auth
  - Supabase Database (PostgreSQL)
  - Supabase Storage
  - RLS (Row-Level Security)

---

## 📸 Screenshots

_Add 2–3 screenshots or a short demo gif to show off the UI and features._

---

## ⚙️ Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/giogocadze/spotify-clone.git
cd spotify-clone
```
2. **Install Dependencies**

Using npm:

```bash
npm install
```
3. **Configure Environment Variables**
```bash
touch .env.local
```
Then open .env.local and add your Supabase project credentials:
NEXT_PUBLIC_SUPABASE_URL=https://gyxawqwwgtclzmiyznxx.supabase.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eGF3cXd3Z3RjbHptaXl6bnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MTAzMzAsImV4cCI6MjA2MjQ4NjMzMH0.W0q-B-c-LaCPx49BsC99NbABWid0u2EGKi7CQaBOdpE


4. **Run the development server:**
```bash
npm run dev
```
Then open http://localhost:3000 in your browser.
