# Quick Start Guide

Get your PasteHub app running in 5 minutes!

## Step 1: MongoDB Atlas Setup (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create account
3. Create a free cluster:
   - Click "Create Deployment"
   - Select **Free** tier (M0 - 512MB)
   - Choose AWS and a region
   - Name: "Cluster0"
   - Click "Create Deployment"
4. Create database user:
   - Go to "Database Access" → "Add New Database User"
   - Username: `pastehub_user`
   - Password: Create a strong password (save it!)
   - Click "Add User"
5. Whitelist IP:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. Get connection string:
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Add database name: `pastehub`
   - Example: `mongodb+srv://pastehub_user:yourpassword@cluster0.xxxxx.mongodb.net/pastehub?retryWrites=true&w=majority`

## Step 2: Backend Setup (1 minute)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the connection string from Step 1
```

Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://pastehub_user:yourpassword@cluster0.xxxxx.mongodb.net/pastehub?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_key_12345_change_this
PORT=5000
```

```bash
# Start backend server
npm run dev
```

You should see: `Server running on port 5000` and `MongoDB Connected`

## Step 3: Frontend Setup (1 minute)

```bash
# Open new terminal, navigate to frontend
cd paste-app

# Create .env file
```

Create `paste-app/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# Start frontend (if not already running)
npm run dev
```

## Step 4: Test It! (1 minute)

1. Open browser: http://localhost:5173
2. Click "Sign Up" in navbar
3. Create account:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Sign Up"
5. You should be logged in!
6. Create your first paste!

## Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Make sure IP is whitelisted in MongoDB Atlas
- Check if port 5000 is available

### Frontend can't connect to backend
- Check `VITE_API_URL` in `paste-app/.env`
- Make sure backend is running on port 5000
- Check browser console for errors

### MongoDB connection error
- Verify username and password in connection string
- Check Network Access in MongoDB Atlas
- Make sure database name is `pastehub`

## Next Steps

- Read `BACKEND_DOCUMENTATION.md` for detailed info
- Check `CHANGES_SUMMARY.md` for all changes made
- Deploy to production (see deployment guide in documentation)

## Need Help?

Check the troubleshooting section in `BACKEND_DOCUMENTATION.md`
