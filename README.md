# 🎓 AI-Powered University Timetable Management System — Frontend

<div align="center">

A modern, role-based React application for managing, generating, and visualizing university timetables — powered by an integrated AI assistant for natural-language schedule queries.

[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.9-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [User Roles](#-user-roles)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 Overview

The **AI-Powered Timetable Management System** streamlines the process of creating, approving, and viewing academic timetables across departments, batches, and semesters. It combines a clean, responsive interface with an AI chatbot assistant so students, teachers, and administrators can query schedules using natural language instead of navigating complex menus.

---

## ✨ Features

### 🔐 Authentication & Access Control
- Secure login and sign-up flows
- Fine-grained, role-based access control (RBAC)
- Password reset and change-password flows for every role

### 👥 Multi-Role Support
| Role | Capabilities |
|---|---|
| **Super Admin** | Full system control — faculties, deans |
| **Dean** | Departmental oversight and approvals |
| **Chairman** | Manage Department, batches, sections, teachers, and timetables |
| **Teacher** | View assigned slots  |
| **Student** | View batch/section timetable |

### 📅 Timetable Management
- Create, edit, and delete timetable slots
- Filter and view schedules by **department, batch, year, semester, and section**
- Built-in approval workflow for pending timetables

### 🤖 AI Timetable Assistant
- Natural-language timetable queries via an embedded chatbot
- Powered by **Gemini AI** for fast, conversational responses

### 📊 Role-Based Dashboards
- Dedicated dashboards for Super Admin, Dean, Chairman, Teacher, and Student
- At-a-glance summaries and quick actions per role

### 📄 Export & Sharing
- One-click PDF export of any timetable via `jsPDF` + `jsPDF-AutoTable`

### 📱 Responsive Design
- Fully responsive layout built with Tailwind CSS, optimized for desktop and mobile

---

## 🛠 Tech Stack

**Core**
- [React 19](https://react.dev/) — UI library
- [Vite 7](https://vitejs.dev/) — build tool & dev server
- [Redux Toolkit](https://redux-toolkit.js.org/) — global state management
- [React Router 7](https://reactrouter.com/) — client-side routing

**Styling & UI**
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) — icon set
- [Framer Motion](https://www.framer.com/motion/) — animations

**Forms & Data**
- [React Hook Form](https://react-hook-form.com/) — form state & validation
- [Axios](https://axios-http.com/) — HTTP client

**Export**
- [jsPDF](https://github.com/parallax/jsPDF) + [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) — PDF generation

---

## 📂 Project Structure

```
TIME-TABLE-MANAGEMENT-SYSTEM/
├── components/
│   ├── auth/                    # Login, SignUp
│   ├── chatbot/                 # AI chatbot UI
│   ├── dashboard/
│   │   ├── users/                # Manage batches, departments, faculties,
│   │   │                         #   teachers, sections, semesters, timetables
│   │   ├── ChairmanDashboard.jsx
│   │   ├── DeanDashboard.jsx
│   │   ├── DeptDashboard.jsx
│   │   ├── FacultyDashboard.jsx
│   │   ├── FacultyDepartment.jsx
│   │   ├── Home.jsx
│   │   └── SuperAdminDashboard.jsx
│   ├── layout/                  # Create-entity forms, Navbar, Sidebar, layout shell
│   ├── shared/                  # Reusable UI: Button, Input, Select, Loader,
│   │                             #   TimeTable, QueryChatBot, etc.
│   └── AuthLayout.jsx
├── pages/                       # Route-level pages (Edit*, View*, Approve*, etc.)
├── src/
│   ├── assets/                  # Static assets (logos, images)
│   ├── store/                   # Redux slices: auth, batch, chatbot, course,
│   │                             #   dept, faculty, section, semester,
│   │                             #   timetable, timetableSlot, user
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/AhmedRizwan221/ai-timetable-management-system-frontend
cd TIME-TABLE-MANAGEMENT-SYSTEM

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Environment Variables

Create a `.env` file in the project root with your API endpoints and keys, for example:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

---

## 👤 User Roles

```
Super Admin  →  Full control of the Faculty system
Dean         →  Departmental-level oversight & approvals
Chairman     →  Manages its department, batches, sections, teachers & timetables
Teacher      →  Views assigned schedule
Student      →  Views batch/section timetable
Guest        →  Read-only, limited access
```

---


## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ for smarter academic scheduling

</div>
