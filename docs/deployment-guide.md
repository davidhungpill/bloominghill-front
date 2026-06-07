# 꽃재 홈페이지 배포 가이드

## 트래픽 전제

지역 교회 법인 홍보 사이트 기준으로 예상 트래픽:
- **월 방문자**: 500~3,000명 (피크: 행사 후 공지 올릴 때)
- **API 요청**: 대부분 정적 콘텐츠 조회, 관리자 CMS 접근 가끔
- **Strapi 메모리**: 구동 시 ~300MB, idle 상태에선 거의 호출 없음

이 규모에서 대형 인프라는 과잉이고, 반대로 무료 플랜의 **슬립 정책**(Render 무료, Railway 무료)은 CMS 관리자가 답답하게 느껴질 수 있어 **소액 유료 플랜이 현실적**입니다.

---

## 추천 구성 요약

```
[가비아/후이즈]           [Cloudflare Pages]        [Railway]
  꽃재.or.kr        →     Vue SPA (정적빌드)    ←→   Strapi CMS (Node.js)
  도메인 등록            무료 / 전 세계 CDN           ~$5-8/월
  ~8,000원/년                                          ↕
                                                  [Supabase]
                                                  PostgreSQL + Storage
                                                  Free tier
```

---

## 1. 도메인 등록

### 어떤 TLD를 선택할까

| TLD | 비용 | 특징 | 추천 여부 |
|---|---|---|---|
| `.or.kr` | ~8,000원/년 | 사단법인·비영리단체 전용, 공신력 높음 | ✅ **1순위** |
| `.kr` | ~7,000원/년 | 국내 일반 도메인 | 차선 |
| `.com` | ~13,000원/년 | 국제적으로 친숙 | 비영리엔 덜 어울림 |

`.or.kr`이 사단법인에 가장 적합합니다 (예: `kkotjae.or.kr`).

### 등록 절차 (가비아 기준)

