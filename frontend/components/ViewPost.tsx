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
import { siteConfig } from "@/config/site";

type ViewPostProps = { postId: string };

export function ViewPost({ postId }: ViewPostProps) {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    fetch(`${siteConfig.backendDomain}/api/post/${postId}`)
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

  const converter = new QuillDeltaToHtmlConverter(post.content.ops ?? [], {
    inlineStyles: true,
  });

  const html = converter.convert();

  return (
    <div className="flex flex-col gap-10">

    <h1 className={title()}>{post.title}</h1>

    <Card className="mb-4 p-3">
      {/* HEADER */}
      <CardHeader className="flex justify-between items-start gap-4">

        <div className="flex">

          <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden">

            <div className="text-tiny bg-default-100 py-0.5 text-default-500">
              {new Date(post.created_at).toLocaleString("ru-RU", {month: "short"})}
            </div>

            <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
              {new Date(post.created_at).toLocaleString("ru-RU", {day: "2-digit"})}
            </div>

          </div>

          <div className="ms-4">
            <p className="text-sm text-default-500">
              {new Date(post.created_at).toLocaleString("ru-RU", {year: "numeric"})}
            </p>
            <p className="text-medium font-medium">
              в {new Date(post.created_at).toLocaleString("ru-RU", {hour: "2-digit", minute: "2-digit"})}
            </p>
          </div>

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
