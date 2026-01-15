<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Scroll.png" alt="Scroll" width="120" height="120" />
  <h1>🚀 PasteHub 🚀</h1>
  <p><strong>Your personal, full-stack pastebin. Create, edit, and share text snippets with MongoDB backend, authentication, and advanced features. 💾</strong></p>

  <p>
    <a href="https://github.com/ChachanNaman/Notes_Saver/stargazers"><img src="https://img.shields.io/github/stars/ChachanNaman/Notes_Saver?style=for-the-badge&color=e8c547" alt="Stars"></a>
    <a href="https://github.com/ChachanNaman/Notes_Saver/network/members"><img src="https://img.shields.io/github/forks/ChachanNaman/Notes_Saver?style=for-the-badge&color=59a5d8" alt="Forks"></a>
    <a href="https://github.com/ChachanNaman/Notes_Saver/issues"><img src="https://img.shields.io/github/issues/ChachanNaman/Notes_Saver?style=for-the-badge&color=f44336" alt="Issues"></a>
  </p>
</div>

---

## ✨ What is PasteHub?

PasteHub is a modern, full-stack paste application with MongoDB backend, user authentication, and advanced features. Create, edit, and share text snippets with lightning speed. All your data is securely stored in MongoDB Atlas.

**Now with Backend Integration!** This project has evolved from a localStorage-based app to a complete full-stack application with:
- ✅ MongoDB Atlas database
- ✅ User authentication (JWT)
- ✅ Secure password hashing (bcrypt)
- ✅ Auto-save drafts
- ✅ Expiring pastes
- ✅ Analytics and view tracking
- ✅ Shareable paste links

---

## 📸 Live Preview

Here's a sneak peek of PasteHub in action.

| All Pastes Page | Create Paste Page | Edit Paste Page | View Paste Page |
|:---:|:---:|:---:|:---:|
| <img src="./screenshots/AllPaste.png" alt="All Pastes Page" width="100%"> | <img src="./screenshots/CreatePaste.png" alt="Create Paste Page" width="100%"> | <img src="./screenshots/EditPaste.png" alt="Edit Paste Page" width="100%"> | <img src="./screenshots/ViewPaste.png" alt="View Paste Page" width="100%"> |

---

## 📚 Documentation

Want a deep dive into the project's architecture, setup, and features? Check out the full documentation.

➡️ **[View Project Documentation PDF](./Documentation.pdf)**

For backend setup and API documentation, see: **[BACKEND_DOCUMENTATION.md](./BACKEND_DOCUMENTATION.md)**

---

## 🎯 Key Features

* **✍️ Create & Edit Pastes:** A beautiful, distraction-free editor to write and update your notes.
* **🔐 User Authentication:** Secure registration and login with JWT tokens and bcrypt password hashing.
* **💾 MongoDB Storage:** All pastes are stored in MongoDB Atlas (512MB free tier).
* **🔄 Auto-Save Drafts:** Automatically saves your work as you type.
* **⏰ Expiring Pastes:** Set expiration dates for your pastes.
* **📊 Analytics:** Track views and view history for each paste.
* **🔗 Shareable Links:** Generate unique shareable links for your pastes.
* **🔍 Live Search:** Instantly find the paste you're looking for with a powerful, real-time search filter.
* **📋 One-Click Copy & Share:** Easily copy a paste's content or share a direct view-only link.
* **🎨 Modern UI:** A clean, responsive, and aesthetically pleasing interface built with Tailwind CSS.
* **🚀 Blazing Fast:** Built with Vite for a lightning-fast development and user experience.
* **🔔 Toast Notifications:** Get smooth, non-intrusive feedback for your actions.

---

## 🛠️ Technology Stack

This project is built with a modern, scalable, and efficient tech stack.

<div align="center">
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Badge">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind Badge">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express Badge">
  </p>
</div>

### Frontend
* **Core Framework:** [React 19](https://reactjs.org/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

### Backend
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* **ODM:** [Mongoose](https://mongoosejs.com/)
* **Authentication:** JWT with [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* **Password Hashing:** [bcryptjs](https://github.com/dcodeio/bcrypt.js)

---

## ⚙️ Getting Started

Ready to run PasteHub on your local machine? Let's get you set up in minutes.

### Prerequisites

* Node.js (v18 or higher recommended)
* MongoDB Atlas account (free tier)
* npm or yarn

### Quick Start

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ChachanNaman/Notes_Saver.git
   cd Notes_Saver
   ```

2. **Set Up Backend:**
   ```bash
   cd backend
   npm install
   # Create .env file (see Backend Setup below)
   npm start
   ```

3. **Set Up Frontend:**
   ```bash
   cd ../paste-app
   npm install
   # Create .env file (see Frontend Setup below)
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173`. You should see the application running! 🎉

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
   PORT=5001
   ```

4. **Start backend server:**
   ```bash
   npm start
   ```

Backend will run on `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd paste-app
   ```

2. **Create `.env` file:**
   ```env
   VITE_API_URL=http://localhost:5001/api
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

### MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster (512MB)
3. Create database user
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string
6. Add to backend `.env` file

See `BACKEND_DOCUMENTATION.md` for detailed MongoDB setup instructions.

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

## 🔮 Future Enhancements

- [x] **Backend Integration:** ✅ Done! Node.js/Express backend with MongoDB
- [x] **User Authentication:** ✅ Done! JWT-based authentication
- [ ] **Dark Mode Toggle:** A UI switch to toggle between light and dark themes
- [ ] **Syntax Highlighting:** Automatic code highlighting for different programming languages
- [ ] **Paste Categories/Tags:** Organize pastes with categories
- [ ] **Export Functionality:** Export pastes as PDF or Markdown

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ChachanNaman/Notes_Saver/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made by <a href="https://github.com/ChachanNaman">Naman Chachan</a></p>
</div>
