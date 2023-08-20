import { assert, expect } from "chai"
import { network, ethers } from "hardhat"
import { PostsVault, PostsVault__factory } from "typechain-types"
import { developmentChains } from "../helper-hardhat-config"

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Post Vault - Unit Tests", function () {
      let postsVault: PostsVault, postsVaultFactory: PostsVault__factory

      beforeEach(async () => {
        postsVaultFactory = await ethers.getContractFactory("PostsVault")
        postsVault = await postsVaultFactory.deploy()
      })

      describe("initVault", function () {
        it("should add a new vault for who is calling", async () => {
          await postsVault.initVault()
          const vaultExists = await postsVault.checkIfVaultExists()
          assert(vaultExists, "Vault was not created.")
        })

        it("should prevent adding a new vault for a user that already has one", async () => {
          await postsVault.initVault()
          await expect(postsVault.initVault()).to.be.revertedWith(
            "There's already a vault for this user!"
          )
        })
      })

      describe("addNewPost", function () {
        const cid = "123"
        const title = "title"
        const thumb = "thumb"

        it("should add a new post for who is calling", async () => {
          await postsVault.initVault()
          await postsVault.addNewPost(cid, title, thumb)
          const res = await postsVault.getPost(0)
          assert(res.cid === cid, "CID is different!")
          assert(res.title === title, "Title is different!")
          assert(res.thumb === thumb, "Thumb is different!")
          assert(res.isActive, "isActive is different!")
        })

        it("should prevent a new post creation if there's not a vault for who is calling", async () => {
          await expect(postsVault.addNewPost(cid, title, thumb)).to.be.revertedWith(
            "There's not a vault for this user!"
          )
        })
      })

      describe("getPost", function () {
        const cid = "123"
        const title = "title"
        const thumb = "thumb"

        it("should return the element if it exists", async () => {
          await postsVault.initVault()
          await postsVault.addNewPost(cid, title, thumb)
          const res = await postsVault.getPost(0)
          assert(res.cid === cid, "CID is different!")
          assert(res.title === title, "Title is different!")
          assert(res.thumb === thumb, "Thumb is different!")
          assert(res.isActive, "isActive is different!")
        })

        it("should return an error when try to get a post out of bounds", async () => {
          await postsVault.initVault()
          await postsVault.addNewPost(cid, title, thumb)
          await expect(postsVault.getPost(1)).to.be.revertedWith("Post doesn't exist!")
        })

        it("should return an error when try to get a post from a user that has no vault", async () => {
          await expect(postsVault.getPost(0)).to.be.revertedWith(
            "There's not a vault for this user!"
          )
        })
      })
    })
