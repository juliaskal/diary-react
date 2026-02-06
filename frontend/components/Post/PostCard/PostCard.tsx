"use client";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Pen } from "lucide-react";
import { useState } from "react";
import type { Post } from "@/types/post";
import { DeletePost } from "@/components/Post/PostCard/DeletePost";
import { PostHeaderInfo } from "@/components/Post/PostCard/PostHeaderInfo";

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
}

function PostCard({ post, onDelete }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mb-4 p-3">
      <CardHeader className="flex justify-between items-start gap-4">
        <div>
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-lg font-semibold text-default-700 mb-2">{post.title ? post.title : ""}</h2>
          </Link>

          <PostHeaderInfo post={post} />
        </div>

        <div className="flex gap-1">

          <DeletePost postId={post.id} onDeleted={() => onDelete(post.id)}/>

          <Button as={Link}
            href={`/posts/${post.id}/edit`}
            isIconOnly
            size="sm"
            variant="light"
          >
            <Pen className="w-4 h-4" />
          </Button>

        </div>

      </CardHeader>

      <CardBody>
        <div className="sun-content">
          <div className="text-default-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </div>

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

export { PostCard }
