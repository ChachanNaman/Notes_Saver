# NotesSaver – Deployment Guide (Beginner-Friendly)

You bought **notesaver.info**. This guide takes you from zero to a live website, step by step. No prior experience with Vercel, Render, or deployment needed.

---

## Should you buy the cart you have?

**Short answer:** Yes, but **turn OFF “Full Domain Protection”** before checkout.

- **notesaver.info at ₹139 for 1 year** – Good. The name fits your app.
- **Renewal ₹2,999 next year** – Be aware. You can decide later whether to renew or move the domain.
- **Full Domain Protection (₹599/year)** – **Turn this OFF.** It’s optional. For a small project you don’t need it; it will add ₹599 every year. You can always add it later if you want.
- **Professional Email** – Keep it unchecked. You’re not using GoDaddy for hosting.

**So:** Keep the domain, remove Domain Protection, then checkout. Your total should be around **₹139** (plus tax).

---

## Big picture: what we’re going to do

Your app has 3 parts:

| Part | What it is | Where it will live (all free tier) |
|------|------------|------------------------------------|
| **Frontend** | The React website users see | **Vercel** |
| **Backend** | Node.js API (auth, pastes) | **Render** |
| **Database** | MongoDB (users, pastes) | **MongoDB Atlas** |

You will:

1. Put your code on **GitHub** (if not already).
2. Create a free **MongoDB Atlas** database and get a connection string.
3. Deploy the **backend** on **Render** and get a URL like `https://notesaver-api.onrender.com`.
4. Deploy the **frontend** on **Vercel** and get a URL like `https://notesaver.vercel.app`.
5. Connect your **notesaver.info** domain to Vercel so people open your site at **notesaver.info**.

We’ll do it in that order. Take it one step at a time.

---

## Step 0: Get your code on GitHub

If your project is already on GitHub, skip to Step 1.

1. Go to **https://github.com** and sign in (or create an account).
2. Click the **+** (top right) → **New repository**.
3. Name it e.g. **notesaver**, leave it empty (no README, no .gitignore).
4. Click **Create repository**.
5. On your Mac, open Terminal, go to your project folder:
   ```bash
   cd /Users/namanchachan/Desktop/PROJECTS/NotesSaver
   ```
6. If this folder is not yet a git repo, run:
   ```bash
   git init
   ```
7. Add GitHub as remote (replace `YOUR_USERNAME` with your GitHub username):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/notesaver.git
   ```
8. Add all files, commit, and push:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```
   If it asks for login, use your GitHub username and a **Personal Access Token** as password (GitHub → Settings → Developer settings → Personal access tokens).

After this, your NotesSaver code should be on GitHub.

---

## Step 1: MongoDB Atlas (free database)

1. Go to **https://www.mongodb.com/cloud/atlas** and sign up (free).
2. Create a **free cluster** (e.g. choose a region near you, keep M0 FREE).
3. **Create a database user:**
   - In the left menu: **Database Access** → **Add New Database User**.
   - Choose **Password** authentication, set a username and password (save them somewhere safe).
   - Role: **Atlas admin** (or **Read and write to any database**).
   - Click **Add User**.
4. **Allow access from anywhere:**
   - Left menu: **Network Access** → **Add IP Address**.
   - Click **Allow Access from Anywhere** (this adds `0.0.0.0/0`). Confirm.
   - This is needed so Render can connect to your DB.
5. **Get the connection string:**
   - Left menu: **Database** → click **Connect** on your cluster.
   - Choose **Connect your application**.
   - Copy the connection string. It looks like:
     ```
     mongodb+srv://USERNAME:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual DB user password (and remove the `<>`).
   - Optional: add a database name before `?`:
     ```
     mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/notesaver?retryWrites=true&w=majority
     ```
   - Save this string; you’ll use it in Render as `MONGODB_URI`.

---

## Step 2: Deploy backend on Render

1. Go to **https://render.com** and sign up (use “Sign up with GitHub” so it can see your repo).
2. **New → Web Service**.
3. Connect your **notesaver** repo (authorize if asked). Select the repo and click **Connect**.
4. **Settings:**
   - **Name:** e.g. `notesaver-api`.
   - **Region:** pick one close to you.
   - **Root Directory:** click **Edit** and set to `backend` (so Render uses only the backend folder).
   - **Runtime:** **Node**.
   - **Build Command:** `npm install`.
   - **Start Command:** `npm start`.
5. **Environment variables** (click **Add Environment Variable** for each):

   | Key | Value |
   |-----|--------|
   | `MONGODB_URI` | Your full MongoDB connection string from Step 1 |
   | `JWT_SECRET` | Any long random string (e.g. 32+ characters). You can generate one at https://randomkeygen.com/ (Code 128-bit) |
   | `ALLOWED_ORIGINS` | `https://notesaver.info,https://www.notesaver.info` (we’ll add the Vercel URL later too) |

   For now you can also add:  
   `ALLOWED_ORIGINS` = `https://notesaver.info,https://www.notesaver.info,https://notesaver.vercel.app`  
   so both your domain and the default Vercel URL work.

