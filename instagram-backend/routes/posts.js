// C:\Users\karan\OneDrive\Desktop\insta\instagram-backend\routes\posts.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createPost, 
  getFeedPosts, 
  likePost, 
  commentOnPost, 
  getUserPosts 
} = require('../controllers/postController');

// Public routes (no auth required)
router.get('/', getFeedPosts); // Public feed
router.get('/user/:userId', getUserPosts); // Public user posts

// Protected routes (auth required)
router.post('/', auth, createPost);
router.put('/:id/like', auth, likePost);
router.post('/:id/comment', auth, commentOnPost);

module.exports = router;
