"use client";

import Button from "@/components/common/Button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ConnectButton = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
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
