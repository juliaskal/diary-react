"use client";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Pen } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/types/post";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import 'react-quill/dist/quill.snow.css';
import { DeletePost } from "./postCard/DeletePost";
import { PostHeaderInfo } from "./postCard/PostHeaderInfo";

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);

  const converter = new QuillDeltaToHtmlConverter(post.content.ops ?? [], {
    inlineStyles: true,
  });

  const html = converter.convert();

  return (
    <Card className="mb-4 p-3">
      {/* HEADER */}
      <CardHeader className="flex justify-between items-start gap-4">
        <div>
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-lg font-semibold text-default-700 mb-2">{post.title ? post.title : ""}</h2>
          </Link>

          <PostHeaderInfo post={post} />
        </div>

        <div className="flex gap-1">

          <DeletePost postId={post.id} onDeleted={() => onDelete(post.id)}/>

          <Button as={NextLink}
            href={`/posts/${post.id}/edit`}
            isIconOnly
            size="sm"
            variant="light"
          >
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
            className="bg-linear-to-tr from-rose-300 to-pink-400 shadow-lg tracking-widest px-8 inline-flex self-start mt-4 mb-2"
            radius="full"
            onPress={() => setExpanded(!expanded)}
        >
            {expanded ? "свернуть" : "читать далее…"}
        </Button>
      </CardBody>
    </Card>
  );
}
