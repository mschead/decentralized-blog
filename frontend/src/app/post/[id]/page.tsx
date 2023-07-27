import Loading from "@/components/common/Loading";
import PostPage from "@/components/domain/PostPage";

export default function Page({ params }: { params: { id: string } }) {
  const cid = params.id;

  if (!cid) {
    return (
      <div className="prose mx-auto text-center mt-40">
        <Loading />
      </div>
    );
  }

  return <PostPage cid={cid} />;
}
