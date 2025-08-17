const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');
require('dotenv').config();

// Sample users data
const sampleUsers = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: '123456',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Photography enthusiast 📸 | Travel lover ✈️ | Coffee addict ☕'
  },
  {
    username: 'sarah_wilson',
    email: 'sarah@example.com',
    password: '123456',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Fashion blogger 👗 | Lifestyle content creator 💫 | Dog mom 🐕'
  },
  {
    username: 'mike_chen',
    email: 'mike@example.com',
    password: '123456',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech enthusiast 💻 | Fitness lover 💪 | Foodie 🍕'
  },
  {
    username: 'emma_davis',
    email: 'emma@example.com',
    password: '123456',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Artist 🎨 | Nature lover 🌿 | Yoga instructor 🧘‍♀️'
  },
  {
    username: 'alex_rodriguez',
    email: 'alex@example.com',
    password: '123456',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Musician 🎸 | Adventure seeker 🏔️ | Photography lover 📷'
  }
];

// Sample posts data
const samplePosts = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
    caption: 'Amazing sunset at the beach today! 🌅 #sunset #beach #photography',
    likes: ['sarah_wilson', 'mike_chen', 'emma_davis'],
    comments: [
      { text: 'Beautiful shot! 😍', username: 'sarah_wilson' },
      { text: 'Where is this? Looks amazing!', username: 'mike_chen' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=600&fit=crop',
    caption: 'My new furry friend! 🐕 #dog #pet #love',
    likes: ['john_doe', 'alex_rodriguez', 'emma_davis'],
    comments: [
      { text: 'So cute! What\'s his name?', username: 'john_doe' },
      { text: 'Adorable! 🥰', username: 'emma_davis' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1504674900240-9a9049b7d2ce?w=600&h=600&fit=crop',
    caption: 'Delicious homemade pasta! 🍝 #food #cooking #homemade',
    likes: ['sarah_wilson', 'mike_chen', 'alex_rodriguez'],
    comments: [
      { text: 'Recipe please! 😋', username: 'sarah_wilson' },
      { text: 'Looks restaurant quality!', username: 'mike_chen' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop',
    caption: 'Hiking in the mountains today! 🏔️ #hiking #nature #adventure',
    likes: ['john_doe', 'emma_davis', 'alex_rodriguez'],
    comments: [
      { text: 'Stunning views!', username: 'john_doe' },
      { text: 'Wish I was there! 🌲', username: 'emma_davis' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop',
    caption: 'New outfit for the weekend! 👗 #fashion #style #ootd',
    likes: ['john_doe', 'mike_chen', 'alex_rodriguez'],
    comments: [
      { text: 'Love this look! 💕', username: 'john_doe' },
      { text: 'Where did you get it?', username: 'mike_chen' }
    ]
  },
  {
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop',
    caption: 'Healthy breakfast bowl! 🥗 #healthy #breakfast #nutrition',
    likes: ['sarah_wilson', 'emma_davis', 'alex_rodriguez'],
    comments: [
      { text: 'Looks so fresh! 🌱', username: 'sarah_wilson' },
      { text: 'Recipe please!', username: 'emma_davis' }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/instagram-clone');
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
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        avatar: userData.avatar,
        bio: userData.bio
      });
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`Created user: ${userData.username}`);
    }

    // Create posts
    for (let i = 0; i < samplePosts.length; i++) {
      const postData = samplePosts[i];
      const user = createdUsers[i % createdUsers.length]; // Distribute posts among users
      
      // Get user IDs for likes
      const likeUserIds = postData.likes.map(username => 
        createdUsers.find(u => u.username === username)?._id
      ).filter(id => id);

      // Create comments with user references
      const comments = postData.comments.map(comment => ({
        user: createdUsers.find(u => u.username === comment.username)?._id,
        text: comment.text,
        date: new Date()
      })).filter(comment => comment.user);

      const post = new Post({
        user: user._id,
        image: postData.image,
        caption: postData.caption,
        likes: likeUserIds,
        comments: comments
      });
      
      await post.save();
      console.log(`Created post: ${postData.caption.substring(0, 30)}...`);
    }

    // Set up following relationships
    for (const user of createdUsers) {
      const otherUsers = createdUsers.filter(u => u._id.toString() !== user._id.toString());
      const randomFollowing = otherUsers.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      user.following = randomFollowing.map(u => u._id);
      await user.save();
      
      // Add this user to followers of the users they're following
      for (const followedUser of randomFollowing) {
        followedUser.followers.push(user._id);
        await followedUser.save();
      }
      
      console.log(`${user.username} is following ${randomFollowing.length} users`);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${createdUsers.length} users and ${samplePosts.length} posts`);
    
    // Display sample login credentials
    console.log('\n📱 Sample Login Credentials:');
    sampleUsers.forEach(user => {
      console.log(`Username: ${user.username} | Email: ${user.email} | Password: ${user.password}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase();
