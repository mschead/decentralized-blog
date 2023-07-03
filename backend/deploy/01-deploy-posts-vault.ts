import { HardhatRuntimeEnvironment } from "hardhat/types"

async function deployPostsVault(params: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = params
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  await deploy("PostsVault", {
    from: deployer,
    waitConfirmations: 1,
  })
}

export default deployPostsVault
