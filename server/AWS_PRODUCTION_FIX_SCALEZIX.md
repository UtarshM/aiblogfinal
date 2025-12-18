📄 FILE NAME (IMPORTANT)

Use one of these:

AWS_PRODUCTION_FIX_SCALEZIX.md
AWS_PRODUCTION_FIX_SCALEZIX.txt

📘 DOCUMENT CONTENT (COPY FROM HERE ⬇️)
PROJECT: Scalezix – AI Blog Automation Backend
PURPOSE: AWS EC2 Production Deployment Fix
STACK: Node.js (ES Modules), MongoDB Atlas, PM2, Nginx
ENV: AWS EC2 Ubuntu

1️⃣ CORE RULES (MUST FOLLOW)

Project uses ES Modules

.env must be loaded ONCE and FIRST

MongoDB must connect ONLY after env is loaded

No dotenv usage outside server.js

Backend runs on localhost:3001

PM2 manages the process

2️⃣ ENVIRONMENT VARIABLES (.env)

Location:

/var/www/scalezix-backend/server/.env


Required keys:

NODE_ENV=production
PORT=3001

MONGODB_URI=<mongodb-atlas-uri>
MONGO_URI=<mongodb-atlas-uri>

EMAIL_ENABLED=false
JWT_SECRET=<long_random_secret>


Rules:

No quotes around values

%40 is valid for @ in Mongo URI

Do NOT hardcode secrets in code

3️⃣ server.js (ENTRY POINT – SINGLE SOURCE OF TRUTH)
REQUIRED TOP OF FILE
import 'dotenv/config';

REQUIRED STRUCTURE
import express from 'express';
import connectDB from './database.js';

const app = express();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

RULES

dotenv loaded at line 1

DB connection explicitly called

No DB logic inside imports

No dotenv import anywhere else

4️⃣ database.js (CRITICAL FILE)
❌ REMOVE COMPLETELY
import dotenv from 'dotenv';
dotenv.config();

✅ CORRECT VERSION
import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.error('MongoDB URI missing');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB Atlas connected successfully');
    global.mongoConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    global.mongoConnected = false;
  }
};

export default connectDB;

RULES

No mongoose.connect at top level

Connection happens only via connectDB()

No dotenv usage here

5️⃣ CRON JOBS (cronService.js)
REQUIRED SAFETY
if (!global.mongoConnected) return;


Rules:

Cron starts AFTER DB connect

Cron must not crash app if DB is down

No DB queries at import time

6️⃣ EMAIL SERVICE

Current mode:

EMAIL_ENABLED=false


Rules:

App must boot even if email not configured

No crash on missing credentials

Email can be enabled later safely

7️⃣ PM2 CONFIGURATION (AWS)
START PROCESS
pm2 start server.js --name scalezix-backend
pm2 save

FULL RESET (IF REQUIRED)
pm2 stop scalezix-backend
pm2 delete scalezix-backend
pm2 start server.js --name scalezix-backend
pm2 save


Rules:

No ecosystem files

No duplicate processes

One instance only

8️⃣ NGINX EXPECTATION (NEXT PHASE)

Backend listens on localhost:3001

Nginx reverse proxies domain to port 3001

Backend never binds public IP directly

9️⃣ FINAL AWS SANITY CHECK

All must pass:

node server.js
curl http://localhost:3001/api
pm2 restart scalezix-backend
reboot
pm2 status


Expected logs:

MongoDB Atlas connected successfully
[CRON] Found 0 posts to publish


No errors:

uri parameter must be a string
buffering timed out

✅ FINAL STATUS

When above rules are applied:

Backend is production-stable

MongoDB fully reliable

PM2 restart-safe

AWS-ready



#AWS_PRODUCTION_FIX_SCALEZIX.md Read this and give me the output