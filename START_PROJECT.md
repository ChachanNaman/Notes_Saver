# How to Start Your PasteHub Project

## Quick Start Guide (After Restarting Your Laptop)

Follow these steps every time you want to run your project:

---

## Step 1: Start Backend Server

Open a terminal and run:

```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver/backend
npm start
```

**What you should see:**
```
MongoDB Connected: cluster0.qcgao1x.mongodb.net
Server running on port 5001
```

**Keep this terminal open!** The backend needs to keep running.

---

## Step 2: Start Frontend Server

Open a **NEW terminal window** (keep the backend terminal running) and run:

```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver/paste-app
npm run dev
```

**What you should see:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Keep this terminal open too!**

---

## Step 3: Open Your Browser

Open your browser and go to:
```
http://localhost:5173
```

---

## That's It! 🎉

Your app is now running!

---

## Troubleshooting

### Backend won't start?

**Check MongoDB connection:**
- Make sure your internet is connected
- Verify MongoDB Atlas cluster is running (check https://cloud.mongodb.com)
- If you see connection errors, wait 1-2 minutes and try again

**Check if port 5001 is available:**
```bash
lsof -i :5001
```
If something is using the port, kill it or change PORT in `backend/.env`

### Frontend won't start?

**Check if backend is running first:**
- Backend must be running before frontend
- Make sure backend shows "MongoDB Connected"

**Check if port 5173 is available:**
```bash
lsof -i :5173
```

### Can't connect to MongoDB?

1. Check your internet connection
2. Verify IP is whitelisted in MongoDB Atlas:
   - Go to: https://cloud.mongodb.com
   - Click "Network Access" in left sidebar
   - Make sure `0.0.0.0/0` is in the list
3. Check cluster status - make sure it's "Running" (not "Paused")

---

## Quick Commands Reference

### Start Backend
```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver/backend
npm start
```

### Start Frontend (in new terminal)
```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver/paste-app
npm run dev
```

### Stop Servers
- Press `Ctrl + C` in each terminal window to stop the servers

### Check if servers are running
```bash
# Check backend
curl http://localhost:5001/api/health

# Check frontend (just open browser to http://localhost:5173)
```

---

## Development Mode (Auto-restart)

If you want the backend to auto-restart when you make changes:

```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver/backend
npm run dev  # Instead of npm start
```

This uses `node --watch` to automatically restart on file changes.

---

## Summary

**Every time you start your project:**

1. ✅ Terminal 1: `cd backend && npm start`
2. ✅ Terminal 2: `cd paste-app && npm run dev`
3. ✅ Browser: Open `http://localhost:5173`

**That's all you need to do!** 🚀
