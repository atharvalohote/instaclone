// C:\Users\karan\OneDrive\Desktop\insta\instagram-backend\routes\users.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Import the controller functions
const { 
  getUserProfile, 
  followUser, 
  searchUsers, 
  updateProfile 
} = require('../controllers/userController');

// User routes
router.get('/profile/:userId', auth, getUserProfile);
router.put('/follow/:userId', auth, followUser);
router.get('/search', auth, searchUsers);
router.put('/profile', auth, upload.single('avatar'), updateProfile);

module.exports = router;
