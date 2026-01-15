# MongoDB Connection Fix Guide

## Issue: DNS Resolution Error (querySrv ENOTFOUND)

This error means your computer can't find the MongoDB cluster. Let's fix it!

## Step 1: Verify Cluster is Running

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click on your **Cluster0** (or whatever your cluster is named)
3. Make sure it shows **"Running"** status (green indicator)
4. If it says "Creating" or "Paused", wait for it to finish

## Step 2: Get Fresh Connection String

1. In MongoDB Atlas, click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and version **"6.7 or later"**
4. **Copy the connection string** (it will look like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
   ```

## Step 3: Update Your .env File

1. Replace `<password>` with your actual password: `v0SBM47YufggWbr1`
2. Add database name: Change `/?appName=Cluster0` to `/pastehub?retryWrites=true&w=majority`
3. Final connection string should be:
   ```
   mongodb+srv://namanchachan88_db_user:v0SBM47YufggWbr1@cluster0.xxxxx.mongodb.net/pastehub?retryWrites=true&w=majority
   ```

## Step 4: Update Backend .env

```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver/backend
# Edit .env file and update MONGODB_URI with the fresh connection string
```

## Step 5: Test Connection

```bash
npm start
```

You should see:
- ✅ `MongoDB Connected: cluster0.xxxxx.mongodb.net`
- ✅ `Server running on port 5001`

## Alternative: Check Cluster Name

The cluster name in your connection string is `cluster0.qcgaolx.mongodb.net`

Make sure:
1. Your cluster in Atlas is actually named "Cluster0"
2. The cluster is in the same project
3. The cluster status is "Running" (not "Creating" or "Paused")

## Still Not Working?

1. **Wait 5-10 minutes** - New clusters can take time to fully provision
2. **Check cluster status** - Make sure it's not paused
3. **Try a different network** - Sometimes DNS issues are network-specific
4. **Verify IP whitelist** - Make sure `0.0.0.0/0` is still in your IP Access List
