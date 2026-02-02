import type { Folder } from './folder';

export interface Post {
  id: string;
  title: string | null;
  content_html: string;
  created_at: string;
  folder: Folder | null;
}
