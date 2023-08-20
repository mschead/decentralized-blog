import { contractAddresses } from "@/consts";
import { useChainId } from "wagmi";

const HARDHAT_CHAIN_ID = 31337;

const useContractAddress = (): `0x${string}` => {
  let chainId = useChainId();
  if (!chainId) {
    console.warn("Chain id was not set. Using hardhat as default");
    chainId = HARDHAT_CHAIN_ID;
  }
  const addresses: Record<number, Array<string>> = contractAddresses;
  const [contractAddress] = addresses[chainId];
  return contractAddress as `0x${string}`;
};

export default useContractAddress;
