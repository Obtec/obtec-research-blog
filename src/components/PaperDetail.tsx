import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Check 
} from 'lucide-react';
import { Paper } from '../types/paper';
import { MathRenderer } from './MathRenderer';

interface PaperDetailProps {
  paper: Paper;
  onBack: () => void;
  onOpenCitation?: (paper: Paper) => void;
}

export const PaperDetail: React.FC<PaperDetailProps> = ({
  paper,
  onBack,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    paper.sections[0]?.id || ''
  );
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [shareSuccess, setShareSuccess] = useState(false);

  const articleRef = useRef<HTMLDivElement>(null);

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;

      const totalHeight = el.scrollHeight;
      const windowHeight = window.innerHeight;
      
      const scrolled = window.scrollY - el.offsetTop + windowHeight / 2;
      const progress = Math.min(100, Math.max(0, (scrolled / (totalHeight - windowHeight / 2)) * 100));
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Table of Contents (Scrollspy)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: 0.05 }
    );

    const sectionElements = document.querySelectorAll('.academic-section');
    sectionElements.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [paper]);

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Copy page URL
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen pb-32 bg-black text-white selection:bg-zinc-800 selection:text-white">
      
      {/* 1. Thin Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.06] z-50 print:hidden">
        <div 
          className="h-full bg-white transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. Top Navigation / Back Action */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer group font-ui"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>연구 목록으로 돌아가기</span>
        </button>
      </div>

      <div ref={articleRef}>
        
        {/* 3. Centered Header (Exact OpenAI Blog Post Style) */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-6 pb-8 sm:pb-12">
          {/* Date & Category */}
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-zinc-400 font-ui font-normal mb-4 sm:mb-5 tracking-wide">
            <time dateTime={paper.publishedDate}>{paper.publishedDate}</time>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="text-zinc-300 font-medium uppercase tracking-wider text-xs">
              {paper.category}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-medium text-white tracking-tight leading-[1.15] mb-5 font-ui">
            {paper.title}
          </h1>

          {/* Subtitle */}
          {paper.subtitle && (
            <p className="text-base sm:text-lg lg:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-6 leading-relaxed font-ui">
              {paper.subtitle}
            </p>
          )}

          {/* Authors */}
          <div className="text-xs sm:text-sm text-zinc-400 font-ui font-normal">
            <span className="text-zinc-500">Authors:</span>{' '}
            <span className="text-zinc-300 font-medium">
              {paper.authors.map((a) => a.name).join(', ')}
            </span>
          </div>
        </header>

        {/* 4. Large Hero Banner Image */}
        {paper.coverImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
            <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-white/[0.08] shadow-2xl">
              <img
                src={paper.coverImage}
                alt={paper.title}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Mobile Outline Collapsible (lg:hidden) */}
        {paper.sections.length > 0 && (
          <div className="lg:hidden max-w-5xl mx-auto px-4 sm:px-6 mb-8">
            <details className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] group">
              <summary className="text-xs font-mono uppercase tracking-wider text-zinc-400 cursor-pointer list-none flex items-center justify-between">
                <span>목차 (Outline)</span>
                <span className="text-zinc-500 text-[11px]">펼치기 ▼</span>
              </summary>
              <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1.5 text-xs sm:text-sm">
                {paper.sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className="block w-full text-left py-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* 5. Main Content Grid (Left Body + Right Sticky Sidebar TOC) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start justify-between gap-12 xl:gap-16">
          
          {/* Left Column: Article reading body */}
          <main className="w-full lg:max-w-[720px] xl:max-w-[760px] flex-1">
            
            {/* Introductory Abstract Paragraphs */}
            <div className="text-zinc-200 text-[17px] sm:text-[18px] leading-[1.78] font-light font-ui mb-10 space-y-6">
              <MathRenderer content={paper.abstract} />
            </div>

            {/* Key Breakthroughs (Highlights) */}
            {paper.keyContributions && paper.keyContributions.length > 0 && (
              <div className="my-10 p-6 rounded-2xl bg-zinc-950/70 border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Key Highlights</h4>
                <ul className="space-y-2.5 text-zinc-300 text-sm sm:text-base font-light">
                  {paper.keyContributions.map((kc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-white font-mono mt-1 text-xs">•</span>
                      <span>{kc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Sections */}
            <div className="space-y-12">
              {paper.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="academic-section scroll-mt-28"
                >
                  <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-5 font-ui">
                    {section.title}
                  </h2>
                  <div className="text-zinc-300 text-base sm:text-[17px] leading-[1.8] font-light font-ui space-y-5">
                    <MathRenderer content={section.content} />
                  </div>
                </section>
              ))}
            </div>

            {/* References if any */}
            {paper.references && paper.references.length > 0 && (
              <section id="sec-references" className="academic-section pt-12 mt-16 border-t border-zinc-900 scroll-mt-28">
                <h3 className="text-xl font-medium text-white mb-4 font-ui">References</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-400 font-ui">
                  {paper.references.map((ref) => (
                    <li key={ref.id} className="flex items-start gap-2">
                      <span className="font-mono text-zinc-500">{ref.label}</span>
                      <span>
                        {ref.authors} ({ref.year}). <em>"{ref.title}"</em>. {ref.venue}.
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </main>

          {/* Right Column: Sticky Table of Contents Sidebar (Exact OpenAI Blog Post Style) */}
          <aside className="hidden lg:block sticky top-28 self-start w-64 xl:w-72 flex-shrink-0 space-y-6">
            <nav className="space-y-2 text-sm font-ui">
              {paper.sections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`block w-full text-left transition-colors cursor-pointer text-sm leading-snug py-0.5 ${
                      isActive
                        ? 'border-l-2 border-white pl-3 text-white font-medium'
                        : 'pl-3.5 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {sec.title}
                  </button>
                );
              })}
              {paper.references && paper.references.length > 0 && (
                <button
                  onClick={() => scrollToSection('sec-references')}
                  className={`block w-full text-left transition-colors cursor-pointer text-sm leading-snug py-0.5 ${
                    activeSectionId === 'sec-references'
                      ? 'border-l-2 border-white pl-3 text-white font-medium'
                      : 'pl-3.5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  References
                </button>
              )}
            </nav>

            {/* Copy Page Pill Button */}
            <div className="pt-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs sm:text-sm text-zinc-200 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer font-ui"
              >
                {shareSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Page</span>
                  </>
                )}
              </button>
            </div>
          </aside>

        </div>

      </div>

    </div>
  );
};
