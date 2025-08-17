# Instagram Clone

A full-stack Instagram clone built with React Native (Expo) for the frontend and Node.js/Express for the backend. Features real-time messaging, image uploads, and social media functionality.

## 🚀 Features

### Frontend (React Native + Expo)
- 📱 Cross-platform mobile app (iOS & Android)
- 🖼️ Image upload and gallery
- 💬 Real-time messaging with Socket.io
- 👤 User profiles and authentication
- 🔍 Search functionality
- ❤️ Like and comment system
- 📸 Camera integration
- 🎨 Modern UI with custom fonts

### Backend (Node.js + Express)
- 🔐 JWT authentication
- 📊 MongoDB database with Mongoose
- ☁️ Cloudinary image storage
- 🔄 Real-time Socket.io integration
- 📝 RESTful API endpoints
- 🔒 Secure middleware
- 📤 File upload handling

## 🛠️ Tech Stack

### Frontend
- React Native
- Expo
- Socket.io-client
- React Navigation
- AsyncStorage
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- Cloudinary
- JWT
- bcryptjs
- multer

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Expo CLI
- Cloudinary account (for image uploads)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/instagram-clone.git
cd instagram-clone
```

### 2. Backend Setup

```bash
cd instagram-backend
npm install
```

Create a `.env` file in the `instagram-backend/` directory:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/instagram-clone

# JWT Secret for token generation
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port (optional, defaults to 5000)
PORT=5002
```

### 3. Frontend Setup

```bash
cd instagram-frontend
npm install
```

Update the API URLs in `src/utils/config.js` to match your backend URL.

### 4. Database Setup

```bash
cd instagram-backend
node seedData.js
```

This will create sample users and posts for testing.

## 🏃‍♂️ Running the Application

### Backend
```bash
cd instagram-backend
npm start
```

The server will run on `http://localhost:5002`

### Frontend
```bash
cd instagram-frontend
npx expo start
```

Scan the QR code with Expo Go app or run on simulator.

## 📱 Sample Login Credentials

After running the seed script, you can use these test accounts:

- **Username:** john_doe | **Email:** john@example.com | **Password:** 123456
- **Username:** sarah_wilson | **Email:** sarah@example.com | **Password:** 123456
- **Username:** mike_chen | **Email:** mike@example.com | **Password:** 123456
- **Username:** emma_davis | **Email:** emma@example.com | **Password:** 123456
- **Username:** alex_rodriguez | **Email:** alex@example.com | **Password:** 123456

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow user
- `DELETE /api/users/:id/follow` - Unfollow user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get post by ID
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `DELETE /api/posts/:id/like` - Unlike post

### Comments
- `POST /api/posts/:id/comments` - Add comment
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment

### Messages
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages` - Send message

## 🌐 Deployment

### Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy the backend service

### Frontend Deployment
1. Update production URLs in `src/utils/config.js`
2. Build APK: `eas build --platform android`
3. Or build for iOS: `eas build --platform ios`

## 📁 Project Structure

```
insta/
├── instagram-backend/          # Backend API
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── utils/                 # Utility functions
│   └── server.js             # Main server file
├── instagram-frontend/        # React Native app
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context
│   │   ├── hooks/             # Custom hooks
│   │   ├── navigation/        # Navigation setup
│   │   ├── screens/           # App screens
│   │   ├── services/          # API services
│   │   └── utils/             # Utility functions
│   └── App.js                # Main app component
└── README.md                 # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing React Native development platform
- [Socket.io](https://socket.io/) for real-time communication
- [Cloudinary](https://cloudinary.com/) for image storage
- [MongoDB](https://www.mongodb.com/) for the database
- [Unsplash](https://unsplash.com/) for sample images

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
