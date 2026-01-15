# PasteHub Backend Integration Documentation

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Changes](#frontend-changes)
5. [Features Implemented](#features-implemented)
6. [API Documentation](#api-documentation)
7. [Deployment Guide](#deployment-guide)

---

## Overview

This document explains all the changes made to convert your PasteHub application from a localStorage-based app to a full-stack application with MongoDB backend, authentication, and advanced features.

### What Changed
- **Backend**: Added Express.js server with MongoDB
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: MongoDB Atlas (512MB free tier)
- **API Integration**: Frontend now uses REST API instead of localStorage
- **New Features**: Auto-save drafts, expiring pastes, analytics, unique paste IDs

---

## Project Structure

```
NotesSaver/
├── backend/                    # NEW: Backend server
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js            # User model with password hashing
│   │   └── Paste.js           # Paste model with all features
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Authentication routes
│   │   └── pastes.js          # Paste CRUD routes
│   ├── middleware/             # Middleware functions
│   │   └── auth.js            # JWT authentication middleware
│   ├── server.js              # Express server entry point
│   ├── package.json           # Backend dependencies
│   └── .env.example           # Environment variables template
│
├── paste-app/                  # Frontend (React)
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Login.jsx       # NEW: Login page
│   │   │   ├── Register.jsx   # NEW: Register page
│   │   │   ├── Home.jsx       # UPDATED: Now uses API
│   │   │   ├── Paste.jsx      # UPDATED: Now uses API
│   │   │   ├── ViewPaste.jsx  # UPDATED: Now uses API
│   │   │   └── Navbar.jsx     # UPDATED: Added auth buttons
│   │   ├── utils/
│   │   │   └── api.js          # NEW: API utility functions
│   │   └── redux/
│   │       └── pasteSlice.js   # UPDATED: Uses async thunks for API
│   └── .env.example           # NEW: Frontend environment variables
│
└── BACKEND_DOCUMENTATION.md   # This file
```

---

## Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT tokens
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variables
- `express-validator`: Input validation

### Step 2: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create a Free Cluster**
   - Click "Create Deployment"
   - Select "Free" tier (512 MB)
   - Choose a cloud provider (AWS recommended)
   - Select a region close to you
   - Name your cluster (e.g., "Cluster0")
   - Click "Create Deployment"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IPs
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pastehub?retryWrites=true&w=majority`

### Step 3: Configure Environment Variables

1. **Create `.env` file in backend folder:**
```bash
cd backend
cp .env.example .env
```

2. **Edit `.env` file:**
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/pastehub?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_use_random_string
PORT=5000
```

**Important**: 
- Replace `your-username` and `your-password` with your MongoDB credentials
- Replace `cluster0.xxxxx` with your actual cluster URL
- Generate a strong random string for `JWT_SECRET` (you can use: `openssl rand -base64 32`)

### Step 4: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

### Step 5: Test Backend

Open browser and visit: `http://localhost:5000/api/health`

You should see: `{"status":"OK","message":"Server is running"}`

---

## Frontend Changes

### Step 1: Install Frontend Dependencies

No new dependencies needed! All required packages are already installed.

### Step 2: Configure Environment Variables

1. **Create `.env` file in paste-app folder:**
```bash
cd paste-app
# Create .env file manually or copy from .env.example if it exists
```

2. **Add to `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

For production, change this to your deployed backend URL.

### Step 3: Start Frontend

```bash
cd paste-app
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

---

## Features Implemented

### 1. **User Authentication**
- **Registration**: Users can create accounts with username, email, and password
- **Login**: Secure login with JWT tokens
- **Password Security**: Passwords are hashed using bcrypt (10 salt rounds)
- **Token Storage**: JWT tokens stored in localStorage
- **Protected Routes**: Frontend checks authentication before accessing pastes

**Files Changed:**
- `backend/routes/auth.js`: Registration and login endpoints
- `backend/models/User.js`: User schema with password hashing
- `frontend/src/Components/Login.jsx`: Login page
- `frontend/src/Components/Register.jsx`: Registration page
- `frontend/src/utils/api.js`: Auth API functions

### 2. **Unique Paste IDs**
- Each paste gets a unique ID (hexadecimal string)
- When creating a paste with a custom ID, system checks if it already exists
- If duplicate ID found, returns error with existing paste info
- Shareable links use unique IDs

**Implementation:**
- `backend/routes/pastes.js`: Unique ID generation and validation
- Uses `crypto.randomBytes(8).toString('hex')` for random IDs

### 3. **Auto-Save Drafts**
- Automatically saves drafts after 2 seconds of inactivity
- Works for both new and existing pastes
- Shows "Saving draft..." indicator
- Saves as draft by default during auto-save

**Implementation:**
- `frontend/src/Components/Home.jsx`: Auto-save timer with useEffect
- `backend/routes/pastes.js`: `/api/pastes/:id/auto-save` endpoint

### 4. **Expiring Pastes**
- Users can set expiration date/time when creating/editing pastes
- Expired pastes are automatically filtered out
- Cannot view or edit expired pastes
- Expiration date shown in paste list

**Implementation:**
- `backend/models/Paste.js`: `expiresAt` field and `isExpired()` method
- `frontend/src/Components/Home.jsx`: DateTime picker for expiration
- `frontend/src/Components/Paste.jsx`: Shows expiration date

### 5. **Analytics (Paste Views)**
- Tracks number of views for each paste
- Records view history with timestamps and IP addresses
- View count displayed in paste list and view page
- Increments automatically when paste is viewed

**Implementation:**
- `backend/models/Paste.js`: `views` and `viewHistory` fields
- `backend/routes/pastes.js`: `incrementViews()` method
- `backend/routes/pastes.js`: `/api/pastes/:id/analytics` endpoint

### 6. **Shareable Paste Links**
- Each paste has a shareable link using unique ID
- Links work without authentication (public access)
- Share button copies link to clipboard

**Implementation:**
- Uses `uniqueId` field for shareable URLs
- Format: `https://yourdomain.com/pastes/{uniqueId}`

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All paste routes (except viewing by uniqueId) require authentication. Include JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

---

### Auth Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### GET `/api/auth/me`
Get current user info (requires authentication).

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### Paste Endpoints

#### GET `/api/pastes`
Get all pastes for authenticated user.

**Query Parameters:**
- `search` (optional): Search term to filter pastes
- `draft` (optional): Filter by draft status (`true` or `false`)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "pastes": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": "507f1f77bcf86cd799439010",
      "title": "My Paste",
      "content": "Paste content here",
      "uniqueId": "a1b2c3d4e5f6g7h8",
      "isDraft": false,
      "expiresAt": null,
      "views": 10,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### GET `/api/pastes/:id`
Get single paste by ID or uniqueId.

**Response:**
```json
{
  "success": true,
  "paste": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439010",
      "username": "johndoe"
    },
    "title": "My Paste",
    "content": "Paste content here",
    "uniqueId": "a1b2c3d4e5f6g7h8",
    "isDraft": false,
    "expiresAt": null,
    "views": 11,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

#### POST `/api/pastes`
Create a new paste.

**Request Body:**
```json
{
  "title": "My New Paste",
  "content": "Paste content here",
  "isDraft": false,
  "expiresAt": "2024-12-31T23:59:59.000Z",
  "uniqueId": "custom-id-123"  // Optional, auto-generated if not provided
}
```

**Response:**
```json
{
  "success": true,
  "message": "Paste created successfully",
  "paste": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My New Paste",
    "content": "Paste content here",
    "uniqueId": "custom-id-123",
    "isDraft": false,
    "expiresAt": "2024-12-31T23:59:59.000Z",
    "views": 0
  }
}
```

**Error Response (Duplicate ID):**
```json
{
  "success": false,
  "message": "A paste with this ID already exists. Please choose a different ID.",
  "existingPaste": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Existing Paste",
    "uniqueId": "custom-id-123"
  }
}
```

#### PUT `/api/pastes/:id`
Update an existing paste.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "isDraft": false,
  "expiresAt": "2024-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Paste updated successfully",
  "paste": { ... }
}
```

#### DELETE `/api/pastes/:id`
Delete a paste.

**Response:**
```json
{
  "success": true,
  "message": "Paste deleted successfully"
}
```

#### POST `/api/pastes/:id/auto-save`
Auto-save draft (used internally by frontend).

**Request Body:**
```json
{
  "title": "Draft Title",
  "content": "Draft content"
}
```

#### GET `/api/pastes/:id/analytics`
Get paste analytics (views, view history).

**Response:**
```json
{
  "success": true,
  "analytics": {
    "totalViews": 25,
    "viewHistory": [
      {
        "viewedAt": "2024-01-15T10:00:00.000Z",
        "ipAddress": "192.168.1.1"
      }
    ],
    "createdAt": "2024-01-15T09:00:00.000Z",
    "expiresAt": null,
    "isExpired": false
  }
}
```

---

## Deployment Guide

### Backend Deployment (Recommended: Render, Railway, or Heroku)

#### Option 1: Render (Free Tier Available)

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder
   - Build command: `npm install`
   - Start command: `npm start`

3. **Add Environment Variables**
   - In Render dashboard, go to "Environment"
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your secret key
     - `PORT`: 10000 (Render default, or leave empty)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the URL (e.g., `https://your-app.onrender.com`)

#### Option 2: Railway

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Select the `backend` folder

3. **Add Environment Variables**
   - Go to "Variables"
   - Add: `MONGODB_URI`, `JWT_SECRET`, `PORT`

4. **Deploy**
   - Railway auto-deploys on push
   - Get your URL from dashboard

---

### Frontend Deployment (Recommended: Vercel or Netlify)

#### Option 1: Vercel (Recommended)

1. **Create Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Root directory: `paste-app`
   - Framework preset: Vite

3. **Environment Variables**
   - Add: `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com/api`)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Get your URL (e.g., `https://your-app.vercel.app`)

#### Option 2: Netlify

1. **Create Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub repository
   - Build settings:
     - Base directory: `paste-app`
     - Build command: `npm run build`
     - Publish directory: `paste-app/dist`

3. **Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Add: `VITE_API_URL`: Your backend URL

4. **Deploy**
   - Netlify auto-deploys on push

---

### MongoDB Atlas Configuration for Production

1. **Update Network Access**
   - Go to MongoDB Atlas → "Network Access"
   - Add your deployment platform's IP ranges:
     - Render: `0.0.0.0/0` (or specific IPs)
     - Railway: `0.0.0.0/0`
     - Vercel: Check Vercel's IP ranges

2. **Update Connection String**
   - Use the same connection string in production
   - Make sure password is URL-encoded if it contains special characters

---

### Post-Deployment Checklist

- [ ] Backend is accessible (test `/api/health` endpoint)
- [ ] Frontend environment variable `VITE_API_URL` points to backend
- [ ] MongoDB Atlas allows connections from deployment IPs
- [ ] Test registration and login
- [ ] Test creating, viewing, editing, and deleting pastes
- [ ] Test shareable links
- [ ] Test auto-save functionality
- [ ] Test expiring pastes

---

## Key Concepts Explained

### 1. **JWT (JSON Web Tokens)**
- Used for authentication
- Contains user ID and expiration time
- Sent in `Authorization` header: `Bearer <token>`
- Valid for 30 days
- Stored in browser localStorage

### 2. **bcrypt Password Hashing**
- Passwords are NEVER stored in plain text
- Uses bcrypt with 10 salt rounds
- Each password gets unique salt
- Hashing happens before saving to database (in User model pre-save hook)

### 3. **MongoDB Schemas**
- **User Schema**: Stores username, email, hashed password
- **Paste Schema**: Stores paste data, user reference, unique ID, expiration, views

### 4. **Redux Async Thunks**
- Used for API calls in Redux
- Handles loading states and errors
- Updates Redux store with API responses

### 5. **Auto-Save Implementation**
- Uses `useEffect` with timer
- Saves after 2 seconds of inactivity
- Clears timer on component unmount
- Shows "Saving draft..." indicator

### 6. **Unique ID System**
- Generated using `crypto.randomBytes(8).toString('hex')`
- 16-character hexadecimal string
- Checked for uniqueness before saving
- Used in shareable URLs

---

## Troubleshooting

### Backend Issues

**Problem**: Cannot connect to MongoDB
- **Solution**: Check connection string, ensure IP is whitelisted, verify credentials

**Problem**: JWT token errors
- **Solution**: Ensure `JWT_SECRET` is set in `.env` file

**Problem**: CORS errors
- **Solution**: Backend has CORS enabled, but check if frontend URL is correct

### Frontend Issues

**Problem**: API calls fail
- **Solution**: Check `VITE_API_URL` in `.env` file, ensure backend is running

**Problem**: Authentication not working
- **Solution**: Check if token is stored in localStorage, verify JWT_SECRET matches

**Problem**: Auto-save not working
- **Solution**: Check browser console for errors, ensure user is authenticated

---

## Security Best Practices

1. **Never commit `.env` files** - They contain secrets
2. **Use strong JWT_SECRET** - Generate random string
3. **Hash passwords** - Already implemented with bcrypt
4. **Validate input** - Using express-validator
5. **Use HTTPS in production** - Most deployment platforms provide this
6. **Limit MongoDB IP access** - Don't use `0.0.0.0/0` in production if possible

---

## Next Steps / Future Enhancements

- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Add paste syntax highlighting
- [ ] Add paste categories/tags
- [ ] Add paste comments
- [ ] Add user profiles
- [ ] Add paste export (PDF, Markdown)
- [ ] Add rate limiting
- [ ] Add paste encryption option

---

## Support

If you encounter any issues:
1. Check the troubleshooting section
2. Verify all environment variables are set correctly
3. Check browser console and server logs for errors
4. Ensure MongoDB Atlas cluster is running and accessible

---

**Documentation Version**: 1.0  
**Last Updated**: January 2024
