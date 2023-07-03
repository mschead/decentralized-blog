const networkConfig = {
  default: {
    name: "hardhat",
  },
  31337: {
    name: "localhost",
  },
  5: {
    name: "rinkeby",
  },
  1: {
    name: "mainnet",
  },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

export { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS }
