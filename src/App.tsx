import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { MOCK_PAPERS } from './data/mockPapers';
import { Paper } from './types/paper';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { PaperCard } from './components/PaperCard';
import { CitationModal } from './components/CitationModal';
import { ObtecLogo } from './components/ObtecLogo';
import { BookOpen, ShieldCheck, ArrowLeft, Archive as ArchiveIcon } from 'lucide-react';

// Reader view pulls in KaTeX (JS + CSS + fonts); load it only when a paper is opened.
const PaperDetail = lazy(() =>
  import('./components/PaperDetail').then((m) => ({ default: m.PaperDetail }))
);

export function App() {
  // Navigation view: 'home' = Hero + Blog Feed, 'archive' = Full list of papers, reports & columns
  const [currentView, setCurrentView] = useState<'home' | 'archive'>('home');

  const papers: Paper[] = MOCK_PAPERS;

  // One-time cleanup of legacy caches written by earlier versions
  useEffect(() => {
    localStorage.removeItem('obtec_papers_v2');
    localStorage.removeItem('obtec_papers_v3');
  }, []);

  // Currently viewing paper (null = list view)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<'all' | 'paper' | 'report' | 'technical-brief' | 'column'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'citations' | 'popular'>('latest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Citation Modal state
  const [citationPaper, setCitationPaper] = useState<Paper | null>(null);

  // Ensure dark class is applied to html
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Handle URL hash navigation (#paper-id or #archive)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'archive') {
        setSelectedPaper(null);
        setCurrentView('archive');
        return;
      }
      if (hash) {
        const found = papers.find(p => p.id === hash || p.slug === hash);
        if (found) {
          setSelectedPaper(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      setSelectedPaper(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [papers]);

  // Select a paper to view
  const handleSelectPaper = (paper: Paper) => {
    setSelectedPaper(paper);
    window.location.hash = paper.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from paper detail
  const handleBackFromDetail = () => {
    setSelectedPaper(null);
    window.location.hash = currentView === 'archive' ? 'archive' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to home
  const handleGoHome = () => {
    setSelectedPaper(null);
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to archive list page
  const handleNavigateToArchive = () => {
    setSelectedPaper(null);
    setCurrentView('archive');
    window.location.hash = 'archive';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search input handler with auto-navigation to archive
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentView !== 'archive') {
      setCurrentView('archive');
      window.location.hash = 'archive';
    }
  };

  // Filtered & Sorted Papers
  const filteredPapers = useMemo(() => {
    return papers
      .filter((paper) => {
        if (selectedCategory !== 'All' && paper.category !== selectedCategory) {
          return false;
        }
        if (selectedType !== 'all' && paper.type !== selectedType) {
          return false;
        }
        if (selectedTag && (!paper.tags || !paper.tags.includes(selectedTag))) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (paper.title || '').toLowerCase().includes(q);
          const matchAbstract = (paper.abstract || '').toLowerCase().includes(q);
          const matchAuthors = Array.isArray(paper.authors) && paper.authors.some(a => (a?.name || '').toLowerCase().includes(q));
          const matchTags = Array.isArray(paper.tags) && paper.tags.some(t => (t || '').toLowerCase().includes(q));
          const matchDoi = (paper.doi || '').toLowerCase().includes(q);
          return matchTitle || matchAbstract || matchAuthors || matchTags || matchDoi;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') {
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        } else if (sortBy === 'citations') {
          return (b.citationCount || 0) - (a.citationCount || 0);
        } else if (sortBy === 'popular') {
          return (b.viewsCount || 0) - (a.viewsCount || 0);
        }
        return 0;
      });
  }, [papers, selectedCategory, selectedType, selectedTag, searchQuery, sortBy]);

  // Featured paper for Hero section
  const featuredPaper = useMemo(() => {
    return papers.find(p => p.featured) || papers[0] || null;
  }, [papers]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-100 selection:bg-zinc-700 selection:text-white">

      {/* Main Frosted Glass Navigation Header */}
      <Header
        currentView={currentView}
        onNavigateToArchive={handleNavigateToArchive}
        onGoHome={handleGoHome}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {selectedPaper ? (
          /* Paper Detail Reader Mode */
          <div className="pt-16 bg-black min-h-screen">
            <Suspense
              fallback={
                <div className="min-h-[60vh] flex items-center justify-center text-sm text-zinc-500 font-ui" role="status">
                  논문을 불러오는 중…
                </div>
              }
            >
              <PaperDetail
                paper={selectedPaper}
                onBack={handleBackFromDetail}
                onOpenCitation={setCitationPaper}
              />
            </Suspense>
          </div>
        ) : currentView === 'home' ? (
          /* Home View: Full-Screen Frosted Glass Hero + OpenAI-Style Minimalist Blog Feed */
          <main>
            <HeroSection
              featuredPaper={featuredPaper}
              onSelectPaper={handleSelectPaper}
              totalPapersCount={papers.length}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSelectedTag(null);
                const el = document.getElementById('blog-feed-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToArchive={handleNavigateToArchive}
            />

            {/* OpenAI-Style Editorial Blog Feed Section */}
            <section
              id="blog-feed-section"
              className="bg-black text-white pt-24 pb-32 border-t border-zinc-900 scroll-mt-16"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Blog Header (Mirroring OpenAI Blog Format) */}
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white font-ui tracking-tight mb-3">
                    Obtec Developer & Research Blog
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto font-ui">
                    Insights for researchers and developers building with Obtec
                  </p>
                </div>

                {/* Filter Bar */}
                <FilterBar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  selectedType={selectedType}
                  onSelectType={setSelectedType}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  selectedTag={selectedTag}
                  onClearTag={() => setSelectedTag(null)}
                  totalFilteredCount={filteredPapers.length}
                />

                {/* Blog Articles Feed */}
                {filteredPapers.length === 0 ? (
                  <div className="py-20 text-center rounded-3xl bg-zinc-950 border border-zinc-900 p-8 space-y-3">
                    <BookOpen className="w-10 h-10 mx-auto text-zinc-600 stroke-1" />
                    <h3 className="text-base font-medium text-white font-ui">
                      {searchQuery.trim() || selectedCategory !== 'All' || selectedType !== 'all' || selectedTag
                        ? '검색 조건에 맞는 글이 없습니다.'
                        : '등록된 블로그 글이 없습니다.'}
                    </h3>
                    <p className="text-sm text-zinc-400 font-ui font-light">
                      {searchQuery.trim() || selectedCategory !== 'All' || selectedType !== 'all' || selectedTag
                        ? '다른 검색어나 카테고리 필터를 선택해보세요.'
                        : '새로운 연구 소식 및 기술 포스트가 발행되면 이곳에 표시됩니다.'}
                    </p>
                    {(searchQuery.trim() || selectedCategory !== 'All' || selectedType !== 'all' || selectedTag) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All');
                          setSelectedType('all');
                          setSelectedTag(null);
                        }}
                        className="deepmind-btn-outlined px-5 py-2 text-xs font-medium inline-block mt-3 cursor-pointer"
                      >
                        필터 초기화
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    {filteredPapers.map((paper) => (
                      <PaperCard
                        key={paper.id}
                        paper={paper}
                        onSelect={handleSelectPaper}
                        onOpenCitation={setCitationPaper}
                        onSelectTag={(tag) => setSelectedTag(tag)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </main>
        ) : (
          /* Dedicated Archive List Page (Mirroring OpenAI Blog Format) */
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 bg-black min-h-screen animate-fade-in">
            {/* Top Navigation & Breadcrumbs */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <button
                onClick={handleGoHome}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer font-ui"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
                <span>Obtec Research 홈으로</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <ArchiveIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>TOTAL ARTICLES: {papers.length}</span>
              </div>
            </div>

            {/* Archive Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white font-ui tracking-tight mb-3">
                Obtec Archive
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto font-ui">
                All publications, technical reports, and columns from Obtec Research
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              sortBy={sortBy}
              onSortChange={setSortBy}
              selectedTag={selectedTag}
              onClearTag={() => setSelectedTag(null)}
              totalFilteredCount={filteredPapers.length}
            />

            {/* Blog Articles Feed */}
            {filteredPapers.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-zinc-950 border border-zinc-900 p-8 space-y-3">
                <BookOpen className="w-10 h-10 mx-auto text-zinc-600 stroke-1" />
                <h3 className="text-base font-medium text-white font-ui">
                  {searchQuery.trim() || selectedCategory !== 'All' || selectedType !== 'all' || selectedTag
                    ? '검색 조건에 맞는 글이 없습니다.'
                    : '등록된 아카이브 글이 없습니다.'}
                </h3>
                <p className="text-sm text-zinc-400 font-ui font-light">
                  {searchQuery.trim() || selectedCategory !== 'All' || selectedType !== 'all' || selectedTag
                    ? '다른 검색어나 카테고리 필터를 선택해보세요.'
                    : '새로운 연구 성과가 등록되면 이곳에 표시됩니다.'}
                </p>
                {(searchQuery.trim() || selectedCategory !== 'All' || selectedType !== 'all' || selectedTag) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedType('all');
                      setSelectedTag(null);
                    }}
                    className="deepmind-btn-outlined px-5 py-2 text-xs font-medium inline-block mt-3 cursor-pointer"
                  >
                    필터 초기화
                  </button>
                )}
              </div>
            ) : (
              <div>
                {filteredPapers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onSelect={handleSelectPaper}
                    onOpenCitation={setCitationPaper}
                    onSelectTag={(tag) => setSelectedTag(tag)}
                  />
                ))}
              </div>
            )}
          </main>
        )}
      </div>

      {/* Simple Black Global Academic Footer */}
      <footer className="print:hidden border-t border-zinc-900 mt-auto py-16 bg-black text-zinc-400 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">

            <div className="space-y-3.5 md:col-span-2">
              <div
                onClick={handleGoHome}
                className="flex items-center gap-2.5 cursor-pointer group select-none"
              >
                <ObtecLogo size={26} glow={false} />
                <span className="font-semibold tracking-tight text-base text-white group-hover:text-zinc-200 transition-colors">
                  Obtec Research
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                  OPEN RESEARCH
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed font-light">
                우리는 물리학, 컴퓨터 과학, 반도체 및 수학·다학제(etc.) 등 자연과 기술의 근원적 난제를 탐구하며,
                인류의 지식 확장과 과학적 진보에 기여하는 모든 연구 논문, 기술 보고서, 그리고 연구원 칼럼을 투명하게 공개합니다.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Creative Commons Attribution 4.0 (CC BY 4.0) 라이선스 준수</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white uppercase font-mono tracking-wider mb-3">연구 분야 및 칼럼</h4>
              <ul className="space-y-2">
                <li><button onClick={() => { setSelectedCategory('API'); setSelectedTag(null); handleNavigateToArchive(); }} className="hover:text-white transition-colors cursor-pointer">API (인프라 & 페일오버)</button></li>
                <li><button onClick={() => { setSelectedCategory('물리학'); setSelectedTag(null); handleNavigateToArchive(); }} className="hover:text-white transition-colors cursor-pointer">물리학 (태양계 & 양자)</button></li>
                <li><button onClick={() => { setSelectedCategory('컴퓨터 과학'); setSelectedTag(null); handleNavigateToArchive(); }} className="hover:text-white transition-colors cursor-pointer">컴퓨터 과학 (인공신경망 & 시스템)</button></li>
                <li><button onClick={() => { setSelectedCategory('반도체'); setSelectedTag(null); handleNavigateToArchive(); }} className="hover:text-white transition-colors cursor-pointer">반도체 (디지털 논리 회로 & HBM4)</button></li>
                <li><button onClick={() => { setSelectedCategory('etc.'); setSelectedTag(null); handleNavigateToArchive(); }} className="hover:text-white transition-colors cursor-pointer">etc. (기타 연구 및 칼럼)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white uppercase font-mono tracking-wider mb-3">Obtec Research</h4>
              <ul className="space-y-2 text-[12px] text-zinc-500">
                <li>프론티어 과학 및 첨단 기술 연구소</li>
                <li>오픈 리서치 & 학술 칼럼 아카이브</li>
                <li>Boids Glass & Modern Typography</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>© 2026 Obtec Research Archive. Open research licensed under CC BY 4.0.</p>
            <p className="font-mono text-[11px]">Designed for frontier scientific inquiry</p>
          </div>
        </div>
      </footer>

      {/* Citation Modal */}
      <CitationModal
        paper={citationPaper}
        onClose={() => setCitationPaper(null)}
      />
    </div>
  );
}

export default App;
