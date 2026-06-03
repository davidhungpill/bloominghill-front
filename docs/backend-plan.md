# 꽃재 백엔드 구현 계획 — Strapi + Supabase

## 아키텍처 개요

```
[Vue 3 SPA]  →  REST API  →  [Strapi CMS]  →  [Supabase PostgreSQL]
                                    ↓
                             [Supabase Storage]  (이미지 파일)
```

| 역할 | 기술 | 용도 |
|---|---|---|
| CMS / API 서버 | Strapi v5 | 콘텐츠 관리 어드민, REST API 자동 생성 |
| 데이터베이스 | Supabase PostgreSQL | 영구 저장소 (Strapi가 직접 연결) |
| 파일 스토리지 | Supabase Storage | 이미지 업로드 및 서빙 |
| 프론트엔드 | Vue 3 (현재) | Strapi REST API 호출로 교체 |

---

## Phase 1 — Supabase 프로젝트 설정

### 1-1. 프로젝트 생성
1. [supabase.com](https://supabase.com) 로그인 → New Project
2. 프로젝트 이름: `kkotjae-prod`
3. 지역: `Northeast Asia (Seoul)` 선택
4. DB 비밀번호 저장 (나중에 사용)

### 1-2. PostgreSQL 연결 정보 확인
- Settings → Database → Connection string → **URI** 복사
- 형식: `postgresql://postgres.[ref]:[password]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres`
- `Transaction pooler` 모드 사용 권장 (포트 6543)

### 1-3. Storage 버킷 생성
Settings → Storage에서 다음 버킷 생성:

| 버킷 이름 | 공개 여부 | 용도 |
|---|---|---|
| `story-images` | Public | 나눔이야기 썸네일 + 본문 이미지 |
| `program-images` | Public | 평생교육원 썸네일 + 강좌 안내 이미지 |
| `hero-images` | Public | 각 페이지 Hero 배너 이미지 |
| `uploads` | Public | Strapi 기본 업로드 폴더 |

> 버킷을 Public으로 설정하면 별도 인증 없이 이미지 URL로 바로 접근 가능

---

## Phase 2 — Strapi 프로젝트 생성

### 2-1. Strapi 설치

```bash
# 꽃재 프로젝트 상위 폴더에서 실행
        npx create-strapi-app@latest kkotjae-cms --quickstart
# quickstart는 SQLite로 시작 — DB 설정은 아래에서 변경
```

### 2-2. Supabase PostgreSQL 연결

`kkotjae-cms/config/database.js` 수정:

```js
// config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 5 },
    acquireConnectionTimeout: 60000,
  },
});
```

`kkotjae-cms/.env`:
```
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres
```

`pg` 드라이버 설치:
```bash
cd kkotjae-cms
npm install pg
```

### 2-3. Supabase Storage Provider 설정 (이미지 업로드)

Supabase Storage는 S3 호환이므로 AWS S3 provider 사용:

```bash
npm install @strapi/provider-upload-aws-s3
```

`config/plugins.js`:
```js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('SUPABASE_STORAGE_KEY'),
        secretAccessKey: env('SUPABASE_STORAGE_SECRET'),
        endpoint: env('SUPABASE_STORAGE_ENDPOINT'), // https://[ref].supabase.co/storage/v1/s3
        params: { Bucket: env('SUPABASE_STORAGE_BUCKET', 'uploads') },
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
```

> Supabase Storage S3 키는 Dashboard → Storage → S3 Connection에서 발급

---

## Phase 3 — Content Types 스키마 정의

Strapi Admin(기본: `http://localhost:1337/admin`) → Content-Type Builder에서 생성.
아래는 각 Collection Type의 필드 정의.

---

### 3-1. Story (나눔이야기)

**Collection Type name:** `story`

| 필드명 | 타입 | 옵션 |
|---|---|---|
| `category` | Enumeration | 봉사활동, 지역사회, 문화행사, 나눔기록, 감사나눔, 문화예술, 활동기록 |
| `title` | Short text | Required |
| `desc` | Text | Required |
| `content` | Long text | Required |
| `quote` | Text | |
| `date` | Date | |
| `views` | Integer | Default: 0 |
| `thumbnail` | Media (single) | 목록 썸네일 이미지 |
| `images` | Media (multiple) | 본문 상세 이미지 |
| `tags` | JSON | 태그 배열 ex) `["#봉사활동","#나눔"]` |

