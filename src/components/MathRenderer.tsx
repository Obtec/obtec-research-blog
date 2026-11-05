import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  className?: string;
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

    // 4. Fenced Code Block (```lang ... ```)
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

    // 6. Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      const startIdx = i;
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
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
          // Look ahead to see if the next non-empty line continues this list or list item
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
          // Collect indented continuation lines (including fenced code blocks inside list item)
          let inFence = false;
          while (i < lines.length) {
            const subLine = lines[i];
            const subTrim = subLine.trim();
            if (!subTrim) {
              // Check if subsequent non-empty line is still indented under this item
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
    <pre key={key} className="text-red-400 text-xs font-mono p-3 rounded-xl bg-zinc-950 border border-red-500/20">
      {formula}
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
      <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono text-zinc-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Render the 12-Agent Formal Verification Architecture Flowchart from Mermaid syntax
function renderMermaidDiagram(code: string, key: string): React.ReactNode {
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
        <pre className="mt-2 p-3 rounded-xl bg-black/70 border border-white/5 text-[11px] font-mono text-zinc-400 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </details>
    </div>
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
