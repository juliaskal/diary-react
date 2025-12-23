"use client";
import { useEffect, useState } from "react";
import type { Post } from "@/types/post";
import { PostList } from "@/components/PostList";
import {Spinner} from "@heroui/spinner";


export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts")
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <PostList posts={posts} />
    </div>
  );
}
