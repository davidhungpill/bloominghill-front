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

| Path | View | Original HTML |
|---|---|---|
| `/` | HomeView | main.html |
| `/intro` | IntroView | intro.html |
| `/missions` | MissionsView | missions.html |
| `/organization` | OrganizationView | organization.html |
| `/facility` | FacilityView | facility.html |
| `/history` | HistoryView | history.html |
| `/location` | LocationView | location.html |

### Component Tree

```
App.vue
├── TopBanner.vue          — top green donation bar (shared)
├── TheHeader.vue          — sticky GNB; "소개" hover → dropdown with 6 sub-routes
├── <router-view>          — page content swaps here
│   ├── HomeView.vue       — hero, stats, projects, stories, news, CTA
│   └── [other views]      — each includes SubPageHero + BreadCrumb + page content
├── TheFooter.vue          — shared footer
└── DonationFab.vue        — fixed bottom-right FAB
```

Shared sub-page components (`SubPageHero`, `BreadCrumb`) are imported directly in each View that needs them — there is no layout nesting via Vue Router.

### Styling

- **Tailwind CSS 3** configured in `tailwind.config.js` (Material Design 3 color system, custom spacing/font tokens)
- Global utility classes (`glass-card`, `soft-shadow`, `hover-lift`, `vision-card-accent`, `timeline-container`, `org-line-v/h`) live in `src/assets/style.css`
- Google Fonts (Plus Jakarta Sans, Be Vietnam Pro) and Material Symbols loaded via `<link>` in `index.html`
- All Tailwind color tokens match the original inline HTML config exactly

### Images

Local images (`orchestra.jpg`, `spring.jpg`, `blooming.jpg`) are served from `public/static/` and referenced as `/static/filename.jpg`. External (Google CDN) images are still used for card/article photos that don't have local copies.

### Nav Dropdown

`TheHeader.vue` uses `@mouseenter`/`@mouseleave` on the header element to toggle `dropdownOpen`. The dropdown panel uses a Vue `<Transition name="dropdown">` for a slide-fade animation. The "소개" button shows active state when `$route.path` is any of the 6 sub-routes.
