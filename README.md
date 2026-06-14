# BuildNext AI 🚀

> Analyze your GitHub. Discover what's missing. Build what matters.

BuildNext AI is an AI-powered portfolio intelligence platform that analyzes GitHub profiles, identifies skill gaps, measures project uniqueness, and recommends high-impact projects based on current industry demand.

## ✨ Features

* 🔍 GitHub Portfolio Analysis
* 📊 GitHub Score & Portfolio Health Metrics
* 🎯 Skill Gap Detection
* 🚨 Overused Project Detection
* 💡 AI-Powered Project Recommendations
* 📈 Skill Coverage Visualization
* 🏷️ Portfolio Category Classification
* 🤖 Google Gemini Powered Insights
* 🎨 Modern SaaS Dashboard UI

## 🖼️ Preview

Add screenshots here after deployment.

### Landing Page

![Landing](./screenshots/landing.png)

### Dashboard

![Dashboard](./screenshots/dashboard.png)

---

## 🛠 Tech Stack

### Frontend

* React 18
* Recharts
* CSS
* Axios

### Backend

* Node.js
* Express.js

### AI

* Google Gemini

### External APIs

* GitHub REST API

---

## 🚀 How It Works

1. Enter a GitHub username
2. Fetch public repositories
3. Analyze repository content and technologies
4. Generate portfolio intelligence
5. Detect missing skills and weak areas
6. Recommend high-impact projects to build next

---

## 📂 Project Structure

buildnext-ai/
├── client/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── App.jsx
│ │ └── index.js
│
├── server/
│ ├── routes/
│ ├── services/
│ └── index.js
│
└── README.md

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Navneet-pratap1027/Buildnext-ai
cd buildnext-ai
```

### Backend

```bash
cd server
npm install
cp .env.example .env
```

Add:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

### Frontend

```bash
cd ../client
npm install
```

### Run Application

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm start
```

---

## 🌐 Deployment

### Frontend

* Vercel

### Backend

* Render

Before deployment update API URLs and environment variables.

---

## 🎯 Why BuildNext AI?

Most developers build projects blindly.

BuildNext AI helps developers understand:

* What skills are missing
* Which projects are overused
* What employers actually value
* What project should be built next

This turns GitHub from a repository platform into a career intelligence tool.

---

## 👨‍💻 Author

Navneet Pratap

If you found this project useful, consider giving it a ⭐ on GitHub.
