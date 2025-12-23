"use client";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Trash2, Pen } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/types/post";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import 'react-quill/dist/quill.snow.css';


interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(false); // состояние раскрытия

  const formattedDate = new Date(post.created_at).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const delta = JSON.parse(post.content);

  const converter = new QuillDeltaToHtmlConverter(delta, {
    inlineStyles: true,
  });

  const html = converter.convert();

  return (
    <Card className="mb-4">
      {/* HEADER */}
      <CardHeader className="flex justify-between items-start gap-4">
        <div>
          <Link href={`/view-post/${post.id}`}>
            <h2 className="text-lg font-semibold text-default-700">{post.title}</h2>
          </Link>
          <p className="text-sm text-default-500">{formattedDate}</p>
        </div>

        <div className="flex gap-1">
          <Button isIconOnly size="sm" variant="light" color="danger">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button isIconOnly size="sm" variant="light">
            <Pen className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* BODY */}
      <CardBody>
        <div className={`text-default-700 whitespace-pre-line ${
            expanded ? "" : "line-clamp-7"
          }`}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <Button
            size="sm"
            className="bg-linear-to-tr from-rose-300 to-pink-400 shadow-lg tracking-widest px-8 inline-flex self-start my-4"
            radius="full"
            onPress={() => setExpanded(!expanded)}
        >
            {expanded ? "свернуть" : "читать далее…"}
        </Button>
      </CardBody>
    </Card>
  );
}
