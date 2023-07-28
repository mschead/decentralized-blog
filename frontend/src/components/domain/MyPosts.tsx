import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Loading from "@/components/common/Loading";
import useFetchUserPosts from "@/hooks/useFetchUserPosts";
import APP_CONSTS from "@/utils/consts";
import { useRef } from "react";

const { PAGE_SIZE } = APP_CONSTS;

const MyPosts = () => {
  const { data, error, isLoading, refetch } = useFetchUserPosts();
  const pageNumber = useRef(0);

  const onMorePostsClick = () => {
    pageNumber.current += 1;
    refetch(pageNumber.current * PAGE_SIZE, PAGE_SIZE);
  };

  if (isLoading) {
    return (
      <div className="mx-auto flex justify-center mt-48">
        <Loading />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto flex justify-center mt-48">
        <p>Error fetching posts!</p>
      </div>
    );
  }

  if (data.posts.length === 0) {
    return (
      <div className="prose mx-auto text-center mt-36">
        <p>{"You don't have any posts!"}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "75vh" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 md:p-0">
        {data.posts.map(({ cid, frontmatter }) => (
          <Card
            key={cid}
            cid={cid}
            title={frontmatter.title}
            thumb={frontmatter.thumb}
          />
        ))}
      </div>
      {data.hasMorePosts && (
        <div className="flex justify-center w-100 mt-4">
          <Button
            className="btn-primary"
            onClick={onMorePostsClick}
            type="button"
          >
            More posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
