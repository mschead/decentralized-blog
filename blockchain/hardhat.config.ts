import "@nomiclabs/hardhat-waffle"
import "hardhat-deploy"
import "solidity-coverage"
import "@typechain/hardhat"

import { HardhatUserConfig } from "hardhat/config"
import { config as dotenvConfig } from "dotenv"

dotenvConfig()

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
}

export default config
