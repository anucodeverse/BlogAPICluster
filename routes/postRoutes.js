const express = require("express");

const router = express.Router();

const {
  createPost,
  getPosts,
  deletePost,
  getPostById,
  getRecentPosts,
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);
router.get("/recent", getRecentPosts);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

module.exports = router;