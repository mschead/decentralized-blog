export default interface IpfsStorageClient {
  retrieve(cid: string): Promise<string>;
  store(file: File): Promise<string>;
}
