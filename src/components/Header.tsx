import React from 'react';
import {
  Search,
  Archive,
  X
} from 'lucide-react';
import { ObtecLogo } from './ObtecLogo';

interface HeaderProps {
  currentView: 'home' | 'archive';
  onNavigateToArchive: () => void;
  onGoHome: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateToArchive,
  onGoHome,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="print:hidden fixed top-0 inset-x-0 z-50 w-full bg-[#06122e]/42 backdrop-blur-2xl backdrop-saturate-[140%] border-b border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Left: Obtec Research Brand Identity with Vector Insignia */}
          <div
            role="button"
            tabIndex={0}
            onClick={onGoHome}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onGoHome();
              }
            }}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] rounded-lg p-1"
            title="Obtec Research 메인 홈으로 이동"
            aria-label="Obtec Research 메인 홈으로 이동"
          >
            <div className="flex items-center gap-2.5">
              {/* High-Tech Vector Logo */}
              <ObtecLogo size={30} />

              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold tracking-tight text-white font-ui group-hover:text-sky-200 transition-colors">
                  Obtec Research
                </span>
                {currentView === 'archive' && (
                  <span className="text-sky-200/70 text-xs font-normal font-ui">
                    / Archive
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Frosted Glass Search Bar */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8 hidden md:block">
            <div className="relative group">
              <Search className="h-3.5 w-3.5 text-sky-200/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-sky-300 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="논문, 기술 보고서, 연구원 검색..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-full bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.14] hover:border-white/25 text-white placeholder-sky-100/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)] focus:outline-none focus:border-sky-300/60 focus:bg-white/[0.10] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-sky-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="검색어 초기화"
                  aria-label="검색어 초기화"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Navigation Action */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Archive Nav Button */}
            <button
              onClick={onNavigateToArchive}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-ui flex items-center gap-1.5 text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] ${
                currentView === 'archive'
                  ? 'text-white bg-white/[0.18] font-medium border border-white/30'
                  : 'text-sky-100/90 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.14] hover:border-white/25'
              }`}
            >
              <Archive className="w-3.5 h-3.5 text-sky-300" />
              <span>Archive</span>
            </button>
          </div>

        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="h-3.5 w-3.5 text-sky-200/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="논문, 기술 보고서 검색..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-full bg-white/[0.06] border border-white/[0.14] text-white placeholder-sky-100/45 focus:outline-none focus:border-sky-300/60"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-sky-200/70 hover:text-white"
                title="검색어 초기화"
                aria-label="검색어 초기화"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
