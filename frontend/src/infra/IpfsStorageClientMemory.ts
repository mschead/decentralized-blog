import IpfsStorageClient from "@/domain/gateway/StorageClient";

export default class IpfsStorageClientMemory implements IpfsStorageClient {
  FILES: Record<string, File> = {};

  retrieve(cid: string): Promise<string> {
    const fileContent = this.FILES[cid];
    if (!fileContent) throw new Error(`There's no file for CID ${cid}`);
    return this.FILES[cid].text();
  }
  store(file: File): Promise<string> {
    const cid = Object.values(this.FILES).length + 1;
    this.FILES[cid] = file;
    return Promise.resolve(cid.toString());
  }
}
