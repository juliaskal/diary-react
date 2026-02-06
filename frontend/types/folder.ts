import { FolderIconName } from "@/shared/icons"

export interface Folder {
  id: string;
  name: string;
  icon: FolderIconName | null;
  cover: string | null;
  craeted_at: string;
}
