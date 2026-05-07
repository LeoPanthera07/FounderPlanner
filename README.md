# 🎯 Founder Planner

> A personal productivity web app built on the **Founder-Style Planner** framework.
> Plan your Year, Month, Week, and Day — track habits, metrics, and reviews — all in one offline-first app.

![Build](https://img.shields.io/badge/Build-React%20%2B%20Vite-blue?style=flat-square)
![Storage](https://img.shields.io/badge/Storage-IndexedDB%20%2F%20Dexie-teal?style=flat-square)
![State](https://img.shields.io/badge/State-Zustand-orange?style=flat-square)
![Style](https://img.shields.io/badge/Style-Tailwind%20CSS%20v3-38bdf8?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- 🎯 **Year View** — Identity statement, annual themes, targets, year-end outcomes, not-this-year list
- 📅 **Month View** — Project portfolio, habit floor, scoreboard metrics, monthly focus, life admin, anti-drift check
- 📋 **Week View** — Top 3 priorities, day themes, weekly scorecard, deep-work blocks, meeting budget
- ⚡ **Day View** — Daily command page, focus ladder, 24-hour schedule, routine checklist, end-of-day reflection
- 🔥 **Habits** — Daily habit tracking with streaks, completion progress, and bucket tagging
- 📊 **Metrics** — Custom scoreboard metrics with logging and 14-day chart
- 🔄 **Reviews** — Weekly and monthly retrospectives with Stop · Start · Continue

---

## 🧠 The Framework

Every task belongs to one of four buckets:

| Bucket | Purpose |
|--------|---------|
| **Build** | Shipping projects, features, and output |
| **Learn** | Courses, books, skills, and knowledge |
| **Operate** | Admin, systems, and logistics |
| **Live** | Health, relationships, and lifestyle |

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Routing | React Router v7 |
| State | Zustand |
| Storage | IndexedDB via Dexie.js |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |

---

## 📁 Project Structure
src/
├── app/
│ ├── layout/ # AppShell, Sidebar, TopBar
│ └── routes/ # AppRouter
├── features/
│ ├── year/ # Year page + components + store
│ ├── month/ # Month page + components + store
│ ├── week/ # Week page + components + store
│ ├── day/ # Day page + components + store
│ ├── habits/ # Habit tracking + streaks
│ ├── metrics/ # Scoreboard metrics + charts
│ └── reviews/ # Weekly + monthly reviews
├── components/
│ ├── forms/ # InputField, TextArea, Select, Checkbox, Date
│ ├── cards/ # PlannerCard, OutcomeCard, HabitCard, MetricCard
│ └── tables/ # Scorecard, DeepWork, Milestone, Schedule
├── data/
│ ├── db/ # Dexie IndexedDB setup
│ ├── schemas/ # Data models for each cadence
│ └── defaults/ # Default values for new entries
└── utils/
├── dateUtils.js # Week numbers, formatting, schedule slots
├── bucketUtils.js # Bucket colors, block modes, priority levels
├── carryForward.js# Shutdown decision logic
├── streakUtils.js # Habit streak calculations
└── exportUtils.js # JSON export/import


---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/LeoPanthera07/FounderPlanner.git
cd FounderPlanner

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 💾 Data & Storage

All data is stored **locally in your browser** using IndexedDB via Dexie.js.

- ✅ Works fully offline
- ✅ No account or login required
- ✅ Data persists across browser sessions
- ✅ Export your data anytime as JSON

---

## 🗺️ Roadmap

- [ ] PDF export for printable planner pages
- [ ] Supabase sync for multi-device access
- [ ] Calendar heatmap for habit history
- [ ] AI-powered weekly review suggestions
- [ ] Mobile PWA support

---

## 📋 Planner Rules

1. Prioritize meaningful routines and milestones — not a random task list
2. Every task belongs to one of four buckets: **Build · Learn · Operate · Live**
3. At the end of every review: **delete, delegate, defer, or schedule** each open item
4. Total cadence: **Year → Month → Week → Day**

---

## 🧑‍💻 Author

Built by [@LeoPanthera07](https://github.com/LeoPanthera07)

---

## 📄 License

MIT — use it, fork it, build on it.