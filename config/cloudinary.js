const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const express = require('express');
const multer = require('multer');

// const app = express();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "folder-name", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  },
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;