const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts for feed (public)
exports.getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username avatar')
      .populate('likes', 'username')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json(posts);
  } catch (err) {
    console.error('Get Feed Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { caption, image } = req.body;
  
  if (!image) {
    return res.status(400).json({ msg: 'Image URL is required' });
  }

  try {
    const newPost = new Post({
      user: req.user.id,
      image: image,
      caption: caption || ''
    });

    const post = await newPost.save();
    const populatedPost = await Post.findById(post._id)
      .populate('user', 'username avatar')
      .populate('likes', 'username')
      .populate('comments.user', 'username avatar');

    res.json(populatedPost);
  } catch (err) {
    console.error('Create Post Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get posts by specific user
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'username avatar')
      .populate('likes', 'username')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (err) {
    console.error('Get User Posts Error:', err.message);
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

    // Check if user already liked the post
    const alreadyLiked = post.likes.includes(req.user.id);
    
    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    } else {
      // Like
      post.likes.push(req.user.id);
    }

    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('user', 'username avatar')
      .populate('likes', 'username')
      .populate('comments.user', 'username avatar');

    res.json(updatedPost);
  } catch (err) {
    console.error('Like Post Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ msg: 'Comment text is required' });
  }

  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      user: req.user.id,
      text: text,
      date: new Date()
    };

    post.comments.push(newComment);
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('user', 'username avatar')
      .populate('likes', 'username')
      .populate('comments.user', 'username avatar');

    res.json(updatedPost);
  } catch (err) {
    console.error('Comment Post Error:', err.message);
    res.status(500).send('Server Error');
  }
};
  