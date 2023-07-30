"use client";

import Loading from "@/components/common/Loading";
import MarkdownView from "@/components/common/MarkdownView";
import useFetchPost from "@/hooks/useFetchPost";

interface Props {
  cid: string;
}

const PostPage = ({ cid }: Props) => {
  const res = useFetchPost({ cid });

  if (res.isLoading) {
    return (
      <div className="prose mx-auto flex justify-center mt-10">
        <Loading />
      </div>
    );
  }

  if (res.error) {
    return (
      <div className="prose mx-auto text-center mt-40">
        <h3>{res.error.message}</h3>
      </div>
    );
  }

  return (
    <div className="prose mx-auto">
      <h1>{res.data.title}</h1>
      <MarkdownView content={res.data.content} />
    </div>
  );
};

export default PostPage;
