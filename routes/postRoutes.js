const express = require("express");

const router = express.Router();

const {
  createPost,
  getPosts,
  deletePost,
  getRecentPosts,
} = require("../controllers/postController");

router.post("/", createPost);

router.get("/", getPosts);

router.delete("/:id", deletePost);

router.get("/recent", getRecentPosts);

module.exports = router;