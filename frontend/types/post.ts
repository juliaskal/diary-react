import type { DeltaStatic } from 'quill';
import type { Folder } from './folder';

export interface Post {
  id: string;
  title: string | null;
  content: DeltaStatic;
  created_at: string;
  folder: Folder;
}
