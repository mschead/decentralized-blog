import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const usePersistConnect = () => {
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  useEffect(() => {
    const isPersistConnected = localStorage.getItem("wagmi.connected");
    if (isPersistConnected) connect();
    // connect() doesn't return a promise
    setTimeout(() => setIsCheckingConnection(false), 1000);
  }, []);

  return {
    isConnected: !isCheckingConnection && isConnected,
    isCheckingConnection,
    connect,
    disconnect,
  };
};

export default usePersistConnect;
