# GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `instagram-clone`
   - **Description**: `A full-stack Instagram clone built with React Native and Node.js`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Verify Upload

1. Go to your GitHub repository URL
2. You should see all your files uploaded
3. Check that the `.env` file is NOT visible (it should be ignored)

## Step 4: Set Up GitHub Pages (Optional)

If you want to showcase your project:

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "Pages"
4. Select "Deploy from a branch"
5. Choose "main" branch and "/docs" folder
6. Click "Save"

## Security Checklist ✅

- [ ] `.env` file is NOT uploaded to GitHub
- [ ] `env.atlas` file is NOT uploaded to GitHub
- [ ] No real API keys or secrets are exposed
- [ ] Configuration files use placeholder values
- [ ] README.md contains setup instructions
- [ ] .gitignore files are properly configured

## Next Steps

1. **Deploy Backend**: Use Render, Heroku, or Railway
2. **Update Frontend Config**: Change API URLs to your deployed backend
3. **Set Environment Variables**: Add real credentials to your deployment platform
4. **Test the App**: Make sure everything works with the new URLs

## Environment Variables for Deployment

When you deploy, you'll need to set these environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5002
```

## Support

If you encounter any issues:
1. Check the README.md for detailed setup instructions
2. Open an issue on GitHub
3. Make sure all environment variables are properly set
