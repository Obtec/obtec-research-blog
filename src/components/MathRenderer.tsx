import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  className?: string;
}

interface FigurePanelSpec {
  webp?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  subcaption?: string;
}

interface FigureBlockSpec {
  panels: FigurePanelSpec[];
  caption: string;
  columns?: 1 | 2;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  const renderedContent = useMemo(() => {
    if (!content) return null;
    const lines = content.replace(/\r\n/g, '\n').split('\n');
    return parseBlocks(lines, 'root');
  }, [content]);

  return <div className={`academic-prose leading-relaxed space-y-4 ${className}`}>{renderedContent}</div>;
};

// Parse an array of markdown lines into block-level React elements
function parseBlocks(lines: string[], keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Blank line
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Horizontal Rule (---)
    if (/^---+$/.test(trimmed)) {
      nodes.push(<hr key={`${keyPrefix}-hr-${i}`} className="my-8 border-zinc-800/80" />);
      i++;
      continue;
    }

    // 3. Display Math Block ($$ ... $$)
    if (trimmed.startsWith('$$')) {
      if (trimmed.endsWith('$$') && trimmed.length > 4) {
        const formula = trimmed.slice(2, -2).trim();
        nodes.push(renderDisplayMathBlock(formula, `${keyPrefix}-math-${i}`));
        i++;
        continue;
      }
      const mathLines: string[] = [];
      const firstPart = trimmed.slice(2).trim();
      if (firstPart) mathLines.push(firstPart);
      i++;
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (cur.endsWith('$$')) {
          const lastPart = cur.slice(0, -2).trim();
          if (lastPart) mathLines.push(lastPart);
          i++;
          break;
        }
        mathLines.push(lines[i]);
        i++;
      }
      nodes.push(renderDisplayMathBlock(mathLines.join('\n').trim(), `${keyPrefix}-math-${i}`));
      continue;
    }

    // 4. Fenced Code / Diagram / Figure Block (```lang ... ```)
    if (trimmed.startsWith('```')) {
      const baseIndent = rawLine.match(/^\s*/)?.[0].length ?? 0;
      const lang = trimmed.slice(3).trim().toLowerCase();
      const codeLines: string[] = [];
      const startIdx = i;
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        const line = lines[i];
        const stripped =
          baseIndent > 0 && line.slice(0, baseIndent).trim() === ''
            ? line.slice(baseIndent)
            : line;
        codeLines.push(stripped);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      const codeContent = codeLines.join('\n');
      if (lang === 'mermaid') {
        nodes.push(renderMermaidDiagram(codeContent, `${keyPrefix}-mermaid-${startIdx}`));
      } else if (lang === 'figure') {
        nodes.push(renderFigureBlock(codeContent, `${keyPrefix}-figure-${startIdx}`));
      } else {
        nodes.push(renderCodeBlock(codeContent, lang, `${keyPrefix}-code-${startIdx}`));
      }
      continue;
    }

    // 5. Subheadings (### or ####)
    if (trimmed.startsWith('#### ')) {
      nodes.push(
        <h4
          key={`${keyPrefix}-h4-${i}`}
          className="text-base sm:text-lg font-medium text-white tracking-tight mt-6 mb-2.5 font-ui"
        >
          {renderInlineMathAndFormatting(trimmed.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      nodes.push(
        <h3
          key={`${keyPrefix}-h3-${i}`}
          className="text-lg sm:text-xl font-medium text-white tracking-tight mt-8 mb-3 font-ui"
        >
          {renderInlineMathAndFormatting(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // 6. Blockquote or GFM Callout Alert (> [!NOTE|TIP|IMPORTANT|WARNING] Title)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      const startIdx = i;
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }

      const alertMatch = quoteLines[0]?.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING)\]\s*(.*)$/i);
      if (alertMatch) {
        const kind = alertMatch[1].toUpperCase();
        const title = alertMatch[2].trim();
        const bodyLines = quoteLines.slice(1);
        nodes.push(renderCalloutBox(kind, title, bodyLines, `${keyPrefix}-alert-${startIdx}`));
        continue;
      }

      nodes.push(
        <blockquote
          key={`${keyPrefix}-quote-${startIdx}`}
          className="my-5 pl-4 sm:pl-5 pr-4 py-3.5 rounded-r-2xl border-l-2 border-sky-400/80 bg-zinc-900/60 text-zinc-200 space-y-1.5 text-sm sm:text-[16px] leading-relaxed"
        >
          {quoteLines.map((ql, qIdx) =>
            ql.trim() ? (
              <div key={`${keyPrefix}-ql-${startIdx}-${qIdx}`}>
                {renderInlineMathAndFormatting(ql)}
              </div>
            ) : (
              <div key={`${keyPrefix}-ql-${startIdx}-${qIdx}`} className="h-2" />
            )
          )}
        </blockquote>
      );
      continue;
    }

    // 7. Markdown Table (Header row starting with | followed by separator row | --- |)
    if (
      trimmed.startsWith('|') &&
      i + 1 < lines.length &&
      /^\|\s*:?-{3,}:?\s*\|/.test(lines[i + 1].trim())
    ) {
      const tableLines: string[] = [];
      const startIdx = i;
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      nodes.push(renderMarkdownTable(tableLines, `${keyPrefix}-table-${startIdx}`));
      continue;
    }

    // 8. Ordered or Unordered Lists (supporting nested sub-blocks, code blocks, and blockquotes)
    const listMatch = rawLine.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const baseIndent = listMatch[1].length;
      const isOrdered = /^\d+\./.test(listMatch[2]);
      const items: { head: string; subLines: string[] }[] = [];
      const startIdx = i;

      while (i < lines.length) {
        const curLine = lines[i];
        if (!curLine.trim()) {
          let nextNonEmpty = i + 1;
          while (nextNonEmpty < lines.length && !lines[nextNonEmpty].trim()) {
            nextNonEmpty++;
          }
          if (nextNonEmpty >= lines.length) break;
          const nextLine = lines[nextNonEmpty];
          const nextIndent = nextLine.match(/^\s*/)?.[0].length ?? 0;
          const nextItemMatch = nextLine.match(/^(\s*)([-*]|\d+\.)\s+/);
          const sameLevelContinuation =
            nextItemMatch &&
            nextItemMatch[1].length === baseIndent &&
            (/^\d+\./.test(nextItemMatch[2]) === isOrdered);
          if (nextIndent > baseIndent || sameLevelContinuation) {
            if (items.length > 0 && nextIndent > baseIndent) {
              items[items.length - 1].subLines.push('');
            }
            i++;
            continue;
          }
          break;
        }

        const itemMatch = curLine.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (
          itemMatch &&
          itemMatch[1].length === baseIndent &&
          (/^\d+\./.test(itemMatch[2]) === isOrdered)
        ) {
          items.push({ head: itemMatch[3], subLines: [] });
          i++;
          let inFence = false;
          while (i < lines.length) {
            const subLine = lines[i];
            const subTrim = subLine.trim();
            if (!subTrim) {
              let look = i + 1;
              while (look < lines.length && !lines[look].trim()) look++;
              if (look < lines.length) {
                const lookIndent = lines[look].match(/^\s*/)?.[0].length ?? 0;
                if (inFence || lookIndent > baseIndent) {
                  items[items.length - 1].subLines.push('');
                  i++;
                  continue;
                }
              }
              break;
            }
            const subIndent = subLine.match(/^\s*/)?.[0].length ?? 0;
            if (!inFence && subIndent <= baseIndent) {
              break;
            }
            if (subTrim.startsWith('```')) {
              inFence = !inFence;
            }
            const stripAmount = Math.min(baseIndent + 2, subIndent);
            items[items.length - 1].subLines.push(subLine.slice(stripAmount));
            i++;
          }
          continue;
        }
        break;
      }

      const ListTag = isOrdered ? 'ol' : 'ul';
      const listClass = isOrdered
        ? 'list-decimal list-outside space-y-2.5 my-3.5 pl-5 text-zinc-300'
        : 'list-disc list-outside space-y-2.5 my-3.5 pl-5 text-zinc-300';

      nodes.push(
        <ListTag key={`${keyPrefix}-list-${startIdx}`} className={listClass}>
          {items.map((item, idx) => (
            <li key={`${keyPrefix}-li-${startIdx}-${idx}`} className="leading-[1.78] pl-1">
              <div>{renderInlineMathAndFormatting(item.head)}</div>
              {item.subLines.length > 0 && (
                <div className="mt-2 space-y-2.5">
                  {parseBlocks(item.subLines, `${keyPrefix}-li-${startIdx}-${idx}-sub`)}
                </div>
              )}
            </li>
          ))}
        </ListTag>
      );
      continue;
    }

    // 9. Standard Paragraph
    const paraLines: string[] = [];
    const startIdx = i;
    while (i < lines.length) {
      const l = lines[i];
      const t = l.trim();
      if (
        !t ||
        /^---+$/.test(t) ||
        t.startsWith('$$') ||
        t.startsWith('```') ||
        t.startsWith('### ') ||
        t.startsWith('#### ') ||
        t.startsWith('>') ||
        (t.startsWith('|') &&
          i + 1 < lines.length &&
          /^\|\s*:?-{3,}:?\s*\|/.test(lines[i + 1].trim())) ||
        /^(\s*)([-*]|\d+\.)\s+/.test(l)
      ) {
        break;
      }
      paraLines.push(t);
      i++;
    }

    if (paraLines.length > 0) {
      nodes.push(
        <p
          key={`${keyPrefix}-p-${startIdx}`}
          className="text-zinc-300 leading-[1.82] text-base sm:text-[17px]"
        >
          {paraLines.map((pl, pIdx) => (
            <React.Fragment key={pIdx}>
              {pIdx > 0 && <br />}
              {renderInlineMathAndFormatting(pl)}
            </React.Fragment>
          ))}
        </p>
      );
    }
  }

  return nodes;
}

