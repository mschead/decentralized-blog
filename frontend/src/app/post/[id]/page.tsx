import PostPage from "@/components/domain/PostPage";

export default function Page({ params }: { params: { id: string } }) {
  return <PostPage cid={params.id} />;
}
