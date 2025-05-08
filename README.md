# 🎬 Movie Rating App

A full-stack movie rating platform built with React.js (frontend) and Express.js with SQLite (backend). Features include user authentication, role-based admin controls, movie management, image uploads, and a rating system.

---

## 📁 Project Structure

```
movie-rating-app/
├── client/     # Frontend (React + Vite + Tailwind)
└── server/     # Backend (Express + SQLite)
```

---

## 🚀 How to Run Locally

### 🔧 Prerequisites
- Node.js installed (v16+ recommended)
- `npm` or `yarn`

---

### ▶️ 1. Start the Backend

```bash
cd server
npm install
node index.js
```

The backend runs at: `http://localhost:4000`

---

### 🖥 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs at: `http://localhost:5173`

---

## 🧪 Test Credentials

| Role   | Username | Password |
|--------|----------|----------|
| Admin  | admin    | admin    |
| User   | test     | test     |

> These are seeded automatically on first server start.

---

## 🔐 Features

- ✅ User registration & login
- ✅ JWT-based auth
- ✅ Role-based access (Admin vs User)
- ✅ Add/delete movies (admin only)
- ✅ Upload custom images (poster)
- ✅ Movie rating system (1–10)
- ✅ User role management
- ✅ Responsive & dark mode UI

---

## 🧑‍💻 Built With

- React.js + Vite + Tailwind CSS
- Express.js + SQLite
- JWT, bcrypt, multer

---

## 📝 License

MIT — free to use and modify.