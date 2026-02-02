import type { Post } from "@/types/post";
import { PostCard } from "@/components/Post/PostCard";
import { Pagination } from "@heroui/pagination";


interface PostListProps {
  posts: Post[];
  onDelete: (postId: string) => void;
}

function PostList({ posts, onDelete }: PostListProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete}/>
      ))}

    <footer className="w-full flex items-center justify-center py-3">
        <Pagination showControls initialPage={1} total={10} className="mb-6" />
    </footer>

    </div>
  );
}

export { PostList }
