"use client";

import { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/types/post";
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

  return (
    <div>
      <h1 className={title()}>запись</h1>
      <PostCard key={post.id} post={post} />
    </div>
  );
}
