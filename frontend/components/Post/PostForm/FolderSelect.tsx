"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { FolderHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import type { Folder } from "@/types/folder";

interface FolderSelectProps {
  value: string | null;
  onChange: (folderId: string | null) => void;
}

export function FolderSelect({ value, onChange }: FolderSelectProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${siteConfig.backendDomain}/api/folders`);
        const data = await res.json();
        setFolders(data);
      } catch (e) {
        console.error("Не удалось загрузить папки", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Autocomplete
      className="max-w-xs"
      label="Папка"
      placeholder={loading ? "Загрузка..." : "Поиск по папкам"}
      startContent={<FolderHeart className="text-default-700" />}
      variant="bordered"
      selectedKey={value}
      onSelectionChange={(key) => onChange(key ? String(key) : null)}
      isDisabled={loading}
    >
      {folders.map((f) => (
        <AutocompleteItem key={f.id}>
          {f.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
