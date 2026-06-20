const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sprint11-frontend",
    allowed_formats: ["jpg", "jpeg", "png"],
    resource_type: "image",
  },
});
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "sprint11-frontend" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(buffer);
  });
};
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;

module.exports = upload;