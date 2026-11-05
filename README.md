# 💰 Personal Finance Tracker

A full-stack MERN web app to track income and expenses, visualise spending with charts, and manage a budget — with secure JWT login.

**Live demo:** _add your Vercel link here_ · **API:** _add your Render link here_

<!-- Add screenshots: put images in a /screenshots folder and link them here -->
<!-- ![Dashboard](screenshots/dashboard.png) -->

## ✨ Features
- 🔐 Register / login with **JWT** authentication and protected routes
- ➕ Add income & expenses with category, date and notes
- 🗑 Delete transactions (optimistic UI updates)
- 📊 **Pie chart** of expenses by category and **bar chart** of the last 6 months
- 🧮 Live summary cards: total income, expense and balance
- 🔍 Filter by type, category and date range — charts update instantly
- ⬇ Export transactions to **CSV**
- 🌙 Light / dark mode
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔔 Toast notifications, form validation and loading states

## 🧰 Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, React Router, Context API, Axios |
| Charts | Recharts |
| Backend | Node.js, Express.js (REST API) |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt password hashing |
| Deployment | Vercel (frontend), Render (backend) |

## 🚀 Run locally
Requirements: Node.js 18+ and a MongoDB Atlas connection string.

```bash
# 1. Backend
cd server
npm install
cp .env.example .env      # then fill in MONGO_URI and JWT_SECRET
npm run dev               # http://localhost:5000

# 2. Frontend (new terminal)
cd client
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api
npm run dev               # http://localhost:5173
```

📖 **New to all this?** See [GUIDE.md](GUIDE.md) for a complete step-by-step beginner guide, including deployment.

## 🔑 Environment variables
**server/.env**
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random secret used to sign tokens |
| `PORT` | API port (default 5000) |
| `CLIENT_URL` | Allowed frontend URL(s), comma-separated |

**client/.env**
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL ending in `/api` |

## 🔌 API
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | – | Create account |
| POST | `/api/auth/login` | – | Log in |
| GET | `/api/auth/me` | ✅ | Current user |
| GET | `/api/transactions?type=&category=&startDate=&endDate=` | ✅ | List own transactions |
| POST | `/api/transactions` | ✅ | Add transaction |
| PUT | `/api/transactions/:id` | ✅ | Update transaction |
| DELETE | `/api/transactions/:id` | ✅ | Delete transaction |

## ☁️ Deployment
- **Backend → Render:** root directory `server`, build `npm install`, start `npm start`, add the env variables.
- **Frontend → Vercel:** root directory `client`, framework Vite, set `VITE_API_URL` to `https://<your-render-app>.onrender.com/api`.
- Set `CLIENT_URL` on Render to your Vercel URL.

## 📁 Project structure
```
client/   React frontend (pages, components, context, api, utils)
server/   Express API (routes → controllers → models, middleware)
```

## 🔮 Future improvements
- Edit transactions from the UI
- Monthly budgets with alerts
- Recurring transactions
- Monthly email reports (Nodemailer)
- PWA support