6. Click **Create Web Service**. Render will build and deploy. Wait until the status is **Live**.
7. At the top you’ll see your service URL, e.g. **https://notesaver-api.onrender.com**. Copy it.
8. Your **API base URL** is that URL + `/api`, e.g. **https://notesaver-api.onrender.com/api**. Save it; you’ll use it in Vercel.

---

## Step 3: Deploy frontend on Vercel

1. Go to **https://vercel.com** and sign up (use “Continue with GitHub”).
2. Click **Add New… → Project**.
3. Import your **notesaver** repo (select it and click **Import**).
4. **Configure Project:**
   - **Root Directory:** click **Edit** → set to `paste-app` → **Continue**.
   - **Framework Preset:** Vite (Vercel usually detects it).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** `dist` (default).
5. **Environment variables:** click **Environment Variables**, then add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://notesaver-api.onrender.com/api` (use your real Render URL from Step 2 + `/api`).
   - Add for **Production** (and optionally Preview).
6. Click **Deploy**. Wait until the deployment finishes.
7. You’ll get a URL like **https://notesaver.vercel.app**. Open it and test: register, login, create a paste. If that works, frontend and backend are both live.

---

## Step 4: Connect your domain (notesaver.info) to Vercel

Now we make **notesaver.info** open your Vercel app.

1. In **Vercel**, open your project → **Settings** → **Domains**.
2. Under “Domain”, type **notesaver.info** and click **Add**.
3. Also add **www.notesaver.info**.
4. Vercel will show you what to do in GoDaddy. Usually it’s:
   - For **notesaver.info** (root): add an **A** record:
     - **Type:** A  
     - **Name:** `@`  
     - **Value:** `76.76.21.21` (or the IP Vercel shows)
   - For **www.notesaver.info**: add a **CNAME** record:
     - **Type:** CNAME  
     - **Name:** `www`  
     - **Value:** `cname.vercel-dns.com` (or what Vercel shows)
5. In **GoDaddy**: go to **My Products** → your domain **notesaver.info** → **DNS** or **Manage DNS**.
6. Add the **A** and **CNAME** records exactly as Vercel says (you can remove or leave default A/CNAME for @ if GoDaddy had something else; follow Vercel’s instructions).
7. Wait 5–60 minutes. In Vercel **Domains**, the domain will show as verified when DNS is correct.
8. Open **https://notesaver.info** in your browser. You should see your NotesSaver app.

Your API will still be at **https://notesaver-api.onrender.com**. That’s fine. The frontend on notesaver.info will call that URL (because of `VITE_API_URL`).

---

## Step 5: (Optional) Use api.notesaver.info for the backend

If you want a nice URL like **api.notesaver.info** instead of **notesaver-api.onrender.com**:

1. **Render:** Your service → **Settings** → **Custom Domains** → add **api.notesaver.info**. Render will show a CNAME target (e.g. `notesaver-api.onrender.com`).
2. **GoDaddy DNS:** Add a **CNAME** record:
   - **Name:** `api`
   - **Value:** the CNAME target Render gave you.
3. After it’s verified in Render, update:
   - **Vercel:** Environment variable `VITE_API_URL` = `https://api.notesaver.info/api`. Redeploy.
   - **Render:** Environment variable `ALLOWED_ORIGINS` = `https://notesaver.info,https://www.notesaver.info`. Redeploy.

Then your app will use **api.notesaver.info** for the API. You can do this later; the site works without it.

---

## Checklist (quick reference)

- [ ] Code on GitHub.
- [ ] MongoDB Atlas: cluster, user, network `0.0.0.0/0`, connection string copied.
- [ ] Render: Web Service, root `backend`, env vars `MONGODB_URI`, `JWT_SECRET`, `ALLOWED_ORIGINS`. Service is Live.
- [ ] Vercel: Project, root `paste-app`, env var `VITE_API_URL` = `https://your-render-url.onrender.com/api`. Deploy works.
- [ ] GoDaddy: Domain Protection turned OFF, cart ~₹139, purchase done.
- [ ] GoDaddy DNS: A record for `@`, CNAME for `www` as per Vercel. Domain verified in Vercel.
- [ ] Test: open https://notesaver.info, register, login, create and view a paste.

---

## If something breaks

- **“Failed to fetch” / network error on the site:**  
  Check `VITE_API_URL` in Vercel (must be exactly your Render URL + `/api`). Check Render service is **Live**. Check `ALLOWED_ORIGINS` on Render includes `https://notesaver.info` and `https://www.notesaver.info`.

- **Render build fails:**  
  Make sure **Root Directory** is `backend` and **Start Command** is `npm start`.

- **Vercel build fails:**  
  Make sure **Root Directory** is `paste-app` and **Build Command** is `npm run build`.

- **MongoDB connection error on Render:**  
  Check `MONGODB_URI` (password encoded correctly, no `<>` left). Check Atlas **Network Access** has `0.0.0.0/0`.

- **Domain not loading:**  
  DNS can take up to 48 hours (often 10–30 minutes). Double-check A and CNAME in GoDaddy match Vercel’s instructions.

You’re not expected to know Vercel or Render beforehand; just follow the steps in order. If you tell me which step you’re on and what you see (or the error message), we can fix it step by step.
