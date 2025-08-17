// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'instagram-posts',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => new Date().toISOString() + '-' + file.originalname,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
