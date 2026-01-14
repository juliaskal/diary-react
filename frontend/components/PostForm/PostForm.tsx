"use client";
import { Button } from "@heroui/button";
import { useState, useRef } from "react";
import type { Post } from "@/types/post";
import 'react-quill/dist/quill.snow.css';
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { now, getLocalTimeZone, ZonedDateTime } from "@internationalized/date";
import Formatter from "./Formatter";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { DeltaStatic } from 'quill';
import { useRouter } from "next/navigation";
import { FolderSelect } from "./FolderSelect";


interface PostFormProps {
  post: Post | null;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(post?.title ?? "");
  const [date, setDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [folder, setFolder] = useState<string | null>(post?.folder?.id ?? null);
  const [content, setContent] = useState<DeltaStatic | null>(post?.content ?? null);

  const formatterRef = useRef<{
    getContent: () => DeltaStatic | null;
  }>(null);

  const handleSubmit = async () => {
    const currentContent = formatterRef.current?.getContent() ?? content;

    const payload = {
      title,
      folder,
      content: currentContent,
      created_at: date?.toDate().toISOString(),
    };

    try {
      const res = await fetch(`${siteConfig.backendDomain}/api/new`, {
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
      router.push(`/posts/${data.id}`);

    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-4 text-left">

      <Input
        label="Заголовок"
        labelPlacement="outside"
        variant="bordered"
        value={title}
        onValueChange={setTitle}
      />

      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        value={date}
        label="Дата"
        variant="bordered"
        hourCycle={24}
        className="max-w-xs"
        onChange={setDate}
      />

      <FolderSelect value={folder} onChange={setFolder}/>

      <Formatter ref={formatterRef} onChange={setContent} />

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
