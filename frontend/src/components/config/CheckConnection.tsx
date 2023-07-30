"use client";

import Loading from "@/components/common/Loading";
import usePersistConnect from "@/hooks/usePersistConnect";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckConnection = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, isCheckingConnection } = usePersistConnect();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isCheckingConnection || isConnected) return;
    router.push("/");
  }, [isConnected, isCheckingConnection]);

  if (isCheckingConnection) {
    return (
      <div className="prose flex justify-center mx-auto mt-10">
        <Loading />
      </div>
    );
  }

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