---

### 3-2. Program (꽃재 평생교육원)

**Collection Type name:** `program`

| 필드명 | 타입 | 옵션 |
|---|---|---|
| `badge` | Short text | ex) 수강신청, 스포츠 |
| `category` | Enumeration | 교육소식, 건강강좌, 문화예술, 어린이강좌 |
| `title` | Short text | Required |
| `desc` | Text | 목록 설명 |
| `date` | Date | |
| `views` | Integer | Default: 0 |
| `thumbnail` | Media (single) | 목록 썸네일 |
| `contentImages` | Media (multiple) | 강좌 안내 이미지 (세로 스택) |

---

### 3-3. Notice (공지사항)

**Collection Type name:** `notice`

| 필드명 | 타입 | 옵션 |
|---|---|---|
| `title` | Short text | Required |
| `isPinned` | Boolean | Default: false (공지 고정 여부) |
| `date` | Date | |
| `views` | Integer | Default: 0 |
| `body` | Long text | 상세 본문 내용 (HTML 문자열, Vue에서 v-html 렌더링) |
| `attachments` | Media (multiple) | 첨부 파일 (PDF 등) |

---

### 3-4. PressArticle (언론 보도자료)

**Collection Type name:** `press-article`

| 필드명 | 타입 | 옵션 |
|---|---|---|
| `title` | Short text | Required |
| `type` | Enumeration | 보도, 뉴스, 언론 |
| `date` | Date | |
| `views` | Integer | Default: 0 |
| `featuredImage` | Media (single) | 대표 이미지 |
| `body` | Long text | 상세 본문 내용 (HTML 문자열, 원문 링크도 본문 내 포함) |
| `attachments` | Media (multiple) | 첨부 파일 (PDF 등) |

> `typeColor`는 DB에 저장하지 않고 Vue에서 type→color 매핑으로 처리 (`보도`→leaf-green, `뉴스`→sky-blue, `언론`→warm-accent)

---

### 3-5. Faq (자주 묻는 질문)

**Collection Type name:** `faq`

| 필드명 | 타입 | 옵션 |
|---|---|---|
| `question` | Short text | Required |
| `answer` | Long text | Required — HTML 문자열, Vue에서 v-html 렌더링 |
| `order` | Integer | 정렬 순서 (낮을수록 위) |

---

### 3-6. HeroSlide (홈 Hero 슬라이드)

**Collection Type name:** `hero-slide`

| 필드명 | 타입 | 옵션 |
|---|---|---|
| `image` | Media (single) | Required |
| `alt` | Short text | 이미지 설명 텍스트 |
| `order` | Integer | 표시 순서 (낮을수록 앞) |
| `isActive` | Boolean | Default: true — false면 노출 제외 |

어드민 사용법: 슬라이드 추가/삭제, `order` 변경으로 순서 조정, `isActive` 토글로 임시 비활성화 가능.

---

### 3-7. SiteConfig (사이트 설정 — Hero 이미지 + 통계 + 계좌)

**Single Type name:** `site-config` (전체 사이트에 단 하나의 레코드)

**Hero 이미지 필드** (각 페이지 배너):

| 필드명 | 타입 | 대상 페이지 |
|---|---|---|
| `heroStory` | Media (single) | 나눔이야기 + 나눔이야기 상세 |
| `heroPress` | Media (single) | 언론 보도자료 |
| `heroEducation` | Media (single) | 꽃재 평생교육원 + 강좌 상세 |
| `heroNotice` | Media (single) | 공지사항 |
| `heroFaq` | Media (single) | 자주 묻는 질문 |
| `heroDonate` | Media (single) | 후원하기 |
| `heroDonateCert` | Media (single) | 기부금 영수증 안내 |

**통계 수치 필드** (HomeView 숫자 섹션):

| 필드명 | 타입 | 예시 |
|---|---|---|
| `statVolunteers` | Integer | 1200 |
| `statBeneficiaries` | Integer | 3500 |
| `statProjects` | Integer | 48 |
| `statYears` | Integer | 10 |

