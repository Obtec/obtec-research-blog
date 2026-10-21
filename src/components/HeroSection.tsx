import React from 'react';
import { ChevronDown } from 'lucide-react';
import { BoidsBackgroundCanvas } from './ThreeMetallicCore';
import type { Paper } from '../types/paper';

interface HeroSectionProps {
  featuredPaper?: Paper | null;
  onSelectPaper: (paper: Paper) => void;
  totalPapersCount: number;
  onSelectCategory?: (category: string) => void;
  onNavigateToArchive?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative w-full min-h-screen h-[100dvh] overflow-hidden flex items-center justify-center border-b border-white/[0.14] bg-[#040a1e]">
      {/* 1. Deep Cobalt, Midnight Navy & Luminous Sky-Blue Base Lighting (Behind the Glass) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base multi-directional gradient matching the reference image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(112deg, #162d6e 0%, #17347c 36%, #1c449e 64%, #387ef2 86%, #66b2ff 100%)',
          }}
        />

        {/* Deep Midnight Navy Shadow Pool (Bottom-Left to Center-Bottom) */}
        <div
          className="absolute -bottom-24 -left-20 w-[75%] h-[85%] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 22% 82%, #020513 0%, #050d28 38%, rgba(10, 24, 66, 0.65) 65%, transparent 90%)',
            filter: 'blur(55px)',
          }}
        />

        {/* Bright Luminous Azure / Sky-Blue Glow (Right & Top-Right) */}
        <div
          className="absolute -top-16 -right-16 w-[58%] h-[115%] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 88% 38%, rgba(125, 211, 252, 0.72) 0%, rgba(59, 130, 246, 0.52) 42%, rgba(29, 78, 216, 0.15) 72%, transparent 90%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Soft Cobalt Atmosphere (Top-Left) */}
        <div
          className="absolute -top-12 left-0 w-[55%] h-[65%]"
          style={{
            background:
              'radial-gradient(ellipse at 25% 15%, rgba(45, 85, 175, 0.65) 0%, rgba(22, 45, 110, 0.25) 60%, transparent 85%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      {/* 2. Full-Bleed Frosted Matte Glass Surface (Covers 100% of the Viewport) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none backdrop-blur-[44px] backdrop-saturate-[135%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 5%, rgba(15, 35, 85, 0.14) 52%, rgba(4, 10, 30, 0.28) 100%)',
          boxShadow:
            'inset 0 1.5px 1px rgba(255, 255, 255, 0.32), inset 0 18px 36px -8px rgba(186, 230, 253, 0.18), inset 0 -1px 1px rgba(255, 255, 255, 0.08)',
        }}
      />

      {/* 3. Full-Bleed Fine Frosted Glass Grain & Refraction Texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-overlay opacity-75"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='frostedGlassNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23frostedGlassNoise)' opacity='0.095'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 4. Micro-Particle BOIDS Flocking Layer Across the Full-Screen Glass Surface */}
      <div className="absolute inset-0 z-[3] overflow-hidden">
        <BoidsBackgroundCanvas />
      </div>

      {/* 5. Centered Hero Title: Obtec Research */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-[-0.03em] text-white font-ui leading-none select-none drop-shadow-[0_6px_28px_rgba(2,6,23,0.45)]">
          Obtec Research
        </h1>
      </div>

      {/* 6. Subtle Frosted Glass Scroll Trigger to Blog Section */}
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById('blog-feed-section') || document.getElementById('paper-archive-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.16] backdrop-blur-xl text-[11px] font-mono text-sky-100/80 hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] transition-all cursor-pointer group"
        aria-label="연구 블로그 섹션으로 스크롤"
      >
        <span className="tracking-widest uppercase">RESEARCH BLOG</span>
        <ChevronDown className="w-3.5 h-3.5 text-sky-200 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </section>
  );
};
