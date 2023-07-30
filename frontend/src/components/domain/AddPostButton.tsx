"use client";

import Button from "@/components/common/Button";
import useCheckIfVaultExists from "@/hooks/useCheckIfVaultExists";
import usePersistConnect from "@/hooks/usePersistConnect";
import Link from "next/link";

export default function AddPostButton() {
  const { isConnected } = usePersistConnect();
  const {
    data: vaultData,
    isLoading: checkVaultLoading,
    error,
  } = useCheckIfVaultExists();

  if (!isConnected || checkVaultLoading || !vaultData.hasVault || error)
    return null;

  return (
    <Link className="mr-4" href="/add-post">
      <Button className="btn-primary">
        <span>Create Post</span>
      </Button>
    </Link>
  );
}