function renderCalloutBox(
  kind: string,
  title: string,
  bodyLines: string[],
  key: string
): React.ReactNode {
  const palette: Record<string, { border: string; bg: string; titleColor: string }> = {
    WARNING: {
      border: 'border-amber-400/40 border-l-4 border-l-amber-400',
      bg: 'bg-amber-950/20',
      titleColor: 'text-amber-300',
    },
    TIP: {
      border: 'border-emerald-400/40 border-l-4 border-l-emerald-400',
      bg: 'bg-emerald-950/20',
      titleColor: 'text-emerald-300',
    },
    IMPORTANT: {
      border: 'border-sky-400/40 border-l-4 border-l-sky-400',
      bg: 'bg-sky-950/25',
      titleColor: 'text-sky-300',
    },
    NOTE: {
      border: 'border-sky-400/35 border-l-4 border-l-sky-400',
      bg: 'bg-zinc-900/70',
      titleColor: 'text-sky-200',
    },
  };
  const style = palette[kind] || palette.NOTE;

  return (
    <aside
      key={key}
      aria-label={title || kind}
      className={`my-6 p-5 rounded-2xl border ${style.border} ${style.bg} space-y-2.5`}
    >
      {title && (
        <div className={`text-sm sm:text-base font-semibold tracking-tight font-ui ${style.titleColor}`}>
          {renderInlineMathAndFormatting(title)}
        </div>
      )}
      <div className="text-sm sm:text-[15.5px] text-zinc-200 leading-relaxed space-y-2">
        {parseBlocks(bodyLines, `${key}-body`)}
      </div>
    </aside>
  );
}

