const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    if (!image) {
      return res.status(400).json({ msg: 'Image URL is required' });
    }

    const newPost = new Post({
      user: req.user.id,
      image: image,
      caption: caption || ''
    });

    const post = await newPost.save();
    await post.populate('user', ['username', 'avatar']);

    res.json(post);
  } catch (err) {
    console.error('Create Post Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get feed posts (posts from followed users)
exports.getFeedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const following = user.following || [];
    
    // Get posts from user and followed users
    const posts = await Post.find({
      user: { $in: [req.user.id, ...following] }
    })
    .populate('user', ['username', 'avatar'])
    .populate('comments.user', ['username', 'avatar'])
    .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error('Get Feed Posts Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Like/Unlike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    console.error('Like Post Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ msg: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      user: req.user.id,
      text: text
    };

    post.comments.unshift(newComment);
    await post.save();
    
    await post.populate('comments.user', ['username', 'avatar']);
    
    res.json(post);
  } catch (err) {
    console.error('Comment Post Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', ['username', 'avatar'])
      .populate('comments.user', ['username', 'avatar'])
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error('Get User Posts Error:', err.message);
    res.status(500).send('Server Error');
  }
};
  