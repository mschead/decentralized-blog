"use client";

import Button from "@/components/common/Button";
import usePersistConnect from "@/hooks/usePersistConnect";

const ConnectButton = () => {
  const { isConnected, connect, disconnect } = usePersistConnect();
  return !isConnected ? (
    <Button className="btn-primary" onClick={() => connect()}>
      Connect Wallet
    </Button>
  ) : (
    <Button className="btn-primary" onClick={() => disconnect()}>
      Disconnect
    </Button>
  );
};

export default ConnectButton;
