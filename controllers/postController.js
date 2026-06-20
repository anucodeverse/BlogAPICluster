const Post = require("../models/post");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// ========================
// CREATE POST
// ========================
exports.createPost = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, content, authorId } = req.body;

    let imageUrl = "";

try {
  if (req.file) {
    const buffer = req.file.buffer;

    if (buffer) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
          (error, result) => {
            if (error) {
              console.log("Cloudinary ERROR:", error);
              return reject(error);
            }
            resolve(result.secure_url);
          }
        );

        require("streamifier")
          .createReadStream(buffer)
          .pipe(stream);
      });
    } else {
      console.log("⚠️ No file buffer received");
    }
  }
} catch (err) {
  console.log("UPLOAD ERROR:", err);
}

    const post = await Post.create({
      title,
      content,
      authorId,
      image: imageUrl || "",
    });

    return res.status(201).json(post);
  } catch (error) {
    console.log("CREATE ERROR:", error);
    return res.status(500).json({ message: error.message });
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
    return res.status(500).json({ message: error.message });
  }
};

// ========================
// GET POST BY ID
// ========================
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ========================
// DELETE POST
// ========================
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    return res.status(500).json({ message: error.message });
  }
};