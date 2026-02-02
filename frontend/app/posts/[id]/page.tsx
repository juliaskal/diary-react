import { ViewPost } from "@/components/Post/ViewPost";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  return <ViewPost postId={id} />;
}