**후원 계좌 필드** (DonateView):

| 필드명 | 타입 | 예시 |
|---|---|---|
| `bankName` | Short text | 신한은행 |
| `accountNumber` | Short text | 100-123-456789 |
| `accountHolder` | Short text | 사단법인 꽃재 |
| `phone` | Short text | 1577-9044 |

---

### 3-8. HistoryEvent (연혁)

**Collection Type name:** `history-event`

| 필드명 | 타입 | 옵션 |
|---|---|---|
| `year` | Integer | Required |
| `month` | Integer | 1~12 |
| `description` | Short text | Required |

---

### 이미지 관리 구조 전체 요약

| 이미지 종류 | 관리 위치 | 어드민 교체 방법 |
|---|---|---|
| 홈 Hero 슬라이드 (여러 장) | `hero-slide` Collection Type | 항목 추가/삭제, order 변경 |
| 각 페이지 Hero 배너 (1장) | `site-config` Single Type | 해당 필드 이미지 교체 |
| 나눔이야기 썸네일/본문 | `story` Collection Type | 각 스토리 항목에서 교체 |
| 평생교육원 썸네일/강좌 이미지 | `program` Collection Type | 각 프로그램 항목에서 교체 |

---

## Phase 4 — API 권한 설정

Strapi Admin → Settings → Users & Permissions Plugin → Roles → **Public**

각 Content Type에 대해 다음 권한만 허용:

| Content Type | 허용 액션 |
|---|---|
| Story | `find`, `findOne` |
| Program | `find`, `findOne` |
| Notice | `find`, `findOne` |
| PressArticle | `find`, `findOne` |
| Faq | `find` |
| HeroSlide | `find` |
| SiteConfig | `find` |
| HistoryEvent | `find` |

> `create`, `update`, `delete`는 Authenticated(어드민)만 허용. 어드민 계정으로만 CMS 수정.

---

## Phase 5 — Vue 프론트엔드 API 연동

### 5-1. API 클라이언트 설정

추가 패키지 설치 없이 native `fetch`를 사용. `.env.local` 파일만 추가:

```
VITE_STRAPI_URL=http://localhost:1337/api
```

`src/api/client.js` (생성 완료):
```js
const BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api'

export async function strapiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`Strapi ${path} → ${res.status}`)
  return res.json()
}
```

`src/api/heroSlides.js` (생성 완료):
- `fetchHeroSlides()` — `hero-slide` 컬렉션 fetch, 실패 시 로컬 이미지 fallback

`src/api/siteConfig.js` (생성 완료):
- `fetchSiteConfig()` — `site-config` single type fetch, 모듈 레벨 캐시로 중복 요청 방지
- `getHeroUrl(config, field)` — hero 이미지 URL 추출 + fallback 처리

`src/composables/useHero.js` (생성 완료):
- `useHero(field)` — `{ heroSrc }` ref 반환, 각 View에서 한 줄로 hero 이미지 바인딩
```js
// 사용법 (각 View에서)
const { heroSrc } = useHero('heroNotice')
// 템플릿에서: <img v-if="heroSrc" :src="heroSrc" />
```

### 5-2. API 모듈 — `src/api/`

모든 API 모듈은 `strapiGet` + fallback 패턴으로 구현 완료. 주요 함수 목록:

| 파일 | 함수 | 구현 상태 |
|---|---|---|
| `stories.js` | `fetchStories()`, `fetchStoryById(id)`, `fetchAdjacentStories(id)` | ✅ 완료 |
| `programs.js` | `fetchPrograms()`, `fetchProgramById(id)` | ✅ 완료 |
| `notices.js` | `fetchNotices()`, `fetchNoticeById(id)`, `fetchAdjacentNotices(id)` | ✅ 완료 |
| `press.js` | `fetchPressArticles()`, `fetchPressArticleById(id)`, `fetchAdjacentPressArticles(id)` | ✅ 완료 |
| `faq.js` | `fetchFaqs()` | ✅ 완료 |

