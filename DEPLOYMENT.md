# Deployment Guide

This guide will help you deploy your Instagram clone to production.

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Your Repository
1. Make sure your code is pushed to GitHub
2. Ensure all environment variables are properly configured

### Step 2: Deploy to Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `instagram-clone-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `instagram-backend`

### Step 3: Set Environment Variables
In Render dashboard, go to "Environment" tab and add:

```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/instagram-clone?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5002
NODE_ENV=production
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for the build to complete
3. Your backend will be available at: `https://your-app-name.onrender.com`

## 📱 Frontend Deployment

### Option 1: Build APK (Android)
1. Install EAS CLI:
```bash
npm install -g @expo/eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure EAS:
```bash
eas build:configure
```

4. Update `eas.json` for production:
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

5. Build APK:
```bash
eas build --platform android --profile production
```

### Option 2: Build for iOS
```bash
eas build --platform ios --profile production
```

### Option 3: Expo Go (Development)
1. Update `src/utils/config.js` with your Render URL:
```javascript
const PROD_API_URL = 'https://your-app-name.onrender.com/api';
const PROD_SOCKET_URL = 'https://your-app-name.onrender.com';
```

2. Start Expo:
```bash
npx expo start
```

3. Scan QR code with Expo Go app

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account
3. Create a new cluster (M0 Free tier)

### Step 2: Configure Database
1. Create a database user with password
2. Get your connection string
3. Add your IP to whitelist (or use 0.0.0.0/0 for all IPs)

### Step 3: Update Environment Variables
Use your Atlas connection string in your deployment environment variables.

## ☁️ Cloudinary Setup

### Step 1: Create Cloudinary Account
1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. Get your credentials from the dashboard

### Step 2: Configure Environment Variables
Add your Cloudinary credentials to your deployment environment variables.

## 🔧 Alternative Deployment Options

### Backend Alternatives
- **Heroku**: Similar to Render, good for Node.js apps
- **Railway**: Modern deployment platform
- **DigitalOcean App Platform**: Scalable cloud deployment
- **AWS Elastic Beanstalk**: Enterprise-grade deployment

### Frontend Alternatives
- **Expo Application Services**: Official Expo deployment
- **App Store/Play Store**: For production apps
- **TestFlight**: For iOS beta testing
- **Firebase App Distribution**: For Android beta testing

## 🧪 Testing Your Deployment

### Backend Testing
1. Test your API endpoints:
```bash
curl https://your-app-name.onrender.com/api/auth/login
```

2. Check server logs in Render dashboard

### Frontend Testing
1. Test on different devices
2. Verify all features work with production backend
3. Test image uploads and real-time messaging

## 🔒 Security Checklist

- [ ] Environment variables are set in deployment platform
- [ ] No sensitive data in code repository
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] JWT secrets are secure
- [ ] Database connection is secure

## 📊 Monitoring

### Render Monitoring
- View logs in Render dashboard
- Set up alerts for downtime
- Monitor resource usage

### Application Monitoring
- Add logging to your application
- Monitor API response times
- Track user activity

## 🚨 Troubleshooting

### Common Issues
1. **Build fails**: Check build logs and dependencies
2. **Environment variables**: Ensure all required variables are set
3. **Database connection**: Verify MongoDB Atlas configuration
4. **CORS errors**: Update CORS settings for your domain
5. **Image uploads**: Check Cloudinary configuration

### Getting Help
1. Check Render/Expo documentation
2. Review application logs
3. Test locally with production environment variables
4. Open issues on GitHub for specific problems

## 📈 Scaling

### Backend Scaling
- Upgrade Render plan for more resources
- Implement caching (Redis)
- Use CDN for static assets
- Optimize database queries

### Frontend Scaling
- Implement lazy loading
- Optimize bundle size
- Use image compression
- Implement offline capabilities
