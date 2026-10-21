export interface Author {
  name: string;
  affiliation: string;
  orcid?: string;
  role?: string;
  avatarUrl?: string;
}

export interface PaperReference {
  id: string;
  label: string; // e.g. "[1]"
  authors: string;
  year: number;
  title: string;
  venue: string;
  url?: string;
}

export interface PaperFigure {
  id: string;
  number: number;
  title: string;
  caption: string;
  type: 'architecture' | 'benchmark' | 'formula' | 'graph';
  svgData?: string;
}

export interface PaperSection {
  id: string;
  title: string;
  number?: string;
  level: 1 | 2;
  content: string; // Supports markdown, latex ($...$ and $$...$$), and blockquotes
}

export type PaperType = 'paper' | 'report' | 'technical-brief' | 'column';

export interface Paper {
  id: string;
  slug: string;
  type: PaperType;
  title: string;
  subtitle?: string;
  coverImage?: string;
  authors: Author[];
  publishedDate: string;
  updatedDate?: string;
  journalOrConference: string;
  doi: string;
  category: 
    | '물리학' 
    | '컴퓨터 과학' 
    | '반도체' 
    | 'etc.'
    | 'etc'
    | string;
  tags: string[];
  readTimeMinutes: number;
  citationCount: number;
  viewsCount: number;
  downloadCount: number;
  featured?: boolean;
  abstract: string;
  keyContributions: string[];
  pdfDownloadName: string;
  /** Path/URL to the original PDF (e.g. '/papers/my-paper.pdf' in public/). If absent, "PDF로 저장" falls back to browser print. */
  pdfUrl?: string;
  bibtex: string;
  apaCitation: string;
  sections: PaperSection[];
  references: PaperReference[];
}

export type ThemeMode = 'dark' | 'light' | 'cyber';

export type FontPreference = 'serif' | 'sans';
export type ColumnLayout = 'single' | 'two-column' | 'wide';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
