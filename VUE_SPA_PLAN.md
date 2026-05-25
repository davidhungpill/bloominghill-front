# Vue SPA 변환 구현 계획 — 사단법인 꽃재

## 목표
기존 `htmls/` 정적 HTML 7개를 Vue 3 + Vite + Vue Router SPA로 변환한다.
기존 HTML 파일은 `htmls/` 폴더에 그대로 유지(참고용).

---

## 프로젝트 구조 (최종 목표)

```
blooming-new/              ← 기존 루트
├── htmls/                 ← 원본 HTML (참고용 유지)
├── public/
│   └── static/            ← 이미지 파일 복사 (orchestra.jpg, spring.jpg, blooming.jpg)
├── src/
│   ├── assets/
│   │   └── style.css      ← 전역 CSS (glass-card, soft-shadow, hover-lift, material-symbols)
│   ├── components/
│   │   ├── TopBanner.vue        ← 상단 초록 후원 배너
│   │   ├── TheHeader.vue        ← GNB (소개 hover → 드롭다운 아코디언)
│   │   ├── TheFooter.vue        ← 공통 footer
│   │   ├── DonationFab.vue      ← 우하단 후원 FAB
│   │   ├── SubPageHero.vue      ← 내부 페이지 hero (spring.jpg)
│   │   └── BreadCrumb.vue       ← breadcrumb (소개 > 페이지명)
│   ├── views/
│   │   ├── HomeView.vue         ← main.html
│   │   ├── IntroView.vue        ← intro.html (이사장 인사말)
│   │   ├── MissionsView.vue     ← missions.html (미션 및 비전)
│   │   ├── OrganizationView.vue ← organization.html (조직도)
│   │   ├── FacilityView.vue     ← facility.html (산하시설)
│   │   ├── HistoryView.vue      ← history.html (연혁)
│   │   └── LocationView.vue     ← location.html (오시는 길)
│   ├── router/
│   │   └── index.js             ← Vue Router 설정
│   ├── App.vue
│   └── main.js
├── tailwind.config.js     ← 공통 Tailwind 설정 (HTML 인라인 설정에서 추출)
├── postcss.config.js
├── vite.config.js
├── index.html
└── package.json
```

---

## 라우팅 맵

| 경로 | 컴포넌트 | 원본 파일 |
|---|---|---|
| `/` | HomeView | main.html |
| `/intro` | IntroView | intro.html |
| `/missions` | MissionsView | missions.html |
| `/organization` | OrganizationView | organization.html |
| `/facility` | FacilityView | facility.html |
| `/history` | HistoryView | history.html |
| `/location` | LocationView | location.html |

---

## 네비게이션 드롭다운 동작

- GNB 메뉴: `소개 | 사업 | 꽃재 이야기 | 소식`
- `소개`에 마우스오버 → 헤더 아래 드롭다운 패널 슬라이드다운
- 드롭다운 내 6개 항목 (아코디언 스타일 리스트):
  1. 이사장 인사말 → `/intro`
  2. 미션 및 비전 → `/missions`
  3. 조직도 → `/organization`
  4. 산하시설 → `/facility`
  5. 연혁 → `/history`
  6. 오시는 길 → `/location`
- 드롭다운 영역에서 마우스 이탈 시 닫힘
- 현재 라우트가 소개 하위 페이지이면 `소개` 항목 active 강조

---

## 의존성

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## Tailwind 설정

기존 HTML 각 파일의 `tailwind.config` 인라인 스크립트를 `tailwind.config.js`로 통합.
전체 color 토큰, borderRadius, spacing, fontFamily, fontSize를 단일 파일로 관리.

---

## 구현 단계

### Step 1 — 프로젝트 파일 생성
- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html` 작성
- `public/static/`에 이미지 복사

### Step 2 — 전역 스타일 (`src/assets/style.css`)
- `glass-card`, `soft-shadow`, `hover-lift`, `material-symbols-outlined` 공통 스타일

### Step 3 — 공통 컴포넌트
- TopBanner, TheHeader (드롭다운), TheFooter, DonationFab, SubPageHero, BreadCrumb

### Step 4 — 라우터 (`src/router/index.js`)

### Step 5 — 뷰 컴포넌트 (7개)
각 HTML의 `<main>` 콘텐츠를 Vue 컴포넌트로 변환.
공통 상단/하단 구조는 공통 컴포넌트로 대체.

### Step 6 — App.vue
TopBanner + TheHeader + `<router-view>` + TheFooter + DonationFab 조합.

### Step 7 — 빌드 확인
`npm install && npm run dev`로 동작 검증.
