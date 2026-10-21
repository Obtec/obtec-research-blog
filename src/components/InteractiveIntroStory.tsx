import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowDown,
  Brain,
  Cpu,
  Atom,
  PenTool,
  Play,
  Pause
} from 'lucide-react';
import { DomainType } from '../types/domain';
import { StoryBackgroundCanvas } from './domain-animations/StoryBackgroundCanvas';
import type { Paper } from '../types/paper';

const PHILOSOPHICAL_QUOTES = [
  {
    kr: "지식이라는 섬이 넓어질수록, 우리가 마주하는 미지의 해안선 또한 끝없이 확장된다.",
    en: "As the island of our knowledge grows, so does the shore of our ignorance.",
    author: "John Archibald Wheeler (이론물리학자)",
  },
  {
    kr: "어딘가에서, 믿을 수 없을 만큼 경이로운 무언가가 밝혀지기를 기다리고 있다.",
    en: "Somewhere, something incredible is waiting to be known.",
    author: "Carl Sagan (천문학자 / 과학철학자)",
  },
  {
    kr: "우리가 경험할 수 있는 가장 아름다운 것은 바로 '신비'이다. 그것이야말로 모든 진정한 예술과 과학의 근원이다.",
    en: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
    author: "Albert Einstein (물리학자)",
  },
  {
    kr: "우리는 불가능한 우주 속에서 태어난 하나의 기적이며, 우주가 스스로를 이해하기 위해 만들어낸 지성이다.",
    en: "We are an impossibility in an impossible universe.",
    author: "Ray Bradbury (작가 / 사상가)",
  },
];

interface InteractiveIntroStoryProps {
  onSelectCategory: (category: string) => void;
  onSelectPaper: (paper: Paper) => void;
  featuredPapers: Paper[];
  onNavigateToArchive?: () => void;
}

