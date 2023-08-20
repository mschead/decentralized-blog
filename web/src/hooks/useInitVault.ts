import { useAccount, useContractWrite } from "wagmi";
import { abi } from "@/consts";
import useContractAddress from "@/hooks/useContractAddress";

interface Response {
  isLoading: boolean;
  initVault: () => Promise<void>;
}

const useInitVault = (): Response => {
  const { address } = useAccount();
  const contractAddress = useContractAddress();
  const { isLoading, writeAsync } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "initVault",
    account: address,
  });

  const initVault = async () => {
    await writeAsync();
  };

  return {
    initVault,
    isLoading,
  };
};

export default useInitVault;