**공통 패턴:**
- `strapiGet(path)` 호출 → 실패 시 `catch`에서 정적 FALLBACK 배열/객체 반환
- 날짜 포맷: `formatDate(d)` → ISO `2024-03-15` → Korean `2024.03.15`
- `notices.js` fallback에서 고정공지(isPinned) 항목도 id 부여 (100, 99) → 상세 페이지 라우팅 가능
- `press.js`에서 `typeColor`는 `TYPE_COLORS` 맵으로 `type` → CSS class 변환 (DB 불필요)
- `press.js`의 `fetchPressArticleById`에서 `featuredImage` populate, 첨부파일 `mime` → icon 자동 매핑

**`src/api/faq.js` 참고:** Strapi Rich text blocks로 저장 시 Vue에서는 `@tailwindcss/typography` 또는 blocks renderer 라이브러리 필요. 현재 fallback은 HTML 문자열로 `v-html` 렌더링.

### 5-3. View 업데이트 패턴

상세 페이지는 `ref(null)` + `onMounted` + `watch(route.params.id)` 패턴으로 비동기 로드:

```vue
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const item = ref(null)

async function load(id) {
  item.value = await fetchById(id)
}

onMounted(() => load(route.params.id))
watch(() => route.params.id, id => load(id))
</script>
```

**콘텐츠 데이터 연동 현황 (모두 완료):**

| Vue 파일 | API 함수 | 상태 |
|---|---|---|
| `NanumStoryView.vue` | `fetchStories()` | ✅ 완료 |
| `NanumStoryDetailView.vue` | `fetchStoryById(id)`, `fetchAdjacentStories(id)` | ✅ 완료 |
| `EducationView.vue` | `fetchPrograms()` | ✅ 완료 |
| `EducationDetailView.vue` | `fetchProgramById(id)` | ✅ 완료 |
| `NoticeBoardView.vue` | `fetchNotices()` | ✅ 완료 |
| `NoticeDetailView.vue` | `fetchNoticeById(id)`, `fetchAdjacentNotices(id)` | ✅ 완료 |
| `PressBoardView.vue` | `fetchPressArticles()` | ✅ 완료 |
| `PressDetailView.vue` | `fetchPressArticleById(id)`, `fetchAdjacentPressArticles(id)` | ✅ 완료 |
| `FaqView.vue` | `fetchFaqs()` | ✅ 완료 |

**Hero 이미지 연동 (완료):**

| Vue 파일 | 변경 후 |
|---|---|
| `HomeView.vue` | `fetchHeroSlides()` + 로컬 fallback |
| `NanumStoryView.vue`, `NanumStoryDetailView.vue` | `useHero('heroStory')` |
| `PressBoardView.vue`, `PressDetailView.vue` | `useHero('heroPress')` |
| `EducationView.vue`, `EducationDetailView.vue` | `useHero('heroEducation')` |
| `NoticeBoardView.vue`, `NoticeDetailView.vue` | `useHero('heroNotice')` |
| `FaqView.vue` | `useHero('heroFaq')` |
| `DonateView.vue` | `useHero('heroDonate')` |
| `DonateCertView.vue` | `useHero('heroDonateCert')` |

---

## Phase 6 — 더미 데이터 마이그레이션

### 6-1. 마이그레이션 스크립트 작성

Strapi 프로젝트 내에 시드 스크립트를 작성. Strapi의 `bootstrap` 함수 또는 독립 스크립트로 실행.

`kkotjae-cms/scripts/seed.js`:

```js
// node scripts/seed.js 로 실행 (Strapi 서버 기동 후)
const axios = require('axios')

const BASE = 'http://localhost:1337/api'

// 1. Strapi 어드민 JWT 토큰 취득 (최초 1회 로그인)
async function getToken() {
  const { data } = await axios.post(`${BASE}/auth/local`, {
    identifier: process.env.STRAPI_ADMIN_EMAIL,
    password: process.env.STRAPI_ADMIN_PASSWORD,
  })
  return data.jwt
}

// 2. 공지사항 시드
// body: Long text (HTML 문자열). views는 Strapi Default:0 적용되므로 생략.
// attachments(미디어)는 REST로 시드 불가 → 어드민에서 수동 업로드.
const notices = [
  {
    title: '[안내] 2024년 결산 공고 및 지정기부금 단체 실적 공시',
    isPinned: true,
    date: '2024-03-15',
    body: `<p>안녕하세요, 사단법인 꽃재(Blooming Hill)입니다.</p>
