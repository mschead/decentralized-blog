import { abi } from "@/consts";
import useContractAddress from "@/hooks/useContractAddress";
import APP_CONSTS from "@/utils/consts";
import { useRef, useState } from "react";
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
  hasMorePosts: boolean;
}

interface ContractOutput {
  posts: { cid: string; title: string; thumb: string }[];
  hasMorePosts: boolean;
}

const useFetchUserPosts = (): Response => {
  const contractAddress = useContractAddress();
  const cacheData = useRef<Array<Post>>([]);
  const [currentPage, setCurrentPage] = useState(0);
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
    args: [currentPage, APP_CONSTS.PAGE_SIZE],
  });

  const refetch = async (offset: number) => setCurrentPage(offset);

  const posts = (data?.posts ?? []).map((post) => ({
    cid: post.cid,
    frontmatter: {
      title: post.title,
      thumb: post.thumb,
    },
  }));
  cacheData.current.push(...posts);

  return {
    isLoading,
    error,
    data: {
      posts: cacheData.current,
      hasMorePosts: !!data?.hasMorePosts,
    },
    refetch,
  };
};

export default useFetchUserPosts;
