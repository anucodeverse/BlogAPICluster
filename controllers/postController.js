const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

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