<p>항상 꽃재 재단과 함께해주시는 후원자 여러분과 지역사회 구성원분들께 깊은 감사의 인사를 드립니다. 저희 재단은 정직하고 투명한 운영을 최우선 가치로 삼고 있으며, 관련 법령에 의거하여 2024년도 재무 결산 내역 및 지정기부금 활용 실적을 다음과 같이 공시합니다.</p>
<p><strong>공시 개요</strong></p>
<ul>
  <li><strong>공시항목:</strong> 2024년도 재무제표 및 지정기부금 수입/지출 내역</li>
  <li><strong>관련근거:</strong> 상속세 및 증여세법 제50조의3, 소득세법 제34조</li>
  <li><strong>공고장소:</strong> 사단법인 꽃재 홈페이지 및 국세청 홈택스</li>
</ul>
<p>꽃재는 후원자님의 소중한 기부금이 소외된 이웃의 자립과 성장을 위해 가장 효율적으로 사용될 수 있도록 최선을 다하고 있습니다. 감사합니다.</p>`,
  },
  {
    title: '[공지] 제5회 정기연주회 관람 신청 안내 (무료 공연)',
    isPinned: true,
    date: '2024-03-02',
    body: '<p>꽃재 다문화오케스트라의 제5회 정기연주회에 여러분을 초대합니다. 자세한 내용은 추후 공지 예정입니다.</p>',
  },
  { title: '꽃재 나눔 릴레이 캠페인 참여 안내', isPinned: false, date: '2024-02-28', body: '' },
  { title: '2024년 상반기 장학생 선발 안내', isPinned: false, date: '2024-02-15', body: '' },
  { title: '자원봉사자 모집: 지역아동센터 음악 교육 지원', isPinned: false, date: '2024-02-10', body: '' },
  { title: '설 연휴 사무국 휴무 및 운영 안내', isPinned: false, date: '2024-02-05', body: '' },
  { title: '2023년 하반기 사업보고서 공시 안내', isPinned: false, date: '2023-12-20', body: '' },
  { title: '꽃재 바자회 수익금 전달식 개최 안내', isPinned: false, date: '2023-11-15', body: '' },
  { title: '2023년 정기총회 개최 공고', isPinned: false, date: '2023-10-30', body: '' },
  { title: '사단법인 꽃재 홈페이지 개편 안내', isPinned: false, date: '2023-09-01', body: '' },
]

// 3. 언론 보도자료 시드
// body: Long text (HTML). featuredImage/attachments는 어드민에서 수동 업로드.
const pressArticles = [
  {
    title: "꽃재, 취약계층 겨울나기 '따뜻한 방학' 지원 성료",
    type: '보도',
    date: '2024-11-20',
    body: `<p>사단법인 꽃재는 지난 15일, 다가오는 동절기를 맞아 지역 사회 내 에너지 취약계층 200가구를 대상으로 진행한 '따뜻한 방학' 겨울나기 지원 사업을 성공적으로 마무리했다고 밝혔습니다.</p>
