"use client";
import { Button } from "@heroui/button";
import { useState, useRef } from "react";
import type { Post } from "@/types/post";
import 'react-quill/dist/quill.snow.css';
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { now, getLocalTimeZone, ZonedDateTime } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import Formatter from "./Formatter";
import { FolderHeart } from 'lucide-react';
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const folders = [
  { label: "common", key: "common" },
  { label: "love", key: "love" },
  { label: "pilon", key: "pilon" },
  { label: "work", key: "work" },
];

interface PostFormProps {
  post: Post | null;
}

export function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [date, setDate] = useState<ZonedDateTime | null>(now(getLocalTimeZone()));
  const [folder, setFolder] = useState<string | null>(post?.folder ?? null);
  const [content, setContent] = useState("");

  // Ссылка на Formatter, если нужен метод getContent
  const formatterRef = useRef<{ getContent: () => string }>(null);

  const handleSubmit = async () => {
    // Если используем ref для Formatter
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

      console.log("Пост сохранён");
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

      <Autocomplete
        className="max-w-xs"
        label="Папка"
        placeholder="Поиск по папкам"
        startContent={<FolderHeart className="text-default-700" />}
        variant="bordered"
        onSelectionChange={(key) => setFolder(key as string)}
      >
        {folders.map((f) => (
          <AutocompleteItem key={f.key}>{f.label}</AutocompleteItem>
        ))}
      </Autocomplete>

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
