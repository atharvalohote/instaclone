// controllers/userController.js
const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('followers', ['username', 'avatar'])
      .populate('following', ['username', 'avatar']);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get User Profile Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Follow/Unfollow user
exports.followUser = async (req, res) => {
  try {
    if (req.params.userId === req.user.id) {
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

    res.json({ 
      following: currentUser.following,
      followers: userToFollow.followers 
    });
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
      return res.status(400).json({ msg: 'Search query is required' });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    })
    .select('-password')
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
    const avatarUrl = req.file ? req.file.path : null;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (bio) updateFields.bio = bio;
    if (avatarUrl) updateFields.avatar = avatarUrl;

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
