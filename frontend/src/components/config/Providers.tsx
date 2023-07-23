"use client";

import "react-toastify/dist/ReactToastify.css";
import { WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import wagmiConfig from "@/config/wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
      <ToastContainer />
    </WagmiConfig>
  );
}
