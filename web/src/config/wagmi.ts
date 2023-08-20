import { createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { hardhat } from "wagmi/chains";

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: hardhat,
    transport: http(),
  }),
});

export default wagmiConfig;
