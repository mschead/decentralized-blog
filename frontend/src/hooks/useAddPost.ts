import { abi } from "@/consts";
import matter from "gray-matter";
import useContractAddress from "@/hooks/useContractAddress";
import { validateFrontmatter } from "@/utils/markdown";
import { useAccount, useContractWrite } from "wagmi";
import useGateway from "@/hooks/useGateway";

interface Response {
  isLoading: boolean;
  addPost: (markdownContent: string) => Promise<void>;
  error?: Error;
}

const useAddPost = (): Response => {
  const { ipfsStorageClient } = useGateway();
  const { address } = useAccount();
  const contractAddress = useContractAddress();
  const { isLoading, writeAsync } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addNewPost",
    account: address,
  });

  const addPost = async (markdownContent: string) => {
    const { data: frontmatter } = matter(markdownContent);
    validateFrontmatter(frontmatter);
    const blob = new Blob([markdownContent], {
      type: "text/plain",
    });
    const cid = await ipfsStorageClient.store(
      new File([blob], frontmatter.title)
    );
    await writeAsync({
      args: [cid, frontmatter.title, frontmatter.thumb],
    });
  };

  return {
    addPost,
    isLoading,
  };
};

export default useAddPost;
