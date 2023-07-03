import { ethers, network } from "hardhat"
import fs from "fs"

const OUTPUT_FOLDER = "frontend_outputs"
const ABI_PATH = `${OUTPUT_FOLDER}/abi.json`
const CONTRACT_ADDRESSES_PATH = `${OUTPUT_FOLDER}/contractAddresses.json`

module.exports = async () => {
  console.log("Writing to front end...")
  createOutputDir()
  await updateAbi()
  await updateContractAddresses()
  console.log("Front end written!")
}

function createOutputDir() {
  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER)
  }
}

async function updateAbi() {
  const postsVault = await ethers.getContract("PostsVault")
  fs.writeFileSync(ABI_PATH, postsVault.interface.format(ethers.utils.FormatTypes.json) as string)
}

async function updateContractAddresses() {
  const postsVault = await ethers.getContract("PostsVault")
  if (!fs.existsSync(CONTRACT_ADDRESSES_PATH)) {
    fs.writeFileSync(CONTRACT_ADDRESSES_PATH, Buffer.from("{}"))
  }
  const contractAddresses = JSON.parse(fs.readFileSync(CONTRACT_ADDRESSES_PATH, "utf8"))
  const chainId = network.config.chainId?.toString()
  if (!chainId) {
    throw new Error("ChainId is undefined.")
  }
  if (chainId in contractAddresses) {
    if (!contractAddresses[chainId].includes(postsVault.address)) {
      contractAddresses[chainId].push(postsVault.address)
    }
  } else {
    contractAddresses[chainId] = [postsVault.address]
  }
  fs.writeFileSync(CONTRACT_ADDRESSES_PATH, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
