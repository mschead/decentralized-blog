import { abi } from "@/consts";
import useContractAddress from "@/hooks/useContractAddress";
import { useAccount, useContractRead } from "wagmi";

interface Response {
  isLoading: boolean;
  data?: PostInfo;
  error: Error | null;
  refetch: (offset: number, pageSize?: number) => void;
}

interface Post {
  cid: string;
  frontmatter: {
    title: string;
    thumb: string;
  };
}

interface PostInfo {
  posts: Array<Post>;
  hasMoreData: boolean;
}

interface ContractOutput {
  posts: { cid: string; title: string; thumb: string }[];
  hasMoreData: boolean;
}

const useFetchUserPosts = (): Response => {
  const contractAddress = useContractAddress();
  const { address } = useAccount();
  const { data, error, isLoading } = useContractRead<
    typeof abi,
    "getPosts",
    ContractOutput
  >({
    address: contractAddress,
    abi: abi,
    functionName: "getPosts",
    account: address,
    // offset, page size
    args: [0, 15],
  });

  const posts = (data?.posts ?? []).map((post) => ({
    cid: post.cid,
    frontmatter: {
      title: post.title,
      thumb: post.thumb,
    },
  }));

  return {
    isLoading,
    error,
    data: {
      posts,
      hasMoreData: !!data?.hasMoreData,
    },
    refetch: () => {},
  };
};

export default useFetchUserPosts;
