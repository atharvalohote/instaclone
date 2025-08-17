const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sampleUsers = [
  {
    username: 'sarah_photographer',
    email: 'sarah@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Professional photographer 📸 | Travel enthusiast ✈️'
  },
  {
    username: 'mike_fitness',
    email: 'mike@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Fitness coach 💪 | Healthy living advocate 🥗'
  },
  {
    username: 'emma_artist',
    email: 'emma@example.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital artist 🎨 | Creative soul ✨'
  }
];

const samplePosts = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    caption: 'Sunset vibes 🌅 #photography #nature #sunset'
  },
  {
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=600&fit=crop',
    caption: 'Morning workout complete! 💪 #fitness #motivation #health'
  },
  {
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop',
    caption: 'New artwork in progress 🎨 #art #creative #digitalart'
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop',
    caption: 'Forest adventure today 🌲 #nature #adventure #outdoors'
  },
  {
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
    caption: 'Coffee and creativity ☕️ #coffee #morning #inspiration'
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    caption: 'Another beautiful day! 🌞 #photography #life #beautiful'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.username}`);
    }

    // Create posts
    for (let i = 0; i < samplePosts.length; i++) {
      const postData = samplePosts[i];
      const user = createdUsers[i % createdUsers.length]; // Distribute posts among users
      
      const post = new Post({
        user: user._id,
        image: postData.image,
        caption: postData.caption
      });
      await post.save();
      console.log(`Created post: ${postData.caption.substring(0, 30)}...`);
    }

    // Set up following relationships
    for (let i = 0; i < createdUsers.length; i++) {
      const currentUser = createdUsers[i];
      const followingUsers = createdUsers.filter((_, index) => index !== i);
      
      currentUser.following = followingUsers.map(user => user._id);
      await currentUser.save();
      console.log(`${currentUser.username} is now following ${followingUsers.length} users`);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
