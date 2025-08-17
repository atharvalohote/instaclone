// C:\Users\karan\OneDrive\Desktop\insta\instagram-backend\routes\messages.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import the controller function
const { getMessages } = require('../controllers/messageController');

// Use the function as the callback
router.get('/', auth, getMessages);

module.exports = router;
