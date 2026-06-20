const Post = require("../models/post");
const postSchema = require("../validators/postValidator");

// Create post
exports.createPost = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, content, authorId } = req.body;

  

    const image =
  req.file?.secure_url ||
  req.file?.path ||
  "";

    const { error } = postSchema.validate({
      title,
      content,
      authorId,
      image,
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const post = await Post.create({
      title,
      content,
      image,
      authorId,
    });

    return res.status(201).json(post);

  } catch (error) {
    console.log("CREATE POST ERROR:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId");
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get recent posts
exports.getRecentPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId")
      .sort({ createdAt: -1 })
      .limit(3);

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


