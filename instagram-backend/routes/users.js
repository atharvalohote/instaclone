// C:\Users\karan\OneDrive\Desktop\insta\instagram-backend\routes\users.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { 
  getUserProfile, 
  followUser, 
  searchUsers, 
  updateProfile,
  getAllUsers
} = require('../controllers/userController');

// Public routes (no auth required)
router.get('/profile/:userId', getUserProfile); // Public profile
router.get('/search', searchUsers); // Public search
router.get('/discover', getAllUsers); // Public user discovery

// Protected routes (auth required)
router.put('/follow/:userId', auth, followUser);
router.put('/profile', auth, upload.single('avatar'), updateProfile);

module.exports = router;
