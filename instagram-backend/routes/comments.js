// C:\Users\karan\OneDrive\Desktop\insta\instagram-backend\routes\comments.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// We are importing the 'addComment' function we just created.
const { addComment } = require('../controllers/commentController');

// The router now uses the 'addComment' function, which we know exists.
router.post('/', auth, addComment);

module.exports = router;