function renderFigureBlock(jsonText: string, key: string): React.ReactNode {
  let spec: FigureBlockSpec | null = null;
  try {
    spec = JSON.parse(jsonText) as FigureBlockSpec;
  } catch (err) {
    console.error('Invalid figure JSON block:', err);
  }

  if (!spec || !Array.isArray(spec.panels) || spec.panels.length === 0) {
    return null;
  }

  const isTwoCol = (spec.columns ?? (spec.panels.length > 1 ? 2 : 1)) === 2;

  return (
    <figure
      key={key}
      className="my-8 p-4 sm:p-5 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-2xl space-y-4"
    >
      <div className={isTwoCol ? 'grid grid-cols-1 md:grid-cols-2 gap-4 items-end' : 'space-y-4'}>
        {spec.panels.map((panel, idx) => (
          <div key={idx} className="space-y-2">
            <div className="rounded-xl overflow-hidden bg-white p-2 border border-white/10">
              <picture>
                {panel.webp && <source srcSet={panel.webp} type="image/webp" />}
                <img
                  src={panel.src}
                  alt={panel.alt}
                  width={panel.width}
                  height={panel.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block rounded-lg"
                />
              </picture>
            </div>
            {panel.subcaption && (
              <div className="text-center text-xs text-zinc-400 font-ui">
                {renderInlineMathAndFormatting(panel.subcaption)}
              </div>
            )}
          </div>
        ))}
      </div>
      <figcaption className="pt-2 border-t border-white/10 text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed font-ui">
        {renderInlineMathAndFormatting(spec.caption)}
      </figcaption>
    </figure>
  );
}

function renderDisplayMathBlock(formula: string, key: string): React.ReactNode {
  const html = renderKatex(formula, true);
  if (html !== null) {
    return (
      <div
        key={key}
        className="my-6 overflow-x-auto py-3.5 px-5 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-inner text-sky-200"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <pre
      key={key}
      tabIndex={0}
      className="text-red-400 text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-red-500/20"
    >
      <code>{formula}</code>
    </pre>
  );
}

function renderCodeBlock(code: string, lang: string, key: string): React.ReactNode {
  const label = lang ? lang.toUpperCase() : 'CODE';
  return (
    <div
      key={key}
      className="my-5 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-xl"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.08] text-[11px] font-mono text-zinc-400">
        <span>{label}</span>
      </div>
      <pre
        tabIndex={0}
        className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono text-zinc-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-400/50"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Render bespoke dark-glass architecture diagrams from Mermaid blocks
function renderMermaidDiagram(code: string, key: string): React.ReactNode {
  if (code.includes('GravNet') && code.includes('Plummer')) {
    return renderGravNetPipelineDiagram(key);
  }
  if (code.includes('Backpropagation') && code.includes('TWEANN')) {
    return renderDlVsTweannDiagram(key);
  }
  if (code.includes('Net2Wider') && code.includes('Speciation')) {
    return renderTweannOperatorsDiagram(key);
  }

  return (
    <div
      key={key}
      className="my-8 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-white/12 shadow-2xl space-y-4"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-sky-300">
          Architecture Flowchart · 12-Agent Gemini 3.8 Flash Verification Pipeline
        </span>
        <span className="text-[11px] font-mono text-zinc-500">/teamwork Multi-Agent Audit</span>
      </div>

      {/* Top Chain: User -> Main Architect -> Interviewer -> Orchestrator */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/10">
          <div className="font-medium text-white mb-0.5">👤 인간 연구자 (User)</div>
          <div className="text-zinc-400 text-[11px]">1. 초기 설계 &amp; /teamwork 지시</div>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-sky-500/30">
          <div className="font-medium text-sky-200 mb-0.5">🤖 Main Architect</div>
          <div className="text-zinc-400 text-[11px]">Gemini 3.8 Flash · 초기 증명 구축 및 브리핑 중계</div>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-sky-500/30">
          <div className="font-medium text-sky-200 mb-0.5">🎙️ Interviewer Agent</div>
          <div className="text-zinc-400 text-[11px]">Gemini 3.8 Flash · 요구사항 구체화 및 스펙 확정</div>
        </div>
        <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-400/40">
          <div className="font-medium text-white mb-0.5">🧭 Project Orchestrator</div>
          <div className="text-sky-200/80 text-[11px]">Gemini 3.8 Flash · 파이프라인 총괄 지휘</div>
        </div>
      </div>

      {/* Phase 0 */}
      <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2.5">
        <div className="text-xs font-mono text-sky-300 font-medium">
          Phase 0: 병렬 코드-수식 대조 감사 (Parallel Survey)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/10">
            <div className="font-medium text-zinc-100">🔍 Explorer 1 (Gemini 3.8 Flash)</div>
            <div className="text-zinc-400 text-[11px] font-mono mt-0.5">Lean 4 vs manager.py</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/10">
            <div className="font-medium text-zinc-100">🔍 Explorer 2 (Gemini 3.8 Flash)</div>
            <div className="text-zinc-400 text-[11px] font-mono mt-0.5">Z3 Network vs network.py</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/10">
            <div className="font-medium text-zinc-100">🔍 Explorer 3 (Gemini 3.8 Flash)</div>
            <div className="text-zinc-400 text-[11px] font-mono mt-0.5">Z3 Security vs security.py</div>
          </div>
        </div>
      </div>

      {/* Phase 1 */}
      <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
        <div className="text-xs font-mono text-amber-300 font-medium">
          Phase 1: 수식 교정 및 정리 확장 (Remediation)
        </div>
        <div className="p-3 rounded-lg bg-zinc-950 border border-amber-400/25 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-medium text-white">🛠️ Verification Worker M1 (Gemini 3.8 Flash)</span>
            <span className="text-zinc-400 ml-2">Lean 4 귀납 폐포 증명 &amp; Z3 모델 정밀화</span>
          </div>
          <span className="font-mono text-[11px] text-amber-300">→ 교정된 증명 + AUDIT_REPORT.md</span>
        </div>
      </div>

      {/* Phase 2 */}
      <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2.5">
        <div className="text-xs font-mono text-rose-300 font-medium">
          Phase 2: 적대적 검증 게이트 (5-Agent Adversarial Gate)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/10">
            <div className="font-medium text-zinc-100">📋 Reviewer 1</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Lean 4 &amp; 상태 머신 감사</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/10">
            <div className="font-medium text-zinc-100">📋 Reviewer 2</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">Z3 네트워크 &amp; 보안 감사</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-rose-500/25">
            <div className="font-medium text-rose-200">⚔️ Challenger 1</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">124개 SMT 공격 쿼리 폭격</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-rose-500/25">
            <div className="font-medium text-rose-200">⚔️ Challenger 2</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">100,000회 상태 전이 퍼징</div>
          </div>
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/10">
            <div className="font-medium text-zinc-100">🕵️ Forensic Auditor</div>
            <div className="text-zinc-400 text-[11px] mt-0.5">무공리/무sorry 포렌식</div>
          </div>
        </div>
      </div>

      {/* Phase 3 */}
      <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <div className="font-mono text-emerald-300 font-medium mb-0.5">
            Phase 3: 클린룸 최종 승인 (Clean-Room Victory Audit)
          </div>
          <div className="text-zinc-200">
            🏆 <strong>Independent Victory Auditor (Gemini 3.8 Flash)</strong> — Zero-Context 독립 재실행 및 최종 판정
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 font-mono text-emerald-300 font-semibold shrink-0">
          VICTORY CONFIRMED
        </span>
      </div>

      <details className="pt-1">
        <summary className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer">
          Mermaid 원본 다이어그램 코드 보기
        </summary>
        <pre
          tabIndex={0}
          className="mt-2 p-3 rounded-xl bg-black/70 border border-white/5 text-[11px] font-mono text-zinc-400 overflow-x-auto"
        >
          <code>{code}</code>
        </pre>
      </details>
    </div>
  );
}

// Figure 4: Classical Backpropagation DL vs. Neuroevolution / TWEANN Paradigm Comparison
function renderDlVsTweannDiagram(key: string): React.ReactNode {
  return (
    <figure
      key={key}
      className="my-8 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-2xl space-y-5"
    >
      {/* Row 1: Backpropagation */}
      <div className="space-y-2.5">
        <div className="text-xs sm:text-sm font-semibold text-rose-300 font-ui">
          1) 정통 딥러닝 (Backpropagation — “오답 노트를 미분하는 모범생”)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-400/30">
            <div className="font-semibold text-white mb-0.5">단일 고정 신경망</div>
            <div className="text-zinc-300 text-[11px]">인간이 (64, 32) 설계</div>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-400/30">
            <div className="font-semibold text-white mb-0.5">대리 손실함수 계산</div>
            <div className="text-zinc-300 text-[11px]">Cross-Entropy (미분 필수)</div>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-400/30">
            <div className="font-semibold text-white mb-0.5">역전파 기울기 계산</div>
            <div className="text-zinc-300 text-[11px]">
              {renderInlineMathAndFormatting('$\\nabla_{\\boldsymbol{\\theta}} \\mathcal{L}$ 연쇄법칙 미분')}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-400/30">
            <div className="font-semibold text-white mb-0.5">가중치 조금씩 수정</div>
            <div className="text-zinc-300 text-[11px]">
              {renderInlineMathAndFormatting('$\\boldsymbol{\\theta} \\leftarrow \\boldsymbol{\\theta} - \\eta \\nabla_{\\boldsymbol{\\theta}} \\mathcal{L}$')}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: TWEANN Neuroevolution */}
      <div className="space-y-2.5">
        <div className="text-xs sm:text-sm font-semibold text-sky-300 font-ui">
          2) 진화 신경망 (Neuroevolution / TWEANN — “돌연변이와 적자생존의 생태계”)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-400/35">
            <div className="font-semibold text-white mb-0.5">8개 섬(Island) 생태계</div>
            <div className="text-zinc-300 text-[11px]">서로 다른 초기 뇌 구조</div>
          </div>
          <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-400/35">
            <div className="font-semibold text-white mb-0.5">뇌 구조 &amp; 가중치 변이</div>
            <div className="text-zinc-300 text-[11px]">층 증식·뉴런 확장·교배</div>
          </div>
          <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-400/35">
            <div className="font-semibold text-white mb-0.5">진짜 목표 직접 채점</div>
            <div className="text-zinc-300 text-[11px]">비미분 Macro-F1 평가</div>
          </div>
          <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-400/35">
            <div className="font-semibold text-white mb-0.5">적자생존 &amp; 다음 세대</div>
            <div className="text-zinc-300 text-[11px]">최고 적합도 종만 생존</div>
          </div>
        </div>
      </div>

      <figcaption className="pt-2 border-t border-white/10 text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed font-ui">
        <strong>Figure 4:</strong> 정통 역전파 딥러닝(DL)과 진화 신경망(EDL/TWEANN)의 학습 원리 비교. 역전파는 미분 가능한 대리 손실함수를 필요로 하지만, 진화 신경망은 미분 불가능한 실제 목표 지표(Macro-F1)를 직접 적합도(Fitness)로 삼아 가중치와 뇌 구조를 함께 진화시킵니다.
      </figcaption>
    </figure>
  );
}

// Figure 5: TWEANN 6 Function-Preserving Net2Net Operators & Speciation Protection
function renderTweannOperatorsDiagram(key: string): React.ReactNode {
  const operators = [
    {
      title: '1. Net2Wider 뉴런 확장',
      desc: '기존 뉴런 복제 및 출력 가중치 $\\frac{1}{2}$ 분할',
    },
    {
      title: '2. Net2Deeper 은닉층 증식',
      desc: '항등 행렬($\\mathbf{W} \\approx \\mathbf{I}$) 기반 신규 층 삽입',
    },
    {
      title: '3. 입력 스킵 고속도로 (+skip)',
      desc: '원본 10차원 별빛 특성을 깊은 층에 직결',
    },
    {
      title: '4. 활성화 함수 진화',
      desc: '층별로 ReLU / GELU / SiLU / ELU 교체',
    },
    {
      title: '5. 뉴런 & 시냅스 가지치기',
      desc: '$\\ell_1$ 중요도 하위 뉴런·미세 시냅스 제거',
    },
    {
      title: '6. 이종 뇌 구조 간 상동 교배',
      desc: '서로 다른 위상 간 공통 서브행렬 교차',
    },
  ];

  return (
    <figure
      key={key}
      className="my-8 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-2xl space-y-4"
    >
      {/* Parent Genome Header */}
      <div className="p-3.5 rounded-xl bg-sky-950/45 border border-sky-400/40 text-center text-xs sm:text-sm font-semibold text-white">
        {renderInlineMathAndFormatting(
          '부모 신경망 개체 (Parent Topology Genome $\\mathcal{G}_{\\text{topo}}$ & Weights $\\boldsymbol{\\theta}$)'
        )}
      </div>

      {/* 6 Operators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        {operators.map((op, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-zinc-900/90 border border-sky-400/25 space-y-1">
            <div className="font-semibold text-sky-200">{op.title}</div>
            <div className="text-zinc-300 text-[11.5px] leading-snug">
              {renderInlineMathAndFormatting(op.desc)}
            </div>
          </div>
        ))}
      </div>

      {/* Speciation Protection Box */}
      <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-400/35 text-center space-y-1">
        <div className="text-xs sm:text-sm font-semibold text-emerald-300">
          종 분화 보호 (Speciation Protection) &amp; 적자생존 검증
        </div>
        <div className="text-xs text-zinc-200">
          짧은 국소 적응 (20 미니배치) + 결정 경계 ES 조율 후, <strong>검증 Macro-F1이 부모를 능가하면 새로운 종(Topology)으로 진화 확정!</strong>
        </div>
      </div>

      <figcaption className="pt-2 border-t border-white/10 text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed font-ui">
        <strong>Figure 5:</strong> TWEANN의 6가지 함수 보존형 뇌 구조 진화 연산자와 종 분화 보호 흐름도. 뉴런을 복제할 때 가중치를 절반씩 나누고(Net2Wider), 새 층을 추가할 때 항등 행렬로 초기화(Net2Deeper)하여 뇌 구조 변화 직후에도 기존 지식을 잃지 않습니다.
      </figcaption>
    </figure>
  );
}

// Figure 1 (GravNet): 4-Stage Physical Inference & Zero-BPTT Tidal Plasticity Architecture
function renderGravNetPipelineDiagram(key: string): React.ReactNode {
  return (
    <figure
      key={key}
      className="my-8 p-5 sm:p-6 rounded-2xl bg-zinc-950/90 border border-white/10 shadow-2xl space-y-4"
    >
      {/* 4-Stage Forward Physical Trajectory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/15 space-y-1.5 flex flex-col justify-between">
          <div className="font-semibold text-white text-[12.5px]">1. 천체 관측 입력</div>
          <div className="text-zinc-200">
            {renderInlineMathAndFormatting('$\\mathbf{x} \\in \\mathbb{R}^{10}$')}
          </div>
          <div className="text-zinc-400 text-[11px] leading-snug">
            {renderInlineMathAndFormatting('($u, g, r, i, z$, 색지수 4종, $z$)')}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-400/35 space-y-1.5 flex flex-col justify-between">
          <div className="font-semibold text-amber-200 text-[12.5px]">2. 다중 해상도 분광 렌즈</div>
          <div className="text-zinc-200">
            {renderInlineMathAndFormatting('$\\Phi(\\mathbf{x}) \\in \\mathbb{R}^{3826}$')}
          </div>
          <div className="text-zinc-300 text-[11px] leading-snug">
            {renderInlineMathAndFormatting('1D 도플러 파동 + 10D 푸리에<br>원점 발사 $\\mathbf{q}_{\\text{orb}}(0) = (0, 0)$')}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-400/35 space-y-1.5 flex flex-col justify-between">
          <div className="font-semibold text-sky-200 text-[12.5px]">3. 플러머 중력장 궤도 적분</div>
          <div className="text-zinc-200">
            {renderInlineMathAndFormatting('$\\mathbf{F}_{\\text{grav}}(\\mathbf{q}) = -\\nabla_{\\mathbf{q}} U(\\mathbf{q})$')}
          </div>
          <div className="text-zinc-300 text-[11px] leading-snug">
            {renderInlineMathAndFormatting('18개 헤일로 + 허블 감쇠 $\\gamma > 0$<br>심플렉틱 리프프로그 ($T = 10$)')}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-400/35 space-y-1.5 flex flex-col justify-between">
          <div className="font-semibold text-emerald-200 text-[12.5px]">
            {renderInlineMathAndFormatting('4. 우물 포획 & $L_1$ 진단')}
          </div>
          <div className="text-zinc-200">
            {renderInlineMathAndFormatting('$P(c \\mid \\mathbf{q}_T) \\propto e^{-\\beta U_c + \\nu_c}$')}
          </div>
          <div className="text-zinc-300 text-[11px] leading-snug">
            {renderInlineMathAndFormatting('초은하단 포획 판정 및<br>라그랑주 장벽 $\\Delta E_{L_1}$ 산출')}
          </div>
        </div>
      </div>

      {/* Zero-BPTT Terminal Tidal Plasticity Feedback Loop */}
      <div className="p-3.5 rounded-xl bg-rose-950/20 border border-dashed border-rose-400/45 text-center space-y-1">
        <div className="text-xs font-semibold text-rose-300 font-ui">
          <span aria-hidden="true">↺ </span>
          {renderInlineMathAndFormatting(
            '무-BPTT 시공간 질량·헤일로 조각 ($\\Delta G_{c,m}, \\Delta \\boldsymbol{\\mu}_{c,m}$) 및 종착 조석력 헤비안 가소성 ($\\mathbf{f}_{\\text{tidal}}$)'
          )}
        </div>
        <div className="text-[11px] text-zinc-300">
          {renderInlineMathAndFormatting(
            '시간 역전파(BPTT) 없이 종착 볼츠만 포획 잔차 $r_c = \\mathbb{I}[c = y] - P(c \\mid \\mathbf{q}_T)$만으로 3단계 중력원($G_{c,m}, \\boldsymbol{\\mu}_{c,m}$)과 2단계 발사 렌즈($\\mathbf{W}_p$)를 직접 조각'
          )}
        </div>
      </div>

      <figcaption className="pt-2 border-t border-white/10 text-xs sm:text-[13.5px] text-zinc-300 leading-relaxed font-ui">
        <strong>Figure 1:</strong> GravNet의 4단계 물리 추론 및 무역전파(Zero-BPTT) 조석 학습 아키텍처 개요도.
      </figcaption>
    </figure>
  );
}

// Split a markdown table row by '|' while ignoring '|' inside $...$ or `...`
function splitTableCells(row: string): string[] {
  let trimmed = row.trim();
  if (trimmed.startsWith('|')) trimmed = trimmed.slice(1);
  if (trimmed.endsWith('|')) trimmed = trimmed.slice(0, -1);

  const cells: string[] = [];
  let current = '';
  let inMath = false;
  let inCode = false;

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === '`' && !inMath) {
      inCode = !inCode;
      current += ch;
    } else if (ch === '$' && !inCode) {
      inMath = !inMath;
      current += ch;
    } else if (ch === '|' && !inMath && !inCode) {
      cells.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

// Render markdown table with keyboard-scrollable region and sticky header
function renderMarkdownTable(lines: string[], key: string): React.ReactNode {
  const headers = splitTableCells(lines[0]);
  const rows = lines.slice(2).map((row) => splitTableCells(row));
  const captionLabel = headers.join(', ') || '데이터 표';

  return (
    <div
      key={key}
      tabIndex={0}
      role="region"
      aria-label={captionLabel}
      className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/80 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400/50"
    >
      <table className="w-full text-left border-separate border-spacing-0 text-xs sm:text-sm">
        <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-md">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="py-3 px-4 font-semibold text-zinc-100 tracking-wide border-b border-white/10 whitespace-nowrap"
              >
                {renderInlineMathAndFormatting(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((r, rIdx) => (
            <tr key={rIdx} className="hover:bg-white/[0.03] transition-colors">
              {r.map((cell, cIdx) =>
                cIdx === 0 ? (
                  <th
                    key={cIdx}
                    scope="row"
                    className="py-3 px-4 text-zinc-200 font-medium border-b border-white/5 align-top whitespace-nowrap bg-zinc-950/90"
                  >
                    {renderInlineMathAndFormatting(cell)}
                  </th>
                ) : (
                  <td
                    key={cIdx}
                    className="py-3 px-4 text-zinc-300 border-b border-white/5 align-top leading-relaxed"
                  >
                    {renderInlineMathAndFormatting(cell)}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Render inline math ($...$), links ([...](...)), inline code (`...`), bold (**...**), italic (*...*), and <br>
function renderInlineMathAndFormatting(text: string): React.ReactNode {
  if (!text) return null;

  const tokenRegex =
    /(<br\s*\/?>|\$[^$\n]+\$|\[[^\]]+\]\([^)]+\)|`[^`\n]+`|\*\*\*[\s\S]+?\*\*\*|\*\*(?:(?!\*\*)[^`\n]|`[^`\n]+`)+\*\*|\*(?!\*)(?:[^*`\n]|`[^`\n]+`|\*\*[^*\n]+\*\*)+?\*)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `tok-${match.index}`;

    if (/^<br\s*\/?>$/i.test(token)) {
      parts.push(<br key={key} />);
    } else if (token.startsWith('$') && token.endsWith('$') && token.length > 2) {
      const formula = token.slice(1, -1);
      const html = renderKatex(formula, false);
      if (html === null) {
        parts.push(
          <code key={key} className="text-sky-300 font-mono text-xs">
            {token}
          </code>
        );
      } else {
        parts.push(
          <span
            key={key}
            className="inline-math font-serif text-sky-200 px-1 py-0.5 rounded bg-sky-950/30"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    } else if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      parts.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.08] text-sky-200 font-mono text-[0.88em]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isExternal = /^https?:\/\//i.test(href);
        parts.push(
          <a
            key={key}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-sky-300 hover:text-sky-200 underline decoration-sky-400/40 hover:decoration-sky-300 underline-offset-4 transition-colors"
          >
            {renderInlineMathAndFormatting(label)}
          </a>
        );
      } else {
        parts.push(token);
      }
    } else if (token.startsWith('***') && token.endsWith('***') && token.length > 6) {
      parts.push(
        <strong key={key} className="font-semibold text-white italic">
          {renderInlineMathAndFormatting(token.slice(3, -3))}
        </strong>
      );
    } else if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      parts.push(
        <strong key={key} className="font-semibold text-white">
          {renderInlineMathAndFormatting(token.slice(2, -2))}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
      parts.push(
        <em key={key} className="italic text-zinc-200">
          {renderInlineMathAndFormatting(token.slice(1, -1))}
        </em>
      );
    } else {
      parts.push(token);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// Render a LaTeX formula to an HTML string. Returns null if KaTeX throws.
function renderKatex(formula: string, displayMode: boolean): string | null {
  try {
    return katex.renderToString(formula, { displayMode, throwOnError: false });
  } catch (err) {
    console.error('KaTeX rendering error:', err);
    return null;
  }
}