<p>이번 지원 사업은 경제적 어려움으로 인해 난방비 부담이 큰 홀몸 어르신과 조손 가정을 중점적으로 지원하기 위해 기획되었습니다.</p>
<p>사단법인 꽃재는 지속 가능한 복지 생태계 구축을 목표로 교육 지원, 의료 지원, 주거 환경 개선 등 다양한 사회공헌 사업을 전개하고 있습니다.</p>`,
  },
  { title: '사단법인 꽃재, 제15회 정기연주회 성황리 개최', type: '뉴스', date: '2024-11-05', body: '' },
  { title: '꽃재 장학금 전달식, 지역 인재 육성에 앞장', type: '언론', date: '2024-10-25', body: '' },
  { title: "Blooming Hill, '함께하는 나눔' 바자회 수익금 전액 기부", type: '보도', date: '2024-10-10', body: '' },
  { title: '꽃재-성동구청, 지역사회 복지 증진을 위한 MOU 체결', type: '뉴스', date: '2024-09-28', body: '' },
  { title: "'꿈꾸는 숲' 1기 수료식 진행... 아동 정서 지원 강화", type: '보도', date: '2024-09-15', body: '' },
  { title: '꽃재 다문화오케스트라, 어르신 위문 공연 호평', type: '언론', date: '2024-08-30', body: '' },
  { title: '여름방학 청소년 봉사 캠프 성황... 200명 참여', type: '뉴스', date: '2024-08-12', body: '' },
  { title: '꽃재, 취약계층 여름방학 급식 지원 사업 실시', type: '보도', date: '2024-07-25', body: '' },
  { title: '사단법인 꽃재, 창립 10주년 기념 행사 개최', type: '언론', date: '2024-07-10', body: '' },
]

// 4. FAQ 시드
const faqs = [
  {
    order: 1,
    question: '후원금은 투명하게 쓰이나요?',
    answer: '사단법인 꽃재의 재무운영은 4단계의 감사시스템을 거칩니다. (1) 법인이사회 감사 (2) 외부추천감사의 내부감사 (3) 외부회계법인의 감사 (4) 정부 감사(보건복지부, 국세청, 관할지자체 등). 또한 연 1회 연간보고서를 발간해 진행된 사업결과를 보고합니다.',
  },
  {
    order: 2,
    question: '기부금은 세액공제 받을 수 있나요?',
    answer: '꽃재는 법인세법 시행령 제 36조에 근거한 사회복지법인으로 지정기부금단체이며, 본인 근로소득 금액의 30% 한도 내에서 기부금의 15% 세액공제(1,000만원 초과분은 30%)를 받을 수 있습니다.',
  },
  // ... 나머지 FAQ
]

async function seed() {
  const token = await getToken()
  const headers = { Authorization: `Bearer ${token}` }

  for (const item of notices) {
    await axios.post(`${BASE}/notices`, { data: item }, { headers })
    console.log(`✓ Notice: ${item.title.slice(0, 30)}...`)
  }

  for (const item of pressArticles) {
    await axios.post(`${BASE}/press-articles`, { data: item }, { headers })
    console.log(`✓ Press: ${item.title.slice(0, 30)}...`)
  }

  for (const item of faqs) {
    await axios.post(`${BASE}/faqs`, { data: item }, { headers })
    console.log(`✓ FAQ: ${item.question}`)
  }

  console.log('시드 완료!')
}

seed().catch(console.error)
```

> **Story, Program 이미지 포함 데이터**는 현재 Google CDN URL이라 직접 업로드가 어려움.
> Strapi 어드민에서 수동으로 실제 이미지를 업로드하고 데이터를 입력하는 것을 권장.
> 또는 URL을 그대로 외부 URL로 저장하는 방식도 가능 (Strapi의 외부 URL 미디어 미지원 → JSON 필드로 저장).

---

## Phase 7 — 배포

### 7-1. Strapi 배포 옵션

| 옵션 | 비용 | 난이도 | 권장 |
|---|---|---|---|
| **Railway** | 무료 플랜 있음 (5$/월~) | 쉬움 | ✅ 권장 |
| Render | 무료 플랜 있음 | 쉬움 | ✅ |
| DigitalOcean App Platform | 5$/월~ | 중간 | |
| 직접 VPS (Ubuntu) | 서버 비용 | 어려움 | |

### 7-2. Railway 배포 절차

```bash
# Railway CLI 설치
npm install -g @railway/cli

# Strapi 프로젝트 루트에서
railway login
railway init
railway up
```

Railway 환경변수 설정:
```
DATABASE_URL=<Supabase connection string>
NODE_ENV=production
APP_KEYS=<랜덤 32자 문자열>
API_TOKEN_SALT=<랜덤 문자열>
ADMIN_JWT_SECRET=<랜덤 문자열>
JWT_SECRET=<랜덤 문자열>
SUPABASE_STORAGE_KEY=<Supabase S3 access key>
SUPABASE_STORAGE_SECRET=<Supabase S3 secret>
SUPABASE_STORAGE_ENDPOINT=https://[ref].supabase.co/storage/v1/s3
```

