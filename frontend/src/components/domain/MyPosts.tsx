import Card from "@/components/common/Card";
import Loading from "@/components/common/Loading";
import useFetchUserPosts from "@/hooks/useFetchUserPosts";

const MyPosts = () => {
  const { data, error, isLoading } = useFetchUserPosts();

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
    <div
      style={{ minHeight: "75vh" }}
      className="flex flex-col justify-between"
    >
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
    </div>
  );
};

export default MyPosts;
