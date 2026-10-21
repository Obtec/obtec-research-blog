import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  // Parse content to render markdown paragraphs, block math ($$...$$), inline math ($...$), and tables
  const renderedContent = useMemo(() => {
    if (!content) return null;

    // Split by block equations ($$...$$)
    const blockEquationRegex = /\$\$([\s\S]*?)\$\$/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = blockEquationRegex.exec(content)) !== null) {
      // Text before equation
      if (match.index > lastIndex) {
        const textBefore = content.substring(lastIndex, match.index);
        parts.push(renderTextSegment(textBefore, `text-${lastIndex}`));
      }

      // The block equation
      const formula = match[1].trim();
      const html = renderKatex(formula, true);
      if (html !== null) {
        parts.push(
          <div
            key={`block-math-${match.index}`}
            className="my-6 overflow-x-auto py-3 px-4 rounded-xl bg-slate-900/60 border border-white/10 shadow-inner text-cyan-200"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } else {
        parts.push(
          <pre key={`err-${match.index}`} className="text-red-400 text-xs font-mono p-2">
            {formula}
          </pre>
        );
      }

      lastIndex = blockEquationRegex.lastIndex;
    }

    // Remaining text after last equation
    if (lastIndex < content.length) {
      parts.push(renderTextSegment(content.substring(lastIndex), `text-${lastIndex}`));
    }

    return parts;
  }, [content]);

  return <div className={`academic-prose leading-relaxed ${className}`}>{renderedContent}</div>;
};

// Helper to render text with inline math ($...$), tables, bold, and line breaks
function renderTextSegment(text: string, keyPrefix: string): React.ReactNode {
  // Check if this segment contains markdown table
  if (text.includes('|') && text.includes('---')) {
    const lines = text.trim().split('\n');
    const tableLines = lines.filter(l => l.trim().startsWith('|'));
    if (tableLines.length >= 2) {
      return renderMarkdownTable(tableLines, keyPrefix);
    }
  }

  // Split by paragraphs
  const paragraphs = text.split(/\n\n+/);

  return (
    <div key={keyPrefix} className="space-y-4">
      {paragraphs.map((p, pIdx) => {
        if (!p.trim()) return null;

        // Render bullet points if starting with - or 1.
        if (p.trim().startsWith('- ') || p.trim().startsWith('* ')) {
          const listItems = p.split('\n').filter(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
          return (
            <ul key={`${keyPrefix}-ul-${pIdx}`} className="list-disc list-inside space-y-1.5 my-3 pl-2 text-slate-300">
              {listItems.map((item, iIdx) => (
                <li key={`${keyPrefix}-li-${pIdx}-${iIdx}`}>
                  {renderInlineMathAndFormatting(item.replace(/^[-*]\s+/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s/.test(p.trim())) {
          const listItems = p.split('\n').filter(l => /^\d+\.\s/.test(l.trim()));
          return (
            <ol key={`${keyPrefix}-ol-${pIdx}`} className="list-decimal list-inside space-y-1.5 my-3 pl-2 text-slate-300">
              {listItems.map((item, iIdx) => (
                <li key={`${keyPrefix}-oli-${pIdx}-${iIdx}`}>
                  {renderInlineMathAndFormatting(item.replace(/^\d+\.\s+/, ''))}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={`${keyPrefix}-p-${pIdx}`} className="text-slate-300/90 leading-[1.8] text-base md:text-[17px]">
            {renderInlineMathAndFormatting(p)}
          </p>
        );
      })}
    </div>
  );
}

// Render markdown table with glassmorphism & metal border styling
function renderMarkdownTable(lines: string[], key: string): React.ReactNode {
  const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
  const rows = lines.slice(2).map(row => row.split('|').map(c => c.trim()).filter(Boolean));

  return (
    <div key={key} className="my-6 overflow-x-auto rounded-xl border border-white/10 glass-panel shadow-lg">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04]">
            {headers.map((h, i) => (
              <th key={i} className="py-3 px-4 font-semibold text-slate-200 tracking-wide">
                {renderInlineMathAndFormatting(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((r, rIdx) => (
            <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
              {r.map((cell, cIdx) => (
                <td key={cIdx} className="py-2.5 px-4 text-slate-300 font-mono text-xs md:text-sm">
                  {renderInlineMathAndFormatting(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Render inline math ($...$) and bold (**...**)
function renderInlineMathAndFormatting(text: string): React.ReactNode {
  // Regex to match $math$ or **bold**
  const regex = /(\$[^$]+\$|\*\*[^*]+\*\*)/g;
  const segments = text.split(regex);

  return segments.map((seg, i) => {
    if (seg.startsWith('$') && seg.endsWith('$') && seg.length > 2) {
      const html = renderKatex(seg.slice(1, -1), false);
      if (html === null) {
        return <code key={i} className="text-cyan-400">{seg}</code>;
      }
      return (
        <span
          key={i}
          className="inline-math font-serif text-cyan-300 px-1 py-0.5 rounded bg-cyan-950/20"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } else if (seg.startsWith('**') && seg.endsWith('**') && seg.length > 4) {
      return (
        <strong key={i} className="font-semibold text-slate-100">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    return seg;
  });
}

// Render a LaTeX formula to an HTML string. Returns null if KaTeX throws.
// Kept separate so that no JSX is constructed inside try/catch.
function renderKatex(formula: string, displayMode: boolean): string | null {
  try {
    return katex.renderToString(formula, { displayMode, throwOnError: false });
  } catch (err) {
    console.error('KaTeX rendering error:', err);
    return null;
  }
}
