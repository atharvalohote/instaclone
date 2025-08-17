# Instagram Clone - Full Stack App

A complete Instagram clone built with React Native (Expo) frontend and Node.js backend.

## 🚀 Quick Setup

### 1. MongoDB Atlas Setup (Free Cloud Database)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user with password
5. Get your connection string
6. Add your IP to the whitelist (or use 0.0.0.0/0 for all IPs)

### 2. Deploy Backend to Render (Free Hosting)
1. Go to [Render](https://render.com/)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secret key
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### 3. Update Frontend Configuration
Update `instagram-frontend/src/utils/config.js` with your Render URL:
```javascript
const PROD_API_URL = 'https://your-app-name.onrender.com/api';
const PROD_SOCKET_URL = 'https://your-app-name.onrender.com';
```

### 4. Build APK
```bash
cd instagram-frontend
eas build --platform android --profile production
```

## 📱 Features
- User authentication (register/login)
- Create and view posts
- Like and comment on posts
- Follow/unfollow users
- Real-time messaging (Socket.IO)
- Instagram-like UI

## 🛠 Tech Stack
- **Frontend**: React Native, Expo, React Navigation
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **File Upload**: Cloudinary
- **Deployment**: Render

## 🔧 Local Development
```bash
# Backend
cd instagram-backend
npm install
npm run dev

# Frontend
cd instagram-frontend
npm install
npm start
```

## 📦 Environment Variables
Create `.env` file in `instagram-backend/`:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5002
```
