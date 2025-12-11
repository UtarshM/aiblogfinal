# AWS Deployment Guide - AI Marketing Platform

## Overview
This guide will help you deploy the AI Marketing Platform to AWS with:
- ✅ EC2 instance for hosting
- ✅ Email service (AWS SES or Gmail)
- ✅ MongoDB Atlas (already configured)
- ✅ SSL/HTTPS with Let's Encrypt
- ✅ PM2 for process management
- ✅ Nginx as reverse proxy

---

## Prerequisites

1. AWS Account
2. Domain name (optional but recommended)
3. MongoDB Atlas account (already have)
4. Gmail account for emails (or AWS SES)

---

## Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance
1. Go to AWS Console → EC2 → Launch Instance
2. Choose:
   - **Name**: `ai-marketing-platform`
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: `t2.medium` (minimum) or `t2.large` (recommended)
   - **Key Pair**: Create new or use existing
   - **Security Group**: Create new with these rules:

### 1.2 Security Group Rules
| Type | Port | Source | Description |
|------|------|--------|-------------|
| SSH | 22 | Your IP | SSH access |
| HTTP | 80 | 0.0.0.0/0 | Web traffic |
| HTTPS | 443 | 0.0.0.0/0 | Secure web traffic |
| Custom TCP | 3001 | 0.0.0.0/0 | Backend API |
| Custom TCP | 5173 | 0.0.0.0/0 | Frontend (dev only) |

### 1.3 Allocate Elastic IP
1. Go to EC2 → Elastic IPs → Allocate
2. Associate with your instance
3. Note down the IP address

---

## Step 2: Connect to EC2 & Install Dependencies

```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@YOUR_ELASTIC_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python 3 and pip
sudo apt install -y python3 python3-pip python3-venv

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

---

## Step 3: Clone and Setup Project

```bash
# Create app directory
sudo mkdir -p /var/www/ai-marketing
sudo chown ubuntu:ubuntu /var/www/ai-marketing
cd /var/www/ai-marketing

# Clone your repository (or upload files)
git clone YOUR_REPO_URL .

# Or upload files using SCP:
# scp -i your-key.pem -r ./server ubuntu@YOUR_IP:/var/www/ai-marketing/
# scp -i your-key.pem -r ./src ubuntu@YOUR_IP:/var/www/ai-marketing/

# Install backend dependencies
cd server
npm install

# Install Python dependencies
pip3 install requests python-dotenv

# Install frontend dependencies
cd ..
npm install

# Build frontend for production
npm run build
```

---

## Step 4: Configure Environment Variables

Create production `.env` file:

```bash
cd /var/www/ai-marketing/server
nano .env
```

Add these variables (update with your values):

```env
# Server
NODE_ENV=production
PORT=3001

# MongoDB Atlas (keep your existing connection string)
MONGODB_URI=mongodb+srv://White-Label-AI-Automation:Kuhikar%401122@white-label-ai-automati.7wej9qy.mongodb.net/ai-marketing?retryWrites=true&w=majority

# JWT Secret (CHANGE THIS!)
JWT_SECRET=your-super-secure-random-string-at-least-32-characters

# Frontend URL (update with your domain)
FRONTEND_URL=https://yourdomain.com

# AI API Keys
GOOGLE_AI_KEY=AIzaSyA7tovVOudFMqgchT6zFKyGn_2HW-GtzCM
OPENROUTER_API_KEY=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

# Image API
SERPAPI_KEY=ac020112a790c7c56c0e4d51490ce6965d6e5fefc348f69940432d2ddfe0d0ae

# Email Configuration (Gmail with App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Social Media OAuth (update callback URLs with your domain)
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_CALLBACK_URL=https://yourdomain.com/api/social/callback/linkedin

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=https://yourdomain.com/api/social/callback/facebook

TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_CALLBACK_URL=https://yourdomain.com/api/social/callback/twitter
```

---

## Step 5: Setup Gmail App Password (For Emails)

### 5.1 Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification"

### 5.2 Create App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other" → Enter "AI Marketing Platform"
4. Click "Generate"
5. Copy the 16-character password
6. Use this as `EMAIL_PASSWORD` in `.env`

---

## Step 6: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/ai-marketing
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS (uncomment after SSL setup)
    # return 301 https://$server_name$request_uri;

    # Frontend (React build)
    location / {
        root /var/www/ai-marketing/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # File uploads
    client_max_body_size 50M;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/ai-marketing /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 7: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
# Test renewal:
sudo certbot renew --dry-run
```

---

## Step 8: Start Application with PM2

```bash
cd /var/www/ai-marketing/server

# Start backend
pm2 start server.js --name "ai-marketing-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Run the command it outputs

# View logs
pm2 logs ai-marketing-backend

# Monitor
pm2 monit
```

---

## Step 9: Update Frontend API URL

Before building, update the API URL in your frontend:

```bash
cd /var/www/ai-marketing
nano src/api/client.js
```

Change:
```javascript
const API_BASE = 'https://yourdomain.com/api';
```

Then rebuild:
```bash
npm run build
```

---

## Step 10: DNS Configuration

Point your domain to your Elastic IP:

| Type | Name | Value |
|------|------|-------|
| A | @ | YOUR_ELASTIC_IP |
| A | www | YOUR_ELASTIC_IP |

---

## Maintenance Commands

```bash
# View logs
pm2 logs ai-marketing-backend

# Restart backend
pm2 restart ai-marketing-backend

# Stop backend
pm2 stop ai-marketing-backend

# Check status
pm2 status

# Update code
cd /var/www/ai-marketing
git pull
cd server && npm install
pm2 restart ai-marketing-backend

# Rebuild frontend
npm run build
```

---

## Troubleshooting

### Backend not starting
```bash
pm2 logs ai-marketing-backend --lines 100
```

### MongoDB connection issues
- Check if your IP is whitelisted in MongoDB Atlas
- Go to MongoDB Atlas → Network Access → Add IP Address → Allow from anywhere (0.0.0.0/0)

### Email not sending
- Verify Gmail App Password is correct
- Check if "Less secure app access" is needed
- Try AWS SES for production

### SSL certificate issues
```bash
sudo certbot renew --force-renewal
sudo systemctl restart nginx
```

---

## Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS only (redirect HTTP)
- [ ] Keep MongoDB Atlas IP whitelist updated
- [ ] Regularly update dependencies
- [ ] Enable AWS CloudWatch for monitoring
- [ ] Set up automated backups for MongoDB
- [ ] Use AWS WAF for additional security

---

## Cost Estimate (Monthly)

| Service | Cost |
|---------|------|
| EC2 t2.medium | ~$30-40 |
| Elastic IP | Free (if attached) |
| MongoDB Atlas (M0) | Free |
| SSL (Let's Encrypt) | Free |
| **Total** | **~$30-40/month** |

---

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check MongoDB Atlas connection
4. Verify all environment variables are set
