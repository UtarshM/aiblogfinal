# Instagram Connection Setup Guide

## The Error You're Seeing
**"Invalid Request: Request parameters are invalid: Invalid platform app"**

This means your Facebook App doesn't have Instagram Basic Display configured.

## Step-by-Step Fix

### Step 1: Open Facebook Developers Console
1. Go to: https://developers.facebook.com/apps/804266739277141/
2. Login with your Facebook account

### Step 2: Add Instagram Basic Display Product
1. In the left sidebar, click **"Add Product"** (or find it in Products section)
2. Scroll down to find **"Instagram Basic Display"**
3. Click **"Set Up"**

### Step 3: Configure Instagram Basic Display Settings
1. Go to **Instagram Basic Display** → **Basic Display** in the left menu
2. Fill in these fields:

| Field | Value |
|-------|-------|
| Valid OAuth Redirect URIs | `http://localhost:3001/api/social/callback/instagram` |
| Deauthorize Callback URL | `http://localhost:3001/api/social/deauth` |
| Data Deletion Request URL | `http://localhost:3001/api/social/delete` |

3. Click **"Save Changes"**

### Step 4: Add Instagram Test User (IMPORTANT!)
Instagram Basic Display requires test users during development:

1. Go to **Roles** → **Instagram Testers** (in left sidebar)
2. Click **"Add Instagram Testers"**
3. Enter your Instagram username (the one you want to connect)
4. Click **"Submit"**

### Step 5: Accept Tester Invitation on Instagram
1. Open Instagram app on your phone
2. Go to **Settings** → **Apps and Websites** → **Tester Invites**
3. Find the invitation from your app
4. Click **"Accept"**

### Step 6: Get Instagram App Credentials
1. Go back to **Instagram Basic Display** → **Basic Display**
2. You'll see:
   - **Instagram App ID** (might be same as Facebook App ID)
   - **Instagram App Secret** (click "Show" to reveal)
3. These are already in your `.env` file

### Step 7: Try Connecting Again
1. Go to: http://localhost:5173/tools/social_media
2. Click on **Instagram** → **Connect**
3. It should now redirect to Instagram login

## Troubleshooting

### Still Getting "Invalid platform app"?
- Make sure you clicked "Save Changes" after adding redirect URIs
- Wait 5 minutes for changes to propagate
- Clear browser cache and try again

### Getting "User not authorized"?
- You haven't accepted the tester invitation on Instagram
- Go to Instagram app → Settings → Apps and Websites → Tester Invites

### Getting "Redirect URI mismatch"?
- The redirect URI in Facebook must EXACTLY match: `http://localhost:3001/api/social/callback/instagram`
- No trailing slash!

## For Production
When you deploy to production:
1. Add your production domain to Valid OAuth Redirect URIs
2. Submit your app for Instagram App Review
3. Request `instagram_basic` and `instagram_content_publish` permissions

## Current Configuration in .env
```
INSTAGRAM_APP_ID=804266739277141
INSTAGRAM_APP_SECRET=96081bd0d2c8aafc8ab5ed5fff56e819
INSTAGRAM_CALLBACK_URL=http://localhost:3001/api/social/callback/instagram
```

## Quick Checklist
- [ ] Instagram Basic Display product added to Facebook App
- [ ] Redirect URI added: `http://localhost:3001/api/social/callback/instagram`
- [ ] Instagram tester added (your Instagram username)
- [ ] Tester invitation accepted on Instagram app
- [ ] Backend server restarted
