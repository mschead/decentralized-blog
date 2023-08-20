import IpfsStorageClient from "@/domain/gateway/StorageClient";
import { createContext, useContext } from "react";

interface Gateway {
  ipfsStorageClient: IpfsStorageClient;
}

export const GatewayContext = createContext({} as Gateway);

const useGateway = (): Gateway => useContext(GatewayContext);

export default useGateway;
