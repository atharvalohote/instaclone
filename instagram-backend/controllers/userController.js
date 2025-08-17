// controllers/userController.js
const User = require('../models/User');
const Post = require('../models/Post');

// Get user profile (public)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('followers', 'username avatar')
      .populate('following', 'username avatar');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Get user's posts count
    const postsCount = await Post.countDocuments({ user: req.params.userId });

    const profile = {
      ...user.toObject(),
      postsCount
    };

    res.json(profile);
  } catch (err) {
    console.error('Get User Profile Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Follow/Unfollow user
exports.followUser = async (req, res) => {
  try {
    if (req.user.id === req.params.userId) {
      return res.status(400).json({ msg: 'You cannot follow yourself' });
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(req.params.userId);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(
        id => id.toString() !== req.params.userId
      );
      userToFollow.followers = userToFollow.followers.filter(
        id => id.toString() !== req.user.id
      );
    } else {
      // Follow
      currentUser.following.push(req.params.userId);
      userToFollow.followers.push(req.user.id);
    }

    await currentUser.save();
    await userToFollow.save();

    const updatedUser = await User.findById(req.params.userId)
      .select('-password')
      .populate('followers', 'username avatar')
      .populate('following', 'username avatar');

    res.json(updatedUser);
  } catch (err) {
    console.error('Follow User Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.json([]);
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { bio: { $regex: q, $options: 'i' } }
      ]
    })
    .select('username avatar bio followers following')
    .limit(10);

    res.json(users);
  } catch (err) {
    console.error('Search Users Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const avatar = req.file ? req.file.path : undefined;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (bio) updateFields.bio = bio;
    if (avatar) updateFields.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Update Profile Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get all users (for discovery)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('username avatar bio followers following')
      .limit(20)
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error('Get All Users Error:', err.message);
    res.status(500).send('Server Error');
  }
};
