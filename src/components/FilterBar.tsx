import React from 'react';
import { CATEGORIES } from '../data/mockPapers';
import { X } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedType: 'all' | 'paper' | 'report' | 'technical-brief' | 'column';
  onSelectType: (type: 'all' | 'paper' | 'report' | 'technical-brief' | 'column') => void;
  sortBy: 'latest' | 'citations' | 'popular';
  onSortChange: (sort: 'latest' | 'citations' | 'popular') => void;
  selectedTag: string | null;
  onClearTag: () => void;
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
  selectedTag,
  onClearTag,
  totalFilteredCount,
}) => {
  return (
    <div className="mb-12 sm:mb-16">
      {/* Category Pills (OpenAI Clean Minimalist Style) */}
      <div className="flex items-center justify-between gap-4 flex-wrap border-b border-zinc-900 pb-5">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer font-ui ${
                  isSelected
                    ? 'bg-white text-black font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {cat === 'All' ? 'All Topics' : cat}
              </button>
            );
          })}
        </div>

        {/* Secondary: Document Type Pills & Active Tag */}
        <div className="flex items-center gap-2 text-xs">
          {selectedTag && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">
              <span>#{selectedTag}</span>
              <button
                onClick={onClearTag}
                className="hover:text-white transition-colors cursor-pointer ml-0.5"
                title="태그 제거"
                aria-label={`#${selectedTag} 태그 필터 제거`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Quick Type Dropdown or Filter */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectType('all')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer text-xs ${
                selectedType === 'all'
                  ? 'text-white font-medium bg-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => onSelectType('paper')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer text-xs ${
                selectedType === 'paper'
                  ? 'text-sky-300 font-medium bg-sky-950/60'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              논문
            </button>
            <button
              onClick={() => onSelectType('report')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer text-xs ${
                selectedType === 'report'
                  ? 'text-blue-300 font-medium bg-blue-950/60'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              보고서
            </button>
            <button
              onClick={() => onSelectType('column')}
              className={`px-3 py-1 rounded-full transition-colors cursor-pointer text-xs ${
                selectedType === 'column'
                  ? 'text-purple-300 font-medium bg-purple-950/60'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              칼럼
            </button>
          </div>

          {/* Sort Selector */}
          <div className="ml-2 pl-3 border-l border-zinc-900 hidden sm:flex items-center gap-2 text-zinc-400">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'latest' | 'citations' | 'popular')}
              className="bg-black text-zinc-400 text-xs py-1 focus:outline-none focus:text-white cursor-pointer"
              aria-label="논문 목록 정렬 기준"
            >
              <option value="latest">최신순</option>
              <option value="citations">피인용순</option>
              <option value="popular">조회수순</option>
            </select>
            <span className="text-zinc-600 font-mono text-[11px]">
              ({totalFilteredCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
