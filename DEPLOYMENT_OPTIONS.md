# Deployment Options Guide

## Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

### Cost: ~$5/month (Railway) + FREE (Vercel)

### Step 1: Deploy Backend to Railway

1. Go to: https://railway.app/
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose `harshkuhikar/Ai-Automation`
5. Set Root Directory: `server`
6. Add Environment Variables (from your .env)
7. Deploy!

Railway will give you a URL like: `https://ai-automation-production.up.railway.app`

### Step 2: Deploy Frontend to Vercel

1. Go to: https://vercel.com/
2. Click "Add New Project"
3. Import `harshkuhikar/Ai-Automation`
4. Set Root Directory: `.` (root)
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-railway-url.up.railway.app/api`
6. Deploy!

---

## Option 2: Render (Full Stack) - EASIEST

### Cost: FREE tier available, $7/month for always-on

1. Go to: https://render.com/
2. Create "Web Service" for backend
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Create "Static Site" for frontend
   - Build Command: `npm run build`
   - Publish Directory: `dist`

---

## Option 3: AWS EC2 - FULL CONTROL

### Cost: ~$30-40/month

See `AWS_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## Option 4: DigitalOcean App Platform

### Cost: $5/month

1. Go to: https://cloud.digitalocean.com/apps
2. Create App from GitHub
3. Add both components (frontend + backend)

---

## Environment Variables Needed

### Backend (.env)
```
NODE_ENV=production
PORT=3001
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret
GOOGLE_AI_KEY=your-key
OPENROUTER_API_KEY=your-key
SERPAPI_KEY=your-key
EMAIL_USER=your-email
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=https://your-vercel-url.vercel.app
```

### Frontend (Vercel Environment Variables)
```
VITE_API_URL=https://your-backend-url/api
```

---

## Quick Comparison

| Platform | Frontend | Backend | Python | Cost | Ease |
|----------|----------|---------|--------|------|------|
| Vercel + Railway | ✅ | ✅ | ✅ | $5/mo | ⭐⭐⭐⭐ |
| Render | ✅ | ✅ | ✅ | $7/mo | ⭐⭐⭐⭐⭐ |
| AWS EC2 | ✅ | ✅ | ✅ | $30/mo | ⭐⭐⭐ |
| DigitalOcean | ✅ | ✅ | ✅ | $5/mo | ⭐⭐⭐⭐ |
| Vercel Only | ✅ | ❌ | ❌ | FREE | N/A |

---

## My Recommendation

**For your use case (Python + Long tasks + Multiple clients):**

### Best: Railway ($5/mo) + Vercel (FREE)
- Railway handles Python and long-running tasks
- Vercel serves frontend fast with CDN
- Total: ~$5/month
- Auto-deploys from GitHub

### Alternative: Render ($7/mo)
- Single platform for everything
- Easier to manage
- Free tier available (sleeps after 15 min inactivity)
