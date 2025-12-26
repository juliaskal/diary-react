import type { DeltaStatic } from 'quill';

export interface Post {
  id: number;
  title: string | null;
  content: DeltaStatic;
  created_at: string;
  folder: string | null;
}
