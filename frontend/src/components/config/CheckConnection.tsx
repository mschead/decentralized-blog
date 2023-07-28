"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const CheckConnection = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isConnected || pathname === "/") return;
    router.push("/");
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="prose mx-auto text-center mt-10">
        <h3>Please connect your Metamask Wallet.</h3>
      </div>
    );
  }

  return children;
};

export default CheckConnection;
