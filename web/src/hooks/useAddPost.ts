import { abi } from "@/consts";
import matter from "gray-matter";
import useContractAddress from "@/hooks/useContractAddress";
import { validateFrontmatter } from "@/utils/markdown";
import { useAccount, useContractWrite } from "wagmi";
import useGateway from "@/hooks/useGateway";
import { useState } from "react";

interface Response {
  isLoading: boolean;
  addPost: (markdownContent: string) => Promise<void>;
  error?: Error;
}

const useAddPost = (): Response => {
  const { ipfsStorageClient } = useGateway();
  const { address } = useAccount();
  const contractAddress = useContractAddress();
  const [isStorageLoading, setIsStorageLoading] = useState(false);
  const { isLoading, writeAsync } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addNewPost",
    account: address,
  });

  const addPost = async (markdownContent: string) => {
    try {
      setIsStorageLoading(true);
      const { data: frontmatter } = matter(markdownContent);
      validateFrontmatter(frontmatter);
      const content = new Blob([markdownContent], {
        type: "text/plain",
      });
      const cid = await ipfsStorageClient.store(
        new File([content], frontmatter.title)
      );
      await writeAsync({
        args: [cid, frontmatter.title, frontmatter.thumb],
      });
    } finally {
      setIsStorageLoading(false);
    }
  };

  return {
    addPost,
    isLoading: isLoading || isStorageLoading,
  };
};

export default useAddPost;
