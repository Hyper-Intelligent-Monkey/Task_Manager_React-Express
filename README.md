# Task Management System

A full-stack task management application built with Node.js, Express, PostgreSQL, and React (Vite).

## Features

- **Full CRUD**: Create, Read, Update, and Delete tasks.
- **Filtering**: Search by title and filter by status.
- **Pagination**
- **Skeleton Loading**
- **Security**: 
  - Parameterized SQL queries to prevent SQL Injection.
  - Security headers via `Helmet`.
  - CORS configured for specific origins.
- **Unified Deployment**

---

## Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL
- Database migrations using "node-pg-migrate".
- Zod
- Morgan
- Cors
- Helmet

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running.

### 2. Database Setup
Create a PostgreSQL database and run the migrations:
```bash
# Navigate to server
cd server
# Create your .env file (see Environment Variables section)
# Run migrations
npm run migrate:up
```

### 3. Install Dependencies
From the **root directory**, run the helper command:
```bash
# if not in root
cd ..

npm run install-all
```

---

## Environment Variables

See the `.env.example` files in both the `client` and `server` directories for the required variables.

---

## Running the Application

### Development Mode
Runs both the React dev server and Express server concurrently:
```bash
npm run dev
```

### Production Mode (Single Unit)
To run the project as a single unit (Express serving React):
```bash
# 1. Build the frontend
npm run build

# 2. Start the unified server
npm start
```

---

## Project Structure

- `/client`: Frontend.
- `/server`: Backend.
- `/package.json`: Management.

---
