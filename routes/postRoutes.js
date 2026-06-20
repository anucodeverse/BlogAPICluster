const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createPost,
  getPosts,
  deletePost,
  getPostById,
  getRecentPosts,
} = require("../controllers/postController");

router.post("/", upload.single("image"), createPost);
router.get("/", getPosts);
router.get("/recent", getRecentPosts);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);

module.exports = router;