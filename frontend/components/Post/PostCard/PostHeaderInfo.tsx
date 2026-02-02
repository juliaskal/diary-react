import Link from "next/link";
import type { Post } from "@/types/post";

interface PostHeaderInfoProps {
  post: Post;
}

function PostHeaderInfo({ post }: PostHeaderInfoProps) {
return (
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
            <p className="text-sm text-default-500 font-semibold text-left">
                {new Date(post.created_at).toLocaleString("ru-RU", {year: "numeric"})},
                в {new Date(post.created_at).toLocaleString("ru-RU", {hour: "2-digit", minute: "2-digit"})}
            </p>

            {post.folder &&
                <Link href="#">
                    <p className="text-left">
                    <span className="text-sm text-default-500">папка: </span>
                    <span className="text-medium font-medium text-blue-500">{post.folder.name}</span>
                    </p>
                </Link>
            }
        </div>

    </div>
)}

export { PostHeaderInfo}
