// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract PostsVault {
  // State Variables
  mapping(address => PostsInfo) private userPosts;

  // Structs
  struct Post {
    string cid;
    string title;
    string thumb;
    bool isActive;
  }
  struct PostsInfo {
    Post[] posts;
    bool isActive;
  }

  struct PostPage {
    Post[] posts;
    bool hasMorePosts;
  }

  function addNewPost(string memory cid, string memory title, string memory thumb) public {
    require(userPosts[msg.sender].isActive == true, "There's not a vault for this user!");
    Post memory newPost = Post(cid, title, thumb, true);
    userPosts[msg.sender].posts.push(newPost);
  }

  function initVault() public {
    require(userPosts[msg.sender].isActive == false, "There's already a vault for this user!");
    userPosts[msg.sender].isActive = true;
  }

  function checkIfVaultExists() public view returns (bool) {
    return userPosts[msg.sender].isActive == true;
  }

  function getPost(uint256 index) public view returns (Post memory) {
    require(userPosts[msg.sender].isActive, "There's not a vault for this user!");
    require(index < userPosts[msg.sender].posts.length, "Post doesn't exist!");
    return userPosts[msg.sender].posts[index];
  }

  function getPosts(uint256 offset, uint256 pageSize) public view returns (PostPage memory) {
    require(userPosts[msg.sender].isActive, "There's not a vault for this user!");
    if (offset > userPosts[msg.sender].posts.length) {
      return PostPage(new Post[](0), false);
    }

    uint256 sizeAvailable = userPosts[msg.sender].posts.length - offset;
    uint256 arraySize = sizeAvailable > pageSize ? pageSize : sizeAvailable;
    Post[] memory postsToSend = new Post[](arraySize);

    for (uint256 i = offset; i < arraySize + offset; i++) {
      if (i >= userPosts[msg.sender].posts.length) {
        break;
      } else {
        postsToSend[i - offset] = userPosts[msg.sender].posts[i];
      }
    }

    return PostPage(postsToSend, pageSize < sizeAvailable);
  }
}
