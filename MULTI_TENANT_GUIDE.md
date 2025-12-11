# Multi-Tenant Architecture Guide

## Your Question Answered

**Q: I have many clients. Each needs their own private data. The .env has my Facebook/Instagram IDs - is that a problem?**

**A: NO PROBLEM!** Here's why:

---

## How It Works (Already Built!)

### 1. Your .env Contains ONLY App Credentials (Not Personal Accounts)

The Facebook/Instagram/LinkedIn IDs in `.env` are **APP CREDENTIALS**, not personal accounts:

```env
# These are YOUR APP credentials (like a master key)
FACEBOOK_APP_ID=804266739277141      # Your Facebook Developer App
LINKEDIN_CLIENT_ID=771m5xwka7c78x    # Your LinkedIn Developer App
```

These are like "API keys" that allow your platform to connect to Facebook/LinkedIn APIs. They are NOT your personal Facebook account.

### 2. Each Client Connects Their OWN Accounts

When a client clicks "Connect Facebook" or "Connect LinkedIn":
1. They are redirected to Facebook/LinkedIn login
2. They login with THEIR OWN account
3. Their access token is saved to YOUR database (linked to their user ID)
4. They can only post to THEIR accounts

**Your credentials are NEVER shared with clients!**

---

## Database Structure (Already Implemented)

```
MongoDB Database
├── Users Collection
│   ├── User 1 (Client A)
│   │   ├── email: client-a@company.com
│   │   ├── password: (hashed)
│   │   └── plan: "professional"
│   │
│   └── User 2 (Client B)
│       ├── email: client-b@company.com
│       ├── password: (hashed)
│       └── plan: "starter"
│
├── ConnectedAccounts Collection
│   ├── Client A's Facebook
│   │   ├── userId: "client-a-id"
│   │   ├── platform: "facebook"
│   │   ├── accessToken: "client-a-facebook-token"
│   │   └── pageId: "client-a-page-id"
│   │
│   ├── Client A's LinkedIn
│   │   ├── userId: "client-a-id"
│   │   ├── platform: "linkedin"
│   │   └── accessToken: "client-a-linkedin-token"
│   │
│   └── Client B's Facebook
│       ├── userId: "client-b-id"
│       ├── platform: "facebook"
│       └── accessToken: "client-b-facebook-token"
│
├── Content Collection
│   ├── Client A's content (userId: "client-a-id")
│   └── Client B's content (userId: "client-b-id")
│
└── WordPressSites Collection
    ├── Client A's WordPress sites
    └── Client B's WordPress sites
```

---

## Privacy & Security (Already Implemented)

### ✅ Data Isolation
- Every API request checks `userId` from JWT token
- Client A can NEVER see Client B's data
- Each query filters by `userId`

### ✅ Token Security
- Each client's social media tokens are stored separately
- Tokens are linked to their `userId`
- When posting, system uses THEIR token, not yours

### ✅ Example Code (Already in your app)

```javascript
// When Client A posts to Facebook
const account = await ConnectedAccount.findOne({
    userId: req.user.userId,  // Client A's ID from JWT
    platform: 'facebook',
    connected: true
});

// Uses Client A's token, not yours!
await postToFacebook(account.accessToken, content);
```

---

## What You Need to Do

### 1. Keep Your App Credentials Secret
Your `.env` file should NEVER be committed to GitHub:

```gitignore
# .gitignore
server/.env
```

### 2. Each Client Signs Up & Connects Their Own Accounts
1. Client visits your website
2. Signs up with their email
3. Verifies email with OTP
4. Goes to Social Media section
5. Clicks "Connect Facebook" → Logs in with THEIR Facebook
6. Clicks "Connect LinkedIn" → Logs in with THEIR LinkedIn
7. Now they can post to THEIR accounts only

### 3. Your App Credentials Enable OAuth
- Your Facebook App ID allows the OAuth flow
- But the ACCESS TOKEN belongs to each client
- You never see their Facebook password
- They never see your App credentials

---

## Visual Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR PLATFORM                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  .env (Server Only - Never Exposed)                 │    │
│  │  FACEBOOK_APP_ID=xxx (Your Developer App)           │    │
│  │  LINKEDIN_CLIENT_ID=xxx (Your Developer App)        │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  OAuth Flow (Using Your App Credentials)            │    │
│  │  1. Client clicks "Connect Facebook"                │    │
│  │  2. Redirects to Facebook login                     │    │
│  │  3. Client logs in with THEIR account               │    │
│  │  4. Facebook returns access token                   │    │
│  │  5. Token saved to DB (linked to client's userId)   │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  MongoDB Database                                   │    │
│  │  ┌─────────────────┐  ┌─────────────────┐          │    │
│  │  │ Client A Data   │  │ Client B Data   │          │    │
│  │  │ - Their FB token│  │ - Their FB token│          │    │
│  │  │ - Their content │  │ - Their content │          │    │
│  │  │ - Their WP sites│  │ - Their WP sites│          │    │
│  │  └─────────────────┘  └─────────────────┘          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

| Item | Who Owns It | Where Stored | Who Can Access |
|------|-------------|--------------|----------------|
| Facebook App ID | YOU | .env (server) | Only server |
| Client's FB Token | CLIENT | MongoDB | Only that client |
| Client's Content | CLIENT | MongoDB | Only that client |
| Client's WP Sites | CLIENT | MongoDB | Only that client |

**Your clients are completely isolated. They use YOUR platform but connect THEIR accounts.**

---

## Checklist

- [x] Multi-tenant database structure ✅
- [x] User authentication with JWT ✅
- [x] Data isolation by userId ✅
- [x] OAuth flow for social accounts ✅
- [x] Each client connects their own accounts ✅
- [ ] Add `.env` to `.gitignore` (do this now!)
