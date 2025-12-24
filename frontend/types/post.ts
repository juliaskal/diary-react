export interface Post {
  id: number;
  title: string | null;
  content: string;
  created_at: string;
  folder: string | null;
}
