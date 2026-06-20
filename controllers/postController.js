const Post = require("../models/post");
const postSchema = require("../validators/postValidator");


// ========================
// CREATE POST (FIXED)
// ========================
exports.createPost = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const { title, content, authorId } = req.body;

    // ✅ SAFE IMAGE HANDLING (Cloudinary + fallback)
    const image = req.file?.path || "";

    // ✅ Basic validation before Joi
    if (!title || !content || !authorId) {
      return res.status(400).json({
        message: "Title, content, and authorId are required",
      });
    }

    // Joi validation
    const { error } = postSchema.validate({
      title,
      content,
      authorId,
      image,
    });

    if (error) {
      console.log("VALIDATION ERROR:", error.details[0].message);

      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // Create post in DB
    const post = await Post.create({
      title,
      content,
      image,
      authorId,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });

  } catch (error) {
    console.log("CREATE POST ERROR:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// ========================
// GET ALL POSTS
// ========================
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// ========================
// GET POST BY ID
// ========================
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};


// ========================
// DELETE POST
// ========================
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};


// ========================
// GET RECENT POSTS
// ========================
exports.getRecentPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId")
      .sort({ createdAt: -1 })
      .limit(3);

    return res.status(200).json(posts);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};