### 7-3. Vue 프론트엔드 배포

Vercel 또는 Netlify 배포 시 환경변수:
```
VITE_STRAPI_URL=https://your-strapi-app.railway.app/api
```

---

## 작업 순서 체크리스트

### Step 1 — Supabase 설정 (30분)
- [ ] Supabase 프로젝트 생성
- [ ] PostgreSQL 연결 문자열 복사 보관
- [ ] Storage 버킷 4개 생성 + Public 설정
- [ ] S3 호환 키 발급

### Step 2 — Strapi 로컬 구동 (1시간)
- [ ] `npx create-strapi-app` 실행
- [ ] `pg` 패키지 설치
- [ ] `config/database.js` Supabase 연결로 수정
- [ ] `.env` 파일 설정
- [ ] `npm run develop` 으로 Strapi 어드민 접근 확인 (localhost:1337/admin)

### Step 3 — Content Types 생성 (2~3시간)
- [ ] Story Collection Type + 필드 정의
- [ ] Program Collection Type + 필드 정의
- [ ] Notice Collection Type + 필드 정의
- [ ] PressArticle Collection Type + 필드 정의
- [ ] FAQ Collection Type + 필드 정의
- [ ] **HeroSlide Collection Type** (image, alt, order, isActive)
- [ ] **SiteConfig Single Type** (heroStory~heroDonateCert 7개 Media 필드 + 통계 4개 + 계좌 4개)
- [ ] HistoryEvent Collection Type

### Step 4 — 권한 설정 (10분)
- [ ] Public role에 모든 Content Type find/findOne 허용 (9개)

### Step 5 — 데이터 마이그레이션 (2~3시간)
- [ ] 시드 스크립트로 Notice, Press, FAQ 데이터 입력
- [ ] Strapi 어드민에서 Story 이미지 업로드 + 데이터 입력 (9건)
- [ ] Strapi 어드민에서 Program 이미지 업로드 + 데이터 입력 (5건)
- [ ] **SiteConfig에 Hero 이미지 7장 업로드** (각 페이지 배너)
- [ ] **HeroSlide에 홈 슬라이드 이미지 4장 업로드** + order/isActive 설정

### Step 6 — Vue API 연동 ✅ 완료
- [x] `.env.local`에 `VITE_STRAPI_URL` 설정
- [x] Hero 이미지 연동 — `src/api/client.js`, `siteConfig.js`, `heroSlides.js`, `src/composables/useHero.js` 생성 + 11개 View 수정 완료
- [x] `NanumStoryView.vue`, `NanumStoryDetailView.vue` API 연동
- [x] `EducationView.vue`, `EducationDetailView.vue` API 연동
- [x] `NoticeBoardView.vue`, `NoticeDetailView.vue` API 연동 + 라우트 `/notice/:id` 추가
- [x] `PressBoardView.vue`, `PressDetailView.vue` API 연동 + 라우트 `/press/:id` 추가
- [x] `FaqView.vue` API 연동

### Step 7 — 배포 (1시간)
- [ ] Strapi → Railway 배포
- [ ] Railway 환경변수 설정
- [ ] Vue → Vercel/Netlify 배포 + `VITE_STRAPI_URL` 설정
- [ ] CORS 설정: Strapi `config/middlewares.js`에서 Vue 도메인 허용

---

## CORS 설정 참고

`kkotjae-cms/config/middlewares.js`:
```js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:5173',         // Vue dev server
        'https://your-site.vercel.app',  // 배포 도메인
      ],
    },
  },
  // ... 나머지 기본 미들웨어
]
```

---

## 추후 확장 고려사항

- **조회수 증가**: `views` 필드 업데이트를 위한 별도 엔드포인트 또는 Strapi 커스텀 컨트롤러
- **후원 신청 폼**: Strapi에 `DonationApplication` Collection Type 추가 + 이메일 알림 플러그인
- **페이지 콘텐츠 관리**: 소개, 사업 페이지의 텍스트/이미지를 Strapi Single Type으로 관리 (2단계 작업)
- **검색 기능 개선**: Strapi의 `_q` 파라미터 활용 (`/stories?_q=봉사`)
