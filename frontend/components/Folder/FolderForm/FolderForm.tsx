"use client";

import { Button } from "@heroui/button";
import { useState } from "react";
import type { Folder } from "@/types/folder";
import { Input } from "@heroui/input";
import { now, getLocalTimeZone } from "@internationalized/date";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { IconPicker } from "@/components/Folder/FolderForm/IconPicker"
import { FOLDER_ICONS, FolderIconName } from "@/shared/icons"

interface FolderFormProps {
  folder: Folder | null;
  isNew: boolean;
}

function FolderForm({ folder, isNew = true }: FolderFormProps) {
  const router = useRouter();

  const [name, setName] = useState(folder?.name ?? "");
  const [icon, setIcon] = useState<FolderIconName>("folder")

  const SelectedIcon = FOLDER_ICONS[icon]

  const handleSubmit = async () => {
    const payload = {
      id: folder?.id,
      name,
      icon,
      created_at: now(getLocalTimeZone()).toDate().toISOString(),
    };

    if (!isNew) {
      payload.id = folder!.id
    }

    const url = isNew
      ? `${siteConfig.backendDomain}/api/folder/new`
      : `${siteConfig.backendDomain}/api/folder/update`

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Ошибка при сохранении");
        return;
      }

      const data = await res.json();
      router.push(`/folders/${data.id}`);

    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-4 text-left">

      <Input
        label="Название"
        labelPlacement="outside"
        variant="bordered"
        value={name}
        onValueChange={setName}
      />

      <div>
        <p className="mb-2 text-sm text-default-500">Иконка папки</p>
        <IconPicker value={icon} onChange={setIcon} />
      </div>

      <div className="flex flex-wrap gap-4 items-center mt-4">

        <Button
          size="sm"
          className="bg-linear-to-tr from-rose-300 to-pink-400 shadow-lg tracking-widest px-8"
          radius="full"
          onPress={handleSubmit}
        >
          сохранить
        </Button>

        <Link href="/">
          <Button
            size="sm"
            className="bg-linear-to-tr from-neutral-500 to-gray-700 shadow-lg tracking-widest px-8 text-white"
            radius="full"
          >
            отменить
          </Button>
        </Link>

      </div>
    </div>
  );
}

export { FolderForm }
