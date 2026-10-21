# 🔬 AETHER RESEARCH ARCHIVE (학술 논문 & 기술 보고서 블로그)

> 미래지향적 **네온 글로우(Neon Glow)**, **글래스모피즘(Glassmorphism)**, 그리고 **인터랙티브 메탈릭 3D 그래픽(Three.js)** 기반의 고가독성 프리미엄 학술 논문 및 전략 기술 보고서 퍼블리싱 플랫폼

---

## ✨ 핵심 디자인 & 시각적 특징

1. **인터랙티브 메탈릭 3D 그래픽 (Three.js WebGL)**
   - PBR(물리 기반 렌더링) 크롬 및 티타늄 질감의 3D 자이로스코프 링 및 뫼비우스 코어
   - 실시간 마우스 무브 조명 반사 및 궤도 노드 인터랙션
   - 메탈릭 실버/티타늄 그라데이션 타이포그래피 및 뱃지

2. **글래스모피즘 (Glassmorphism)**
   - `backdrop-blur-xl` 기반의 반투명 아크릴/프로스티드 글래스 카드 및 네비게이션
   - 미세 다이아몬드 보더 (`border-white/10`)와 빛 반사 하이라이트

3. **네온 글로우 (Neon Glow)**
   - 사이언(Cyan), 바이올렛(Violet), 에메랄드(Emerald)의 미래지향적 앰비언트 글로우
   - 실시간 독서 진행률(Reading Progress) 네온 빔 인디케이터
   - 카드 호버 시 네온 보더 펄스 및 입체 그림자 효과

4. **학술 연구 수준의 극대화된 가독성 (High Readability)**
   - **KaTeX LaTeX 수식 완벽 지원**: 인라인 수식($...$) 및 디스플레이 블록 수식($$...$$)
   - **학술 세리프(Newsreader) vs 모던 산세리프(Plus Jakarta Sans)** 실시간 토글
   - **폰트 크기(sm, md, lg, xl)** 및 **단일 컬럼 / 전통 학술지 2단 편집 레이아웃** 전환
   - **양방향 목차 스크롤스파이 (Scrollspy TOC)**: 읽는 위치에 맞춰 자동 하이라이트
   - `text-wrap: balance`(제목) & `text-wrap: pretty`(본문) 웹 표준 타이포그래피 최적화

---

## 🚀 주요 기능

- 📄 **논문 & 보고서 전문 뷰어**: 저자, 소속, DOI, 피어리뷰 뱃지, 초록, 핵심 기여점, 본문 수식/표/알고리즘, 참고문헌
- 🖋️ **논문 / 보고서 작성 및 등록 에디터**:
  - 마크다운 및 LaTeX 수식 실시간 라이브 프리뷰
  - 신규 논문 작성 후 저장 시 `localStorage`에 자동 영구 저장
- 📑 **학술 인용 생성 (Cite Modal)**: BibTeX, APA 7th, IEEE 형식 원클릭 복사 및 `.bib` 다운로드
- 📥 **PDF 원문 다운로드 기능**: 논문 원문 즉시 저장
- 🔖 **내 서재 (Bookmarks)**: 관심 논문 보관 및 빠른 조회
- 🔍 **실시간 다차원 검색 & 필터링**:
  - 분야별 (AI & Machine Learning, Semiconductors & HW, Systems, Quantum)
  - 문서 유형별 (학술 논문, 전략 보고서, 기술 브리프)
  - 최신순 / 피인용순 / 조회수순 정렬 및 태그 필터
- 🌓 **다크 모드 / 라이트 모드 전환**

---

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript, Vite 8
- **Styling**: Tailwind CSS v4, Glassmorphism, CSS 3D
- **3D Graphics**: Three.js (WebGL PBR Materials & Dynamic Lighting)
- **Math Rendering**: KaTeX
- **Icons**: Lucide React

---

## 💻 로컬 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```
