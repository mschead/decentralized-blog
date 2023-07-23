"use client";

import EmptyPosts from "@/components/domain/EmptyPosts";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return isConnected ? (
    <EmptyPosts />
  ) : (
    <div className="prose mx-auto text-center mt-10">
      <h3>Please connect your Metamask Wallet.</h3>
    </div>
  );
}
