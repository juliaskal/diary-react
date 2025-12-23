"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import Link from "next/link";
import { title } from "@/components/primitives";
import { Trash2, Pen } from "lucide-react";
import type { Post } from "@/types/post";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import 'react-quill/dist/quill.snow.css';
import { Spinner } from "@heroui/spinner";

type ViewPostProps = { postId: string };

export function ViewPost({ postId }: ViewPostProps) {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/post/${postId}`)
      .then((res) => res.json())
      .then((data: Post) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [postId]);

  if (loading) return <Spinner />;

  if (!post) return <div>Запись не найдена</div>;

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
    <div className="flex flex-col gap-10">

    <h1 className={title()}>{post.title}</h1>

    <Card className="mb-4 p-3">
      {/* HEADER */}
      <CardHeader className="flex justify-between items-start gap-4">
        <div>
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
        <div className={`text-default-700 whitespace-pre-line`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </CardBody>
    </Card>

    <Link href="/">
      <Button
          size="sm"
          className="bg-linear-to-tr from-rose-300 to-pink-400 shadow-lg tracking-widest px-8"
          radius="full"
      >
        на главную
      </Button>
    </Link>

    </div>
  );
}
