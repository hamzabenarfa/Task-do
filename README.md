# ✅ Task-do

> Intelligent task management with automated organization - Built with Next.js and Express.js

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 🚀 Overview

Task-do is a revolutionary task management application that goes beyond simple to-do lists. With intelligent automation features, it organizes your tasks based on priority and duration, helping you optimize your productivity and never miss important deadlines. The application features a clean, intuitive interface that adapts to your workflow.

## ✨ Key Features

### 🤖 Smart Task Organization
- **Priority-Based Sorting**: Automatically organizes tasks based on priority levels and urgency
- **Duration-Based Scheduling**: Intelligently organizes tasks considering time requirements
- **Deadline Optimization**: Smart scheduling to ensure timely completion of critical tasks

### 📅 Advanced Schedule Management
- **Dynamic Scheduling**: Create and manage flexible schedules that adapt to your needs
- **Operational Hours**: Configure working hours and availability preferences
- **Time Blocking**: Automatic time allocation for optimal productivity

### 🔐 User Management
- **Secure Authentication**: Robust account creation and login system
- **Profile Customization**: Personalize your workspace and preferences
- **Data Privacy**: Your tasks and schedules remain private and secure

### 📱 Modern User Experience
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, modern UI that focuses on productivity

## 🛠️ Technology Stack

### Frontend
- **[Next.js](https://nextjs.org/)** - React framework with server-side rendering
- **React** - Component-based UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach
- **Shadcn** - Set of beautifully-designed, accessible components

### Backend
- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework
- **[Prisma ORM](https://www.prisma.io/)** - Next-generation database toolkit
- **Node.js** - JavaScript runtime environment
- **JWT Authentication** - Secure user sessions
- **RESTful API** - Clean, scalable API design

### Database & Tools
- **PostgreSQL** - Reliable data storage
- **Prisma Migrations** - Database schema management
- **API Testing** - Postman/Thunder Client compatible

## 📦 Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** v16.0.0+ ([Download](https://nodejs.org/))
- **npm** v8+ or **yarn** v1.22+
- **Git** ([Download](https://git-scm.com/downloads))

### Quick Start Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hamzabenarfa/Task-do.git
   cd Task-do
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your database configuration
   
   # Set up the database
   npx prisma migrate dev --name init
   
   # Generate Prisma client
   npx prisma generate
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   # Open a new terminal and navigate to frontend directory
   cd my-app
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.local.example .env.local
   # Configure your API endpoints
   
   # Start the frontend development server
   npm run dev
   ```

### Environment Configuration

**Backend (`.env`)**:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskdo"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
```

**Frontend (`.env.local`)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME="Task-do"
```


### Development Commands
```bash
# Backend development with hot reload
cd backend
npm run dev

# Frontend development
cd my-app
npm run dev

# Build for production
npm run build

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma db seed         # Seed database with sample data
```



## 🙏 Acknowledgments

- **Development Team**: Thank you to all contributors who make this project possible
- **Open Source Community**: Built with amazing open-source tools and libraries
- **Inspiration**: Motivated by the need for smarter, more intuitive task management



<div align="center">

**🌟 Star us on GitHub if you find Task-do helpful!**
<br />
**Made with ❤️ for productivity enthusiasts worldwide**

</div>