export const InteractiveIntroStory: React.FC<InteractiveIntroStoryProps> = ({
  onSelectCategory,
  onSelectPaper: _onSelectPaper,
  featuredPapers: _featuredPapers,
  onNavigateToArchive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic scroll progress (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Selected Frontier tab for Scene 2
  const [selectedFrontierIndex, setSelectedFrontierIndex] = useState<number>(0);

  // Philosophical quote index for Scene 3 (Uncharted Horizon)
  const [philosophicalQuoteIndex, setPhilosophicalQuoteIndex] = useState(0);

  // 4 Core Research Frontiers (물리학, 컴퓨터 과학, 반도체, etc)
  const frontiers: {
    id: string;
    domainKey: DomainType;
    category: string;
    title: string;
    subheading: string;
    color: string;
    badgeText: string;
    icon: typeof Atom;
    summary: string;
    tags: string[];
    image: string;
  }[] = [
    {
      id: 'physics',
      domainKey: 'physics',
      category: '물리학',
      title: '물리학 & 태양계 천체 역학',
      subheading: 'Keplerian N-Body Symplectic Integrators & Relativistic Gravity',
      color: '#38BDF8',
      badgeText: 'OBTEC PHYSICS',
      icon: Atom,
      summary: '태양계 행성의 3D 케플러 궤도역학과 일반 상대성 이론 시공간 왜곡을 시뮬레이션하고, N-체 중력 공명 및 양자 파동 간섭을 탐구하는 물리학 연구입니다.',
      tags: ['태양계 역학', '심플렉틱 적분', '상대론적 중력', '양자 간섭'],
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cs',
      domainKey: 'cs',
      category: '컴퓨터 과학',
      title: '컴퓨터 과학 & 인공신경망 아키텍처',
      subheading: 'Deep Neural Networks, Linear Attention & Distributed Systems',
      color: '#60A5FA',
      badgeText: 'OBTEC COMPUTER SCIENCE',
      icon: Brain,
      summary: '다층 인공신경망의 순전파 펄스와 어텐션 매트릭스를 기반으로, O(N²) 병목을 극복하는 차세대 AI 모델 및 분산 합의 알고리즘을 연구합니다.',
      tags: ['인공신경망', 'MambaFormer', '선형 어텐션', '분산 합의'],
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'semiconductor',
      domainKey: 'semiconductor',
      category: '반도체',
      title: '반도체 & 디지털 논리 회로',
      subheading: 'CMOS Logic Gates, Micro-Architecture & HBM4 Interposers',
      color: '#818CF8',
      badgeText: 'OBTEC SEMICONDUCTOR',
      icon: Cpu,
      summary: 'AND, OR, NOT, XOR 디지털 논리 회로 시뮬레이션부터 2,048-bit HBM4 버스, Cu-Cu 다이렉트 하이브리드 본딩 및 차세대 실리콘 인터포저 패키징을 설계합니다.',
      tags: ['논리 회로', 'HBM4 16-Hi', '하이브리드 본딩', '패키징'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'etc',
      domainKey: 'etc',
      category: 'etc.',
      title: 'etc. (기타 연구 및 칼럼)',
      subheading: '라파엘로 <아테네 학당> · Diverse Frontiers & Column Essays',
      color: '#C084FC',
      badgeText: 'OBTEC ETC.',
      icon: PenTool,
      summary: '물리학, 컴퓨터 과학, 반도체 외에도 생명과학, 화학, 그리고 연구원들의 깊이 있는 통찰을 담은 칼럼 등 기타 다양한 연구 분야(etc.)를 소개합니다.',
      tags: ['기타 연구', '생명과학', '연구원 칼럼', '아테네 학당'],
      image: '/assets/school-of-athens.jpg',
    },
  ];

  // Smoothstep easing helper for linear, acceleration-free transitions
  const smoothstep = (min: number, max: number, value: number) => {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  // Track scroll progress within container
  useEffect(() => {
    let animId: number;
    let lastProgress = -1;

    let containerTop = 0;
    let scrollableDist = 1;

    const measureMetrics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      containerTop = window.scrollY + rect.top;
      scrollableDist = Math.max(1, rect.height - window.innerHeight);
    };

    measureMetrics();
    window.addEventListener('resize', measureMetrics);

    const updateProgress = () => {
      const currentScroll = window.scrollY - containerTop;
      const progress = Math.min(1, Math.max(0, currentScroll / scrollableDist));

      if (Math.abs(progress - lastProgress) >= 0.003) {
        lastProgress = progress;
        setScrollProgress(progress);

        if (progress >= 0.28 && progress < 0.68) {
          const subProgress = (progress - 0.28) / (0.68 - 0.28);
          const idx = Math.min(frontiers.length - 1, Math.floor(subProgress * frontiers.length));
          setSelectedFrontierIndex((prev) => (prev === idx ? prev : idx));
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('resize', measureMetrics);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, [frontiers.length]);

  // Autoplay presentation animation
  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalTime = 40;
    const scrollStep = 14;

    const timer = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      const currentScroll = -rect.top;

      if (currentScroll >= scrollableDist - 20) {
        setIsAutoPlaying(false);
        return;
      }

      window.scrollBy({ top: scrollStep, behavior: 'instant' });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Jump to specific scene
  const jumpToScene = (sceneIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableDist = rect.height - window.innerHeight;

    const targetProgress = [0.10, 0.48, 0.85][sceneIndex];
    const targetY = containerTop + scrollableDist * targetProgress;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Jump to actual archive
  const scrollToArchive = () => {
    setIsAutoPlaying(false);
    const archiveEl = document.getElementById('paper-archive-section');
    if (archiveEl) {
      archiveEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (onNavigateToArchive) {
      onNavigateToArchive();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFrontierExplore = (category: string) => {
    onSelectCategory(category);
    const archiveEl = document.getElementById('paper-archive-section');
    if (archiveEl) {
      archiveEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (onNavigateToArchive) {
      onNavigateToArchive();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  let activeScene = 1;
  if (scrollProgress >= 0.68) activeScene = 3;
  else if (scrollProgress >= 0.28) activeScene = 2;

  const handleBackgroundClick = useCallback(() => {
    if (activeScene === 3) {
      setPhilosophicalQuoteIndex((prev) => (prev + 1) % PHILOSOPHICAL_QUOTES.length);
    }
  }, [activeScene]);

  const scene1Opacity = 1 - smoothstep(0.22, 0.30, scrollProgress);
  const scene1Scale = 1 - Math.min(0.06, scrollProgress * 0.2);
  const scene1Y = -(scrollProgress * 50);

  const scene2In = smoothstep(0.26, 0.32, scrollProgress);
  const scene2Out = 1 - smoothstep(0.64, 0.70, scrollProgress);
  const scene2Opacity = Math.min(scene2In, scene2Out);
  const scene2Scale = 0.97 + Math.min(0.03, Math.max(0, (scrollProgress - 0.28) * 0.15));

  const scene3Opacity = smoothstep(0.66, 0.72, scrollProgress);

  const currentFrontier = frontiers[selectedFrontierIndex] || frontiers[0];

  return (
    <div
      ref={containerRef}
      className="relative h-[360vh] bg-[#04091a] border-b border-white/[0.12]"
      id="scrollytelling-container"
    >
      {/* ============================================================== */}
      {/* Sticky Pinned Cinematic Canvas Stage                          */}
      {/* ============================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-6 select-none">

        {/* Fullscreen Dynamic Simulation Background Animation */}
        <StoryBackgroundCanvas
          activeScene={activeScene}
          domainKey={currentFrontier.domainKey}
          scrollProgress={scrollProgress}
          onBackgroundClick={handleBackgroundClick}
        />

        {/* Frosted Cobalt & Sapphire Vignette for Cohesive Glass Continuity */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 z-[1]"
          style={{
            background:
              activeScene === 3
                ? 'radial-gradient(ellipse at center, rgba(15, 35, 85, 0.15) 15%, rgba(6, 14, 38, 0.65) 78%, rgba(4, 9, 26, 0.94) 100%)'
                : 'radial-gradient(ellipse at center, rgba(22, 48, 112, 0.18) 25%, rgba(6, 14, 38, 0.72) 82%, rgba(4, 9, 26, 0.95) 100%)',
          }}
        />

        {/* Subtle Frosted Glass Noise Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] mix-blend-overlay opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='storyNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23storyNoise)' opacity='0.07'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ============================================================== */}
        {/* TOP HUD: Cinematic Timeline & Animation Controls              */}
        {/* ============================================================== */}
        <header className="relative z-20 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full pt-1 pb-3 border-b border-white/[0.12] backdrop-blur-md">

          {/* Current Chapter Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.85)]" />
            <div className="font-mono text-xs">
              <span className="text-sky-200/75 uppercase tracking-wider">
                {activeScene === 1 && 'SCENE 01 / MISSION & BROAD HORIZONS'}
                {activeScene === 2 && 'SCENE 02 / DOMAINS, BIO & COLUMNS'}
                {activeScene === 3 && 'SCENE 03 / THE UNCHARTED HORIZON'}
              </span>
            </div>
          </div>

          {/* Interactive Scene Scrubbers (Clickable) */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { idx: 0, label: '01. Vision' },
              { idx: 1, label: '02. Domains & Columns' },
              { idx: 2, label: '03. Uncharted' },
            ].map((sc) => {
              const isActive = activeScene === sc.idx + 1;
              return (
                <button
                  key={sc.idx}
                  onClick={() => jumpToScene(sc.idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#06122e] font-semibold shadow-[0_0_16px_rgba(186,230,253,0.4)]'
                      : 'bg-white/[0.06] text-sky-100/75 hover:text-white border border-white/[0.12] backdrop-blur-md'
                  }`}
                >
                  {sc.label}
                </button>
              );
            })}
          </div>

          {/* Autoplay & Skip Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer border backdrop-blur-md ${
                isAutoPlaying
                  ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.45)]'
                  : 'bg-white/[0.06] text-sky-100/85 hover:text-white border-white/[0.14]'
              }`}
              title="스크롤 없이 애니메이션을 자동으로 감상합니다"
              aria-label={isAutoPlaying ? '인트로 자동 진행 일시정지' : '인트로 자동 진행 시작'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span>일시정지</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>애니메이션 재생</span>
                </>
              )}
            </button>

            <button
              onClick={scrollToArchive}
              className="deepmind-btn-outlined px-3.5 py-1 text-xs font-mono cursor-pointer"
            >
              <span>아카이브 및 칼럼 바로가기</span>
              <ArrowDown className="w-3 h-3 text-sky-200/80" />
            </button>
          </div>

        </header>

        {/* Master Timeline Gauge Bar */}
        <div className="max-w-7xl mx-auto w-full h-[2px] bg-white/[0.10] relative overflow-hidden -mt-1 z-20 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#e0f2fe] transition-all duration-150"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* ============================================================== */}
        {/* MAIN STAGE: 3 Seamlessly Dissolving Scenes                    */}
        {/* ============================================================== */}
        <main className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center py-4 overflow-hidden">

          {/* ------------------------------------------------------------ */}
          {/* SCENE 1: Mission & Broad Horizons                            */}
          {/* ------------------------------------------------------------ */}
          <div
            className="absolute inset-0 flex flex-col justify-center transition-all duration-300 pointer-events-auto transform-gpu"
            style={{
              opacity: scene1Opacity,
              transform: `translateY(${scene1Y}px) scale(${scene1Scale})`,
              pointerEvents: scene1Opacity > 0.4 ? 'auto' : 'none',
              visibility: scene1Opacity <= 0 ? 'hidden' : 'visible',
              willChange: 'opacity, transform',
            }}
          >
            <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.14] backdrop-blur-md text-xs font-mono text-sky-100/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span>OBTEC RESEARCH MISSION & EXPANDING HORIZONS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white font-ui tracking-tight leading-[1.14]">
                Pioneering Deep Technologies. <br />
                <span className="font-normal bg-gradient-to-r from-sky-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
                  Obtec Research의 다학제적 연구 여정.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-sky-100/70 max-w-2xl mx-auto font-light leading-relaxed">
                Obtec Research는 물리학, 컴퓨터 과학, 반도체, 그리고 기타 다양한 분야 및 칼럼(etc.)을 아우르는 독자 연구 논문과 기술 보고서를 발표합니다.
              </p>
            </div>

            {/* 3 Frosted Glass Visual Landmark Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto w-full px-4">
              {[
                {
                  tag: 'INTERDISCIPLINARY SCIENCE',
                  title: '다학제 원천 알고리즘 & 과학 탐구',
                  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
                  color: '#7DD3FC',
                },
                {
                  tag: 'CONVERGENT ARCHITECTURES',
                  title: '반도체·바이오·시스템 융합 설계',
                  image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
                  color: '#93C5FD',
                },
                {
                  tag: 'PAPERS & PERSPECTIVES',
                  title: '학술 논문 & 연구원 인사이트 칼럼',
                  image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
                  color: '#C4B5FD',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="group relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/[0.15] hover:border-sky-300/45 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_40px_rgba(2,6,23,0.6)] bg-[#0a193d]/55 backdrop-blur-xl"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75 contrast-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a1e] via-[#06122e]/45 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span
                      className="text-[10px] font-mono tracking-widest block mb-1 font-semibold"
                      style={{ color: card.color }}
                    >
                      {card.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-medium text-white font-ui">
                      {card.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* SCENE 2: Frontier Domains & Research Columns Deck            */}
          {/* ------------------------------------------------------------ */}
          <div
            className="absolute inset-0 flex flex-col justify-between py-4 px-4 transition-all duration-300 transform-gpu"
            style={{
              opacity: scene2Opacity,
              transform: `scale(${scene2Scale})`,
              pointerEvents: scene2Opacity > 0.4 ? 'auto' : 'none',
              visibility: scene2Opacity <= 0 ? 'hidden' : 'visible',
              willChange: 'opacity, transform',
            }}
          >
            {/* Top Section: Header & Frontier Category Selector */}
            <div className="text-center pt-1 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.14] backdrop-blur-md text-xs font-mono text-sky-100/90 mb-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>02. OBTEC RESEARCH DOMAINS & FRONTIER COLUMNS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white font-ui tracking-tight">
                Obtec Research <span className="font-normal text-sky-200">Frontiers & Columns</span>
              </h2>

              {/* Horizontal Frontier Category Selector Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 max-w-3xl mx-auto w-full px-2">
                {frontiers.map((f, idx) => {
                  const isSelected = selectedFrontierIndex === idx;
                  const IconC = f.icon;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFrontierIndex(idx)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border backdrop-blur-md ${
                        isSelected
                          ? 'bg-white text-[#06122e] font-semibold shadow-[0_0_20px_rgba(186,230,253,0.45)] border-white scale-105'
                          : 'bg-[#081536]/65 text-sky-100/80 hover:text-white border-white/[0.14] hover:border-sky-300/40'
                      }`}
                    >
                      <IconC className={`w-3.5 h-3.5 ${isSelected ? 'text-[#06122e]' : ''}`} style={{ color: isSelected ? undefined : f.color }} />
                      <span>{f.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Floating Frosted Glass HUD Bar */}
            <div className="max-w-4xl mx-auto w-full pb-2 z-10">
              <div className="relative rounded-2xl border border-white/[0.16] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_24px_48px_rgba(2,6,23,0.65)] bg-[#071432]/65 backdrop-blur-2xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 animate-ping"
                    style={{ backgroundColor: currentFrontier.color }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-medium text-white tracking-tight font-ui">
                        {currentFrontier.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-sky-100 border border-white/[0.14]">
                        {currentFrontier.badgeText}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-sky-200/70 font-light mt-0.5">
                      {currentFrontier.subheading}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="hidden md:flex flex-wrap gap-1.5 mr-2">
                    {currentFrontier.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.07] text-sky-100/85 border border-white/[0.12]">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleFrontierExplore(currentFrontier.category)}
                    className="deepmind-btn-outlined px-4 py-1.5 text-xs font-mono cursor-pointer"
                  >
                    <span>분야 탐색</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* SCENE 3: The Uncharted Horizon (Pure Cosmic Philosophy)      */}
          {/* ------------------------------------------------------------ */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 px-4 max-w-4xl mx-auto w-full text-center transform-gpu pointer-events-auto"
            style={{
              opacity: scene3Opacity,
              transform: `scale(${0.94 + Math.min(0.06, (scrollProgress - 0.68) * 0.25)})`,
              pointerEvents: scene3Opacity > 0.4 ? 'auto' : 'none',
              visibility: scene3Opacity <= 0 ? 'hidden' : 'visible',
              willChange: 'opacity, transform',
            }}
          >
            {/* Header Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.16] text-xs font-mono text-sky-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#e0f2fe] animate-ping" />
                <span>03. THE UNCHARTED HORIZON / 미지의 지평선</span>
              </div>
            </div>

            {/* Central Floating Frosted Glass Epigraph Card */}
            {(() => {
              const currentQuote = PHILOSOPHICAL_QUOTES[philosophicalQuoteIndex];
              return (
                <div
                  onClick={() => setPhilosophicalQuoteIndex((prev) => (prev + 1) % PHILOSOPHICAL_QUOTES.length)}
                  className="w-full max-w-2xl p-8 sm:p-10 rounded-3xl bg-[#071536]/55 backdrop-blur-2xl border border-white/[0.16] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.25),0_24px_60px_rgba(2,6,23,0.65)] space-y-4 cursor-pointer hover:border-sky-300/40 transition-all duration-500 group select-none"
                  title="클릭하여 다른 과학철학자의 성찰을 확인하세요"
                >
                  <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed font-ui italic">
                    "{currentQuote.kr}"
                  </blockquote>

                  <p className="text-xs sm:text-sm font-mono text-sky-200/70 font-light pt-1">
                    "{currentQuote.en}"
                  </p>

                  <div className="pt-3 flex items-center justify-center gap-2 text-xs font-mono text-sky-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{currentQuote.author}</span>
                  </div>

                  <div className="text-[10px] font-mono text-sky-200/50 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    (클릭하여 다음 성찰로 전환 · 화면을 클릭해 호기심의 파동을 일으키세요)
                  </div>
                </div>
              );
            })()}

            {/* Final Action Button: Enter Archive */}
            <div className="mt-8">
              <button
                onClick={scrollToArchive}
                className="deepmind-btn-tonal px-8 py-3.5 text-sm font-medium cursor-pointer hover:scale-105 transition-all flex items-center gap-2.5"
              >
                <span>Obtec Research 논문 아카이브 입장</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

          </div>

        </main>

        {/* ============================================================== */}
        {/* BOTTOM STATUS BAR: Scroll Guidance & Scene Tracker             */}
        {/* ============================================================== */}
        <footer className="relative z-20 flex items-center justify-between gap-4 max-w-7xl mx-auto w-full pt-3 pb-1 border-t border-white/[0.12] text-xs font-mono text-sky-200/60">
          <div className="flex items-center gap-2">
            <span className="text-sky-200/80">SCROLL INTERACTION:</span>
            <span>{Math.round(scrollProgress * 100)}%</span>
            <span className="text-white/20">|</span>
            <span className="text-sky-200/80">STAGE {activeScene} OF 3</span>
          </div>

          <div className="flex items-center gap-2">
            {activeScene < 3 ? (
              <span className="animate-pulse text-sky-200/80 flex items-center gap-1">
                <span>계속 스크롤하여 다음 스토리 보기</span>
                <span>↓</span>
              </span>
            ) : (
              <span className="text-sky-300 flex items-center gap-1">
                <span>아카이브 도킹 완료</span>
                <span>✓</span>
              </span>
            )}
          </div>
        </footer>

      </div>
    </div>
  );
};
