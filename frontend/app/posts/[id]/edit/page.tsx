import type { Post } from "@/types/post";
import { PostForm } from "@/components/Post/PostForm/PostForm";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { title } from "@/components/primitives";

type Props = {
  params: { id: string };
};

async function getPost(id: string): Promise<Post> {
  const res = await fetch(
    `${siteConfig.backendDomain}/api/post/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Не удалось загрузить пост");
  }

  return res.json();
}

export default async function EditPostPage({ params }: Props) {
  const post = await getPost(params.id);

  return (
    <div className="flex flex-col gap-10">
      <h1 className={clsx(title(), "tracking-wider")}>
        изменить запись
      </h1>

      <PostForm post={post} />
    </div>
  );
}
