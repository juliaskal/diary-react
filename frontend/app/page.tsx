import { PostList } from "@/components/PostList";
import { mockPosts } from "./mock/posts";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <PostList posts={mockPosts} />
    </main>
  );
}
