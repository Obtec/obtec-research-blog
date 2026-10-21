import React from 'react';
import type { Paper } from '../types/paper';

interface PaperCardProps {
  paper: Paper;
  onSelect: (paper: Paper) => void;
  onOpenCitation: (paper: Paper) => void;
  onSelectTag?: (tag: string) => void;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  onSelect,
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'paper':
        return 'Research Paper';
      case 'report':
        return 'Technical Report';
      case 'column':
        return 'Perspective Column';
      default:
        return 'Publication';
    }
  };

  return (
    <article
      onClick={() => onSelect(paper)}
      className="group cursor-pointer mb-16 sm:mb-24 last:mb-8 select-none"
    >
      {/* 1. Large OpenAI-Style Hero Banner Cover */}
      {paper.coverImage ? (
        <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-2xl sm:rounded-3xl overflow-hidden mb-5 sm:mb-6 bg-zinc-950 border border-white/[0.08] group-hover:border-white/20 transition-all duration-500 shadow-2xl">
          <img
            src={paper.coverImage}
            alt={paper.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 filter brightness-95 contrast-105"
            loading="lazy"
          />
          {/* Subtle inner glass vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        </div>
      ) : (
        /* Fallback Elegant Abstract Mesh Banner if no image */
        <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-2xl sm:rounded-3xl overflow-hidden mb-5 sm:mb-6 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 border border-white/[0.08] flex items-center justify-center">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            {paper.category}
          </span>
        </div>
      )}

      {/* 2. Metadata: Date & Read Time */}
      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-400 mb-2 font-ui font-normal">
        <time dateTime={paper.publishedDate}>{paper.publishedDate}</time>
        <span className="text-zinc-600">•</span>
        <span>{paper.readTimeMinutes} min read</span>
      </div>

      {/* 3. Post Title */}
      <h3 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-white group-hover:text-zinc-300 transition-colors tracking-tight leading-snug mb-2.5 font-ui">
        {paper.title}
      </h3>

      {/* 4. Subtitle / Excerpt */}
      <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mb-3.5 font-ui max-w-4xl">
        {paper.abstract.replace(/\$[^$]+\$/g, '수식')}
      </p>

      {/* 5. Category & Type Badge */}
      <div className="flex items-center gap-2 text-xs sm:text-[13px] text-zinc-400 font-ui">
        <span className="font-medium text-zinc-300 hover:text-white transition-colors">
          {paper.category}
        </span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
          {getTypeLabel(paper.type)}
        </span>
      </div>
    </article>
  );
};
