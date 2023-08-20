import useGateway from "@/hooks/useGateway";
import matter from "gray-matter";
import { useEffect, useState } from "react";

interface Response {
  isLoading: boolean;
  data: {
    title: string;
    content: string;
  };
  error: Error | null;
}

interface Inputs {
  cid: string;
}

const useFetchPost = ({ cid }: Inputs): Response => {
  const { ipfsStorageClient } = useGateway();
  const [data, setData] = useState({ title: "", content: "" });
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchFile() {
      try {
        setLoading(true);
        const res = await ipfsStorageClient.retrieve(cid);
        const { data: frontmatter, content } = matter(res);
        setData({ title: frontmatter.title, content: content });
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [cid, ipfsStorageClient]);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetchPost;
