import { abi } from "@/consts";
import { useAccount, useContractRead } from "wagmi";
import useContractAddress from "@/hooks/useContractAddress";

interface Data {
  hasVault?: boolean;
}

interface Response {
  isLoading: boolean;
  data: Data;
  error: Error | null;
  refetch: () => Promise<void>;
}

const useCheckIfVaultExists = (): Response => {
  const contractAddress = useContractAddress();
  const { address } = useAccount();
  const {
    data: hasVault,
    error,
    refetch,
    isLoading,
  } = useContractRead<typeof abi, "checkIfVaultExists", boolean>({
    address: contractAddress,
    abi: abi,
    functionName: "checkIfVaultExists",
    account: address,
  });

  const fetchIt = async () => {
    await refetch();
  };

  return {
    isLoading,
    error,
    data: { hasVault },
    refetch: fetchIt,
  };
};

export default useCheckIfVaultExists;
