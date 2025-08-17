// C:\Users\karan\OneDrive\Desktop\insta\instagram-backend\routes\posts.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import all the needed functions from the controller
const { 
  createPost, 
  getFeedPosts, 
  likePost, 
  commentOnPost,
  getUserPosts
} = require('../controllers/postController');

// Assign the correct functions to the routes
router.post('/', auth, createPost);
router.get('/feed', auth, getFeedPosts);
router.get('/user/:userId', auth, getUserPosts);
router.put('/:id/like', auth, likePost);
router.post('/:id/comment', auth, commentOnPost);

module.exports = router;
