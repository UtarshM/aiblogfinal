# Render Deployment Guide (Free Forever)

## Step 1: Create Render Account
1. Go to: https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email

## Step 2: Deploy Backend to Render

### 2.1: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub account if not already connected
3. Select repository: `harshkuhikar/Ai-Automation`
4. Click "Connect"

### 2.2: Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| Name | `ai-marketing-api` |
| Region | Oregon (US West) |
| Branch | `main` |
| Root Directory | `server` |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Instance Type | `Free` |

### 2.3: Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these variables (get values from your local server/.env file):

```
NODE_ENV = production
PORT = 3001
MONGODB_URI = <your_mongodb_uri>
JWT_SECRET = <your_jwt_secret>
OPENROUTER_API_KEY = <your_openrouter_key>
GOOGLE_AI_KEY = <your_google_ai_key>
SERPAPI_KEY = <your_serpapi_key>
BREVO_API_KEY = <your_brevo_api_key>
BREVO_EMAIL = <your_email>
GOOGLE_CLIENT_ID = <your_google_client_id>
GOOGLE_CLIENT_SECRET = <your_google_client_secret>
FRONTEND_URL = https://ai-automation-ten-pi.vercel.app
```

### 2.4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. Your backend URL will be: `https://ai-marketing-api.onrender.com`

## Step 3: Update Frontend (Vercel)

### 3.1: Update API URL
The code is already updated to use Render backend URL.

### 3.2: Push to GitHub
Vercel will automatically redeploy when you push to GitHub.

## Step 4: Update Google OAuth Redirect URI

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID
3. Add to "Authorized redirect URIs":
   ```
   https://ai-marketing-api.onrender.com/api/auth/google/callback
   ```
4. Save

## Step 5: Test Your Deployment

1. Backend Health Check: `https://ai-marketing-api.onrender.com/api/health`
2. Frontend: `https://ai-automation-ten-pi.vercel.app`

## Important Notes

### Free Tier Limitations
- Server sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- 750 hours/month (enough for 24/7 if only one service)

### Keep Server Awake (Optional)
Use a free cron service to ping your server every 14 minutes:
1. Go to: https://cron-job.org
2. Create free account
3. Add new cron job:
   - URL: `https://ai-marketing-api.onrender.com/api/health`
   - Schedule: Every 14 minutes

## Troubleshooting

### Deployment Failed?
- Check Render logs for errors
- Verify all environment variables are set correctly
- Make sure `server/package.json` has correct dependencies

### API Not Working?
- Check if server is awake (first request may take 30 sec)
- Verify CORS is allowing your Vercel domain
- Check browser console for errors

## Your URLs

| Service | URL |
|---------|-----|
| Backend API | https://ai-marketing-api.onrender.com/api |
| Frontend | https://ai-automation-ten-pi.vercel.app |
| Health Check | https://ai-marketing-api.onrender.com/api/health |
