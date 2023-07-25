"use client";

import "react-toastify/dist/ReactToastify.css";
import { WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import wagmiConfig from "@/config/wagmi";
import { GatewayContext } from "@/hooks/useGateway";
import IpfsStorageClientMemory from "@/infra/IpfsStorageClientMemory";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <GatewayContext.Provider
        value={{ ipfsStorageClient: new IpfsStorageClientMemory() }}
      >
        {children}
        <ToastContainer />
      </GatewayContext.Provider>
    </WagmiConfig>
  );
}
