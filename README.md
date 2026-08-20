# Task Management System

This is a task management application system for listing and browsing tasks that includes the frontend and backend. 

## Features

- **Full CRUD**: Create, Read, Update, and Delete tasks.
- **Filtering**: Search by title and filter by status.
- **Pagination**
- **Skeleton Loading**
- **Security**: 
  - Parameterized SQL queries to prevent SQL Injection.
  - Security headers via `Helmet`.
- **Unified Deployment**

---

## Limitations

This can only manage tasks, and anyone can add, update, and delete a task. There is no Authentication or Registration so anyone who has access to this can modify the contents. Feel free to use this on your project or modify or append to the functionalities.

---

## To Clone
```bash

git clone https://github.com/Hyper-Intelligent-Monkey/Task_Manager_React-Express.git

```

---

## Tech Stack

### Backend
- JavaScript
- Node.js
- Express
- PostgreSQL
- Database migrations using "node-pg-migrate".
- Zod
- Morgan
- Helmet

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- CSS

---

## Setup Instructions

### 1. Prerequisites
- **Node.js**: (v18+)
- **PostgreSQL**: Installed and running locally or a remote instance (e.g., Supabase, Neon).

### 2. Install Dependencies
To install dependencies for both the root, client, and server run this in **root**:
```bash
npm run install-all
```

### 3. Environment Variables
Remove the `.example ` from the `.env.example` files in both `client/` and `server/`.

#### Server (`server/.env`)
```env
# replace this with details from your postgre provider
DATABASE_URL=postgres://user:password@localhost:5432/database_name
```

### 4. Database Migrations
Run the migrations to set up the database schema:
```bash
# From the root directory
npm run migrate:up --prefix server
```

---

## Local Development

After finishing the setup instruction, this will run both client and server:

```bash
npm run dev
```

---

## Deploying to Render
This project includes a `render.yaml` file for easy deployment on [Render](https://render.com).

1. Connect your GitHub repository to Render.
2. In Render go to dashboard.
3. Go to Blueprints and create a "New Blueprint Instance".
4. Select your project.
3. Required Environment Variables on Render:
   - `DATABASE_URL`: Your PostgreSQL connection string.

---

## Project Structure

- `/client`: Frontend.
- `/server`: Backend.
- `/package.json`: Management.

---
