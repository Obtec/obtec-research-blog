import React, { useState } from 'react';
import { X, Check, Copy, Quote, Download } from 'lucide-react';
import { Paper } from '../types/paper';

interface CitationModalProps {
  paper: Paper | null;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ paper, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bibtex' | 'apa' | 'ieee'>('bibtex');
  const [copied, setCopied] = useState(false);

  if (!paper) return null;

  const ieeeCitation = `${paper.authors.map(a => a.name).join(', ')}, "${paper.title}," ${paper.journalOrConference}, vol. 2026, doi: ${paper.doi}.`;

  const getCitationText = () => {
    switch (activeTab) {
      case 'bibtex':
        return paper.bibtex;
      case 'apa':
        return paper.apaCitation;
      case 'ieee':
        return ieeeCitation;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCitationText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBib = () => {
    const blob = new Blob([paper.bibtex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paper.slug}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-modal-title"
    >
      <div 
        className="w-full max-w-xl rounded-3xl bg-[#0c0e17] p-6 sm:p-8 border border-white/[0.09] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.07] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/[0.06]">
              <Quote className="w-3.5 h-3.5 text-[#8ab4f8]" />
            </div>
            <h3 id="citation-modal-title" className="text-base font-medium text-white font-ui">학술 인용 (Cite Publication)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="인용 창 닫기"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Paper title info */}
        <div className="mb-4">
          <p className="text-[11px] text-slate-500 uppercase font-mono tracking-wider">인용 대상 문서:</p>
          <p className="text-sm font-medium text-white line-clamp-2 mt-0.5">{paper.title}</p>
        </div>

        {/* Format Selector Tabs (Pill Style) */}
        <div className="flex items-center gap-1 mb-4 p-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs">
          <button
            onClick={() => setActiveTab('bibtex')}
            className={`flex-1 py-1.5 rounded-full font-mono transition-all cursor-pointer ${
              activeTab === 'bibtex'
                ? 'bg-white text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            BibTeX
          </button>
          <button
            onClick={() => setActiveTab('apa')}
            className={`flex-1 py-1.5 rounded-full font-mono transition-all cursor-pointer ${
              activeTab === 'apa'
                ? 'bg-white text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            APA 7th
          </button>
          <button
            onClick={() => setActiveTab('ieee')}
            className={`flex-1 py-1.5 rounded-full font-mono transition-all cursor-pointer ${
              activeTab === 'ieee'
                ? 'bg-white text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            IEEE
          </button>
        </div>

        {/* Citation Content Box */}
        <div className="relative mb-5">
          <pre className="w-full text-xs font-mono text-slate-300 bg-black/50 p-4 rounded-2xl border border-white/[0.07] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-60 scrollbar-thin">
            {getCitationText()}
          </pre>
        </div>

        {/* Actions (DeepMind Pill Buttons) */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {activeTab === 'bibtex' && (
            <button
              onClick={handleDownloadBib}
              className="deepmind-btn-outlined px-4 py-2 text-xs font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.bib 다운로드</span>
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              닫기
            </button>
            <button
              onClick={handleCopy}
              className="deepmind-btn-tonal px-5 py-2 text-xs font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료' : '클립보드 복사'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
