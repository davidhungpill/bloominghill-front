# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vue 3 SPA** for 사단법인 꽃재 (Blooming Hill), a Korean nonprofit social welfare foundation.
The original static HTML files in `htmls/` are kept as reference; the live site is the Vue app in `src/`.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Architecture

### Routing (`src/router/index.js`)

| Path | View | GNB Category |
|---|---|---|
| `/` | HomeView | — |
| `/intro` | IntroView | 소개 |
| `/missions` | MissionsView | 소개 |
| `/organization` | OrganizationView | 소개 |
| `/facility` | FacilityView | 소개 |
| `/history` | HistoryView | 소개 |
| `/location` | LocationView | 소개 |
| `/orchestra` | OrchestraView | 사업 |
| `/nanum` | NanumView | 사업 |
| `/scholarship` | ScholarshipView | 사업 |
| `/story` | NanumStoryView | 꽃재 이야기 |
| `/story/:id` | NanumStoryDetailView | 꽃재 이야기 |
| `/press` | PressBoardView | 꽃재 이야기 |
| `/press/:id` | PressDetailView | 꽃재 이야기 |
| `/education` | EducationView | 꽃재 이야기 |
| `/education/:id` | EducationDetailView | 꽃재 이야기 |
| `/notice` | NoticeBoardView | 소식 |
| `/notice/:id` | NoticeDetailView | 소식 |
| `/faq` | FaqView | 소식 |
| `/donate` | DonateView | — |
| `/donate-cert` | DonateCertView | — |

### Component Tree

```
App.vue
├── TopBanner.vue          — top green donation bar; "지금 후원하기" → /donate
├── TheHeader.vue          — sticky GNB with hover dropdowns + hamburger full menu
├── <router-view>          — page content swaps here
│   ├── HomeView.vue       — hero, stats, projects, stories, news, CTA
│   └── [other views]      — each imports BreadCrumb; sub-pages also import SubPageHero
├── TheFooter.vue          — shared footer
└── DonationFab.vue        — fixed bottom-right FAB; router-link to /donate
```

Shared sub-page components (`SubPageHero`, `BreadCrumb`) are imported directly in each View that needs them — there is no layout nesting via Vue Router.

### Data Files

- `src/data/stories.js` — 9 dummy story objects + `getStoryById(id)` + `getAdjacentStories(id)` helpers; used by NanumStoryView and NanumStoryDetailView
- `src/data/programs.js` — 5 dummy program objects + `getProgramById(id)` helper; used by EducationView and EducationDetailView

These files contain static dummy data intended to be replaced with API calls when a backend is connected.

### API Layer (`src/api/`)

All API modules use `strapiGet` from `src/api/client.js` and follow a **fallback-first pattern**: every function wraps its Strapi call in try/catch and returns static fallback data on failure, so the app works without a running backend.

| 파일 | 주요 함수 |
|---|---|
| `client.js` | `strapiGet(path)` — native fetch wrapper |
| `siteConfig.js` | `fetchSiteConfig()` (module-level cache) + `getHeroUrl(config, field)` |
| `heroSlides.js` | `fetchHeroSlides()` |
| `stories.js` | `fetchStories()`, `fetchStoryById(id)`, `fetchAdjacentStories(id)` |
| `programs.js` | `fetchPrograms()`, `fetchProgramById(id)` |
| `notices.js` | `fetchNotices()`, `fetchNoticeById(id)`, `fetchAdjacentNotices(id)` |
| `press.js` | `fetchPressArticles()`, `fetchPressArticleById(id)`, `fetchAdjacentPressArticles(id)` |
| `faq.js` | `fetchFaqs()` |

### Composables (`src/composables/`)

- `useHero(field)` — returns `{ heroSrc }` ref populated async from `fetchSiteConfig()`. Used in every sub-page view.

### Styling

- **Tailwind CSS 3** configured in `tailwind.config.js` (Material Design 3 color system, custom spacing/font tokens)
- Global utility classes (`glass-card`, `soft-shadow`, `hover-lift`, `vision-card-accent`, `timeline-container`, `org-line-v/h`) live in `src/assets/style.css`
- Google Fonts (Plus Jakarta Sans, Be Vietnam Pro) and Material Symbols loaded via `<link>` in `index.html`
- All Tailwind color tokens match the original inline HTML config exactly
- Most sub-page hero sections use `h-[240px] md:h-[320px]`; exceptions: `NoticeDetailView` uses `h-[300px]`, `PressDetailView` uses `h-[400px]` (matching their source HTML files)

### Images

Local images served from `public/static/` and referenced as `/static/filename.jpg`. External (Google CDN) images are still used for card/article photos that don't have local copies.

### TheHeader.vue — GNB Behavior

**Hover dropdowns (desktop):** `activeMenu` ref (`null | 'intro' | 'business' | 'story' | 'news'`) is set on `@mouseenter` of each GNB button and cleared with a 150 ms debounce timer on `@mouseleave`. The dropdown panel renders below the header with a `<Transition name="dropdown">` slide-fade. Column alignment uses an **invisible span technique**: each slot `<div>` contains a `<span class="invisible">` matching the nav button text (same font/size) to establish flex width, with the actual `<ul>` positioned `absolute top-0 left-0` on top of it. The 꽃재 이야기 column applies `ml-4` / `left-4` to nudge it right under its GNB button.

**Hamburger full menu (mobile):** `mobileMenuOpen` ref (boolean). Clicking the hamburger icon toggles the full-menu panel that slides down below the header using the same invisible-span column layout. A `<Teleport to="body">` backdrop (`z-40`, `bg-black/20`) closes the menu on outside click. A `watch(() => route.path, ...)` closes the menu on navigation.

**Active states:** `isStoryActive` covers `/story`, `/story/:id`, `/press`, `/press/:id`, `/education`. `isNewsActive` covers `/notice`, `/notice/:id`, `/faq`.
