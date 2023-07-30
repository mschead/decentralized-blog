import IpfsStorageClient from "@/domain/gateway/StorageClient";
import { z } from "zod";

const ZodStore = z.object({
  cid: z.string(),
});

const ZodRetrieve = z.object({
  content: z.string(),
});

export default class IpfsStorageClientRest implements IpfsStorageClient {
  async retrieve(cid: string): Promise<string> {
    const params = encodeURIComponent(cid);
    const res = await fetch("/api/post?cid=" + params);
    if (!res.ok) {
      throw new Error("Retrieve request failed.");
    }
    const jsonResponse = await res.json();
    ZodRetrieve.parse(jsonResponse);
    return jsonResponse.content;
  }
  async store(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("content", file);
    const res = await fetch("/api/post", { method: "POST", body: formData });
    if (!res.ok) {
      throw new Error("Store request failed.");
    }
    const content = await res.json();
    ZodStore.parse(content);
    return content.cid;
  }
}
