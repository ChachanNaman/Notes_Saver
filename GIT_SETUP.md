# Git Repository Setup Guide

## ✅ What I've Done

1. ✅ Initialized git repository in your project
2. ✅ Connected to your GitHub repo: https://github.com/ChachanNaman/Notes_Saver
3. ✅ Created `.gitignore` file to protect sensitive files (`.env` files, etc.)

## 📋 Current Status

Your local repository is now connected to GitHub. You have:
- **New backend folder** (not in GitHub yet)
- **Updated frontend** (with API integration)
- **Documentation files** (BACKEND_DOCUMENTATION.md, etc.)

## 🚀 Next Steps to Push Your Code

### Option 1: Add Everything (Recommended if you want to replace old version)

```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver

# Add all files
git add .

# Commit with a message
git commit -m "Add MongoDB backend, authentication, and full-stack features"

# Push to GitHub
git push origin main
```

### Option 2: Pull First, Then Merge (If you want to keep old frontend code)

```bash
cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver

# Pull existing code from GitHub
git pull origin main --allow-unrelated-histories

# Resolve any conflicts if they occur
# Then add and commit
git add .
git commit -m "Merge backend with existing frontend"
git push origin main
```

## ⚠️ Important Notes

### Files That Will NOT Be Committed (Protected by .gitignore)

- ✅ `.env` files (your MongoDB connection string and secrets)
- ✅ `node_modules/` (dependencies)
- ✅ Log files
- ✅ Temporary files

### Files That WILL Be Committed

- ✅ All source code
- ✅ Documentation files
- ✅ Configuration files (package.json, etc.)
- ✅ Scripts (start.sh, stop.sh)

## 🔒 Security Reminder

**NEVER commit:**
- `.env` files
- Passwords or API keys
- MongoDB connection strings with passwords

These are already in `.gitignore`, so you're safe!

## 📝 Recommended Commit Message

```bash
git add .
git commit -m "feat: Add MongoDB backend with authentication

- Add Express.js backend server
- Implement JWT authentication with bcrypt
- Add MongoDB Atlas integration
- Update frontend to use API instead of localStorage
- Add auto-save drafts feature
- Add expiring pastes functionality
- Add analytics (view tracking)
- Add comprehensive documentation"
```

## 🎯 Quick Commands

```bash
# Check status
git status

# See what files will be added
git status --short

# Add all files
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

## 🔍 If You Get Errors

### "Updates were rejected"
```bash
git pull origin main --rebase
git push origin main
```

### "Merge conflicts"
Resolve conflicts in the files, then:
```bash
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```
