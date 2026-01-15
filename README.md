# PasteHub - Full-Stack Paste Application

A modern paste application with MongoDB backend, user authentication, and advanced features like auto-save drafts, expiring pastes, and analytics.

## Features

- ✅ User Authentication (Register/Login with JWT)
- ✅ Secure Password Hashing (bcrypt)
- ✅ Unique Paste IDs with Duplicate Detection
- ✅ Auto-Save Drafts
- ✅ Expiring Pastes
- ✅ Shareable Paste Links
- ✅ Analytics (View Tracking)
- ✅ MongoDB Atlas Integration (512MB Free Tier)

## Tech Stack

### Frontend
- React 19
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT Authentication
- bcryptjs

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pastehub?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

4. **Start backend server:**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
```bash
cd paste-app
```

2. **Create `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Install dependencies (if not already installed):**
```bash
npm install
```

4. **Start frontend:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Project Structure

```
NotesSaver/
├── backend/              # Express.js backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Server entry point
│
├── paste-app/           # React frontend
│   ├── src/
│   │   ├── Components/  # React components
│   │   ├── utils/       # API utilities
│   │   └── redux/       # Redux store
│   └── package.json
│
└── BACKEND_DOCUMENTATION.md  # Detailed documentation
```

## MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster (512MB)
3. Create database user
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string
6. Add to backend `.env` file

See `BACKEND_DOCUMENTATION.md` for detailed MongoDB setup instructions.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Pastes
- `GET /api/pastes` - Get all pastes
- `GET /api/pastes/:id` - Get single paste
- `POST /api/pastes` - Create paste
- `PUT /api/pastes/:id` - Update paste
- `DELETE /api/pastes/:id` - Delete paste
- `POST /api/pastes/:id/auto-save` - Auto-save draft
- `GET /api/pastes/:id/analytics` - Get paste analytics

See `BACKEND_DOCUMENTATION.md` for complete API documentation.

## Deployment

### Backend Deployment
- **Render**: Free tier available, easy setup
- **Railway**: Auto-deploys from GitHub
- **Heroku**: Classic platform (paid plans)

### Frontend Deployment
- **Vercel**: Recommended, excellent for React apps
- **Netlify**: Free tier, easy setup

See `BACKEND_DOCUMENTATION.md` for detailed deployment instructions.

## Documentation

For complete documentation including:
- Detailed setup instructions
- API documentation
- Deployment guide
- Troubleshooting
- Security best practices

See: [BACKEND_DOCUMENTATION.md](./BACKEND_DOCUMENTATION.md)

## License

MIT

## Author

Created as a learning project for full-stack development.
