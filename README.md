# Task Management Application

A **Task Management Application** built using **Next.js (React with TypeScript) for the frontend** and **Node.js with Express and TypeScript for the backend**. This application allows users to efficiently create, manage, and track their tasks.

## 🚀 Features

- **Task CRUD Operations** (Create, Read, Update, Delete)
- **Task Categorization** (To Do, In Progress, Done, Timeout)
- **Auto Timeout Handling** (Tasks move to 'Timeout' after exceeding the deadline)
- **Real-Time Updates**
- **Search and Filter** (Search by title or description, filter tasks by status)
- **Sorting** (A-Z, Z-A, status-based filtering)
- **Interactive UI** (Drag & Drop, Responsive Design)

## 🛠️ Tech Stack

### Frontend
- **Next.js** (React with TypeScript)
- **Tailwind CSS** (Styling)
- **React Context API** (State Management)
- **React Icons** (UI Enhancements)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js** with **Express.js** (Server-side)
- **TypeScript** (Strongly Typed Backend) //Have tried but not worked so switched on to the Node.js
- **MongoDB with Mongoose** (Database Management)

## 📂 Folder Structure

```
📦 Task-Management-App
├── 📂 client (Frontend - Next.js)
│   ├── 📂 components (UI Components)
│   ├── 📂 context (Global State Management)
│   ├── 📂 app (Routing)
│   ├── 📜 package.json (Frontend Dependencies)
│   ├── 📜 tailwind.config.js (Tailwind CSS Config)
│   └── ...
│
├── 📂 server (Backend - Express.js)
│   ├── 📂 config (Database, Environment Variables)
│   ├── 📂 routes (API Routes)
│   ├── 📂 controllers (Business Logic)
│   ├── 📂 models (Mongoose Models)
│   ├── 📜 server.ts (Main Entry Point)
│   ├── 📜 package.json (Backend Dependencies)
│   └── ...
│
└── 📜 README.md (Project Documentation)
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 
- **MongoDB** 

### Setup Backend (Server)
```bash
cd server
npm install  # Install dependencies
npm run dev  # Start the development server
```

### Setup Frontend (Client)
```bash
cd client
npm install  # Install dependencies
npm run dev  # Start Next.js frontend
```

### Environment Variables
Create a **.env** file in the backend (`server/`) and add:
```
PORT=your//localhost:port
MONGO_URI=your_mongodb_connection_string
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
vercel  
```

### Backend (AWS/Render/Heroku)
```bash
render
```

## 📌 Usage
1. **Create a task** by adding a title, description, and deadline.
2. **Move tasks** between different categories (To Do, In Progress, Done).
3. **Filter and Search** tasks using the filter button.
4. **Delete or Update** tasks easily.

## 📸 Screenshots
<img src='/client/public/Banner.png'/>

## 📝 License
This project is **open-source** and available for modifications.

## 🙌 Acknowledgments
Thanks to all open-source libraries used in this project!

---
### 💡 Need Enhancements?
Feel free to suggest improvements or contribute by submitting a pull request!

