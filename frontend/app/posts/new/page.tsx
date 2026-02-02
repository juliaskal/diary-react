import { title } from "@/components/primitives";
import clsx from "clsx";
import { PostForm } from "@/components/Post/PostForm/PostForm";

export default function AddPost() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className={clsx(title(), "tracking-wider")}>создать запись</h1>
      <PostForm post={null} isNew={true} />
    </div>
  );
}
