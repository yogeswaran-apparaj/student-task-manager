# 🎯 Student Task Manager - Creative Full Stack Web Application

![Student Task Manager](https://img.shields.io/badge/Full%20Stack-HTML%2FCSS%2FJS%2FNode%2FMongoDB-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Internship Project](https://img.shields.io/badge/Project-Internship%20Assignment-orange)

A visually stunning, interactive task management application built for internship evaluation. Features creative 3D animations, glassmorphism design, and a custom animated cursor.

## ✨ Live Demo

🔗 **Live Application:** https://student-taskmanger.netlify.app/

👤 **Demo Credentials:**
- Username: `admin`
- Password: `admin123`

## 🎥 Preview

![Dashboard Preview](preview.png)

## 🚀 Features

## 🎨 Creative Frontend
- **3D Animated Task Cards** with CSS transforms
- **Custom Animated Cursor** with follower effect
- **Glassmorphism UI Design** with modern gradients
- **Smooth Animations** for all interactions
- **Responsive Layout** for all devices
- **Interactive Micro-interactions** and hover effects

## ⚙️ Backend Features
- **RESTful API** with Node.js/Express
- **MongoDB Database** for task persistence
- **CRUD Operations** (Create, Read, Update, Delete)
- **Simple Demo Authentication** (frontend-based)

## 📱 Pages
1. **Login Page** - Animated form with demo credentials
2. **Task Dashboard** - Interactive task management interface

## 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3 (with CSS Variables, Animations, 3D Transforms)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons

## Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS middleware

## Development Tools
- MongoDB Atlas (Cloud Database)
- Render/Netlify (Hosting)
- Git & GitHub

## 📁 Project Structure
student-task-manager/
├── frontend/
│   ├── index.html          # Main entry
│   ├── login.html          # Login page
│   ├── dashboard.html      # Dashboard page
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   └── animations.css  # Animation styles
│   ├── js/
│   │   ├── main.js         # Shared utilities
│   │   ├── login.js        # Login logic
│   │   └── dashboard.js    # Dashboard logic
│   └── assets/             # Images / icons
│
├── backend/
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env                # Environment variables
│   ├── models/
│   │   └── Task.js         # MongoDB schema
│   └── routes/
│       └── tasks.js        # API routes
│
├── README.md               # Project documentation
└── DEPLOYMENT.md           # Deployment guide


## 🚀 Quick Start

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- Modern web browser

## Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogeswaran-apparaj/student-task-manager.git
   cd student-task-manager
2. **Backend setup**
cd backend
npm install

#Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/task_manager" >> .env
echo "PORT=5000" >> .env

#Start backend
npm start

3. **Frontend setup**
#Open in browser
open frontend/login.html
#or
start frontend/login.html  # Windows

4. **Access the Application**

Open browser: http://localhost:3000 (if using live-server)

Or open frontend/login.html directly

Login with: admin / admin123

## 🎯 API Endpoints
Method	Endpoint	Description
GET    	/tasks	    Get all tasks
POST	  /tasks  	  Create new task
PUT	    /tasks/:id	Update task status
DELETE	/tasks/:id	Delete task

## 📱 Screenshots

### Login Page
<img width="1917" height="964" alt="image" src="https://github.com/user-attachments/assets/73d3fe60-16a5-475c-9a6e-946510d3fe14" />

### Dashboard

<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/3cd2a40c-15d9-4e4a-a868-8868eb4d6282" />

## 🎨 Design Features
1. **3D Task Cards**
CSS 3D transforms with perspective

Hover animations and rotations

Glassmorphism effects with backdrop-filter
2. **Custom Cursor**
Dual-layer cursor (dot + follower)

Scale effects on interactive elements

Smooth transitions


3. **Animations**
Floating shapes in background

Staggered card animations

Micro-interactions on buttons

Smooth page transitions
4. **Clone the repository**
Mobile-first approach

Flexible grid layouts

Adaptive typography

## 🔐 Authentication Note
This project uses demo authentication for simplicity:

Authentication handled in frontend only

Hardcoded credentials: admin / admin123

No database-based user management

Suitable for internship demonstration

## 🏗️ Architecture
### Frontend Layer
Handles UI rendering and user interactions

Manages client-side state

Communicates with backend via REST API

Implements demo authentication

### Backend Layer
Provides RESTful API endpoints

Manages database operations

No authentication (simplified for demo)

Error handling and validation

### Database Layer
MongoDB with single tasks collection

Task schema with title, description, status, and timestamps

## 📊 Database Schema
Task {
  title: String,        // Required
  description: String,  // Optional
  completed: Boolean,   // Default: false
  createdAt: Date       // Auto-generated
}

## 🚢 Deployment

### Render + Netlify
Backend: Deploy to Render

Frontend: Deploy to Netlify

Database: Use MongoDB Atlas

## 🤝 Contributing
This is an internship project, but suggestions are welcome:

Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Open a Pull Request

## 🎓 Learning Outcomes

This project demonstrates:

Full Stack Development - End-to-end application building

Creative Frontend - Advanced CSS and JavaScript techniques

API Design - RESTful service implementation

Database Integration - MongoDB with Mongoose

Project Architecture - Organized code structure

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

YOGESWARAN APPARAJ

## 🙏 Acknowledgments

Icons by Font Awesome

Color palette from Coolors

Inspiration from modern UI designs

Mentors and peers for feedback