1. **[gabia.com](https://www.gabia.com)** 회원가입 (법인 명의 권장)
2. 도메인 검색 → `kkotjae.or.kr` 또는 원하는 이름 입력
3. 장바구니 → 결제
4. `.or.kr` 발급 시 **추가 서류 필요**:
   - 법인 등록 사실 증명서 (법원등기소 발급)
   - 단체명이 도메인과 관련성 있어야 함
   - 가비아 → 도메인 관리 → 서류 제출 메뉴에서 업로드
5. 심사 후 보통 **1~2 영업일** 내 등록 완료

---

## 2. 프론트엔드 (Vue SPA) 배포 — Cloudflare Pages

**왜 Cloudflare Pages?**
- 완전 무료, 빌드 횟수 무제한
- Cloudflare 자체가 국내 CDN 엣지 보유 → 한국 로딩 속도 우수
- 커스텀 도메인 + 자동 HTTPS 무료

### 배포 절차

**① GitHub 저장소 준비**
```bash
# 현재 프로젝트가 GitHub에 없다면
git remote add origin https://github.com/<your-org>/blooming-new.git
git push -u origin master
```

**② Cloudflare Pages 설정**
1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → Create application → Pages
2. **Connect to Git** → GitHub 저장소 선택
3. Build 설정:
   ```
   Framework preset: Vue
   Build command:    npm run build
   Build output:     dist
   ```
4. **Environment variables** 추가:
   ```
   VITE_STRAPI_URL  = https://your-strapi.railway.app/api
   VITE_STRAPI_TOKEN = (Strapi에서 발급한 API 토큰)
   ```
5. **Save and Deploy** → 첫 빌드 완료 후 `xxx.pages.dev` 임시 URL 생성

**③ 커스텀 도메인 연결**

가비아 도메인을 Cloudflare에 위임하는 방법이 가장 편합니다:

1. Cloudflare → **Add a Site** → 도메인 입력 → Free 플랜 선택
2. Cloudflare가 제공하는 **네임서버 2개** 복사
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com  (예시, 실제 값은 Cloudflare 대시보드에서 확인)
   ```
3. **가비아 도메인 관리** → 네임서버 변경 → 위 값으로 교체
4. 전파 완료(1~24시간) 후 Cloudflare Pages → Custom domains → `www.kkotjae.or.kr` 추가
5. HTTPS 인증서 자동 발급 (Let's Encrypt, Cloudflare 관리)

> `kkotjae.or.kr` (루트) → `www.kkotjae.or.kr` 리다이렉트는 Cloudflare DNS에서 CNAME Flatten으로 처리

---

## 3. 백엔드 (Strapi) 배포 — Railway

**왜 Railway?**
- GitHub 연동 → push하면 자동 재배포
- 환경변수 GUI 관리 편리
- 한국 시간대 무리 없는 응답속도 (미국 US-West 기준, 평균 200ms 내외)
- Hobby 플랜 $5/월 크레딧 포함, 초과분 사용량 과금 → **이 규모에선 월 $5~8 수준**

### 배포 절차

**① Strapi 프로젝트 GitHub Push**
```bash
cd kkotjae-cms
git init
git add .
git commit -m "init strapi"
git remote add origin https://github.com/<your-org>/kkotjae-cms.git
git push -u origin main
```

**② Railway 프로젝트 생성**
1. [railway.app](https://railway.app) → New Project → **Deploy from GitHub repo**
2. `kkotjae-cms` 저장소 선택
3. Variables 탭에서 환경변수 설정:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://postgres.[ref]:[pw]@...supabase.com:6543/postgres
   APP_KEYS=<32자 랜덤>
   API_TOKEN_SALT=<랜덤>
   ADMIN_JWT_SECRET=<랜덤>
   JWT_SECRET=<랜덤>
   SUPABASE_STORAGE_KEY=<S3 access key>
   SUPABASE_STORAGE_SECRET=<S3 secret>
   SUPABASE_STORAGE_ENDPOINT=https://[ref].supabase.co/storage/v1/s3
   SUPABASE_STORAGE_BUCKET=uploads
   ```
4. Settings → **Generate Domain** → `kkotjae-cms.railway.app` 형태의 URL 생성
5. 빌드 로그 확인 → `yarn build && yarn start` 자동 실행

**③ Strapi 커스텀 도메인 연결** (선택 사항)

관리자만 접근하는 CMS라면 `kkotjae-cms.railway.app`으로 써도 무방합니다.
`api.kkotjae.or.kr` 같은 서브도메인을 붙이고 싶다면:

1. Railway Settings → Custom Domain → `api.kkotjae.or.kr` 입력 → CNAME 값 복사
2. Cloudflare DNS → CNAME 레코드 추가:
   ```
   Type:   CNAME
   Name:   api
   Target: (Railway가 준 CNAME 값)
   Proxy:  DNS only (회색 구름) ← Railway SSL과 충돌 방지
   ```

**④ CORS 설정 (필수)**

`kkotjae-cms/config/middlewares.js`:
```js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:5173',
        'https://kkotjae.or.kr',
        'https://www.kkotjae.or.kr',
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]
```

**⑤ 조회수 업데이트 권한 추가**

Strapi Admin → Settings → Users & Permissions → Roles → Public:

| Content Type | 허용 액션 |
|---|---|
| notices | `find`, `findOne`, `update` |
| press-articles | `find`, `findOne`, `update` |
| stories | `find`, `findOne`, `update` |
| programs | `find`, `findOne`, `update` |

---

## 4. 전체 배포 순서 체크리스트

```
[ ] 1. 가비아에서 도메인 등록 (.or.kr 서류 제출 포함)       → 1~2일
[ ] 2. Cloudflare에 사이트 추가 + 가비아 네임서버 교체       → 1시간
[ ] 3. Supabase 프로젝트 + 버킷 생성 (backend-plan.md 참고) → 30분
[ ] 4. Strapi 로컬 완성 후 GitHub push                      → 완료 후
[ ] 5. Railway 배포 + 환경변수 입력                         → 30분
[ ] 6. Strapi 어드민 접속 → Content Types + 권한 설정        → 2~3시간
[ ] 7. Cloudflare Pages 배포 + VITE_STRAPI_URL 설정         → 30분
[ ] 8. Cloudflare Pages에 커스텀 도메인 연결                 → 즉시
[ ] 9. CORS 설정 → Railway 재배포                           → 10분
[ ] 10. 실제 도메인에서 동작 확인 (API 호출, 이미지 로드)    → 테스트
```

---

## 5. 월 예상 비용

| 항목 | 비용 |
|---|---|
| 도메인 `.or.kr` | ~₩8,000 / 년 (₩700/월) |
| Cloudflare Pages (Vue) | **무료** |
| Railway (Strapi) | **$5~8/월** (₩7,000~11,000) |
| Supabase DB + Storage | **무료** (500MB DB / 1GB Storage) |
| **합계** | **약 ₩8,000~12,000/월** |

Supabase가 나중에 부족해지면(이미지 1GB 초과 등) Pro $25/월로 올리면 되지만, 이 규모에선 수년 간 무료로 충분합니다.

---

## 6. 추가 고려사항

**백업**
Supabase → Settings → Database → Backups에서 자동 일일 백업 확인 (무료 플랜은 7일 보관).

**모니터링**
[UptimeRobot](https://uptimerobot.com) 무료 플랜으로 5분마다 사이트 살아있는지 이메일 알림 설정 권장.

**Strapi 어드민 보안**
배포 후 Strapi Admin URL(`/admin`)은 외부에서 접근 가능하므로 강한 비밀번호 사용 필수. 필요시 Railway에서 IP 제한도 가능.
