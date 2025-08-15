// Navigation and application types
export type PageType = 'dashboard' | 'source' | 'explore' | 'inbox' | 'shared' | 'liked' | 'archive';

export interface NavigationState {
  currentPage: PageType;
  previousPage?: PageType;
}

export interface SourceCard {
  id: string;
  type: 'pdf' | 'doc' | 'video' | 'link';
  title: string;
  content?: string;
  url?: string;
  uploadProgress?: number;
  isProcessing?: boolean;
  timestamp: string;
  size?: string;
  description?: string;
  pageCount?: number;
  duration?: string;
}

export interface NoteCard {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  tags: string[];
  wordCount: number;
  sourceId?: string;
}

export interface Course {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
}

export interface StudyGuide {
  id: string;
  title: string;
  type: 'study-guide' | 'overview' | 'note';
  timestamp: string;
  sourceCount: number;
  description?: string;
}