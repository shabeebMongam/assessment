# Student Management System API

## Problem Statement

Build a basic student management system API using Express.js. The system should have the following features:

### Required Features:
- Endpoints for both Admin panel and student interface.

#### Admin Panel
- Admin should be able to log in
- Allow the admin to add students with their name, email ID, department, and password
- The admin should also be able to assign tasks to students with a due time.

#### Student Interface
- Students should be able to log in and see the tasks assigned to them.
- They should be able to see the status of each task (pending, overdue, completed).
- Option to change task status to completed.

### Additional details:
- The admin panel should be accessible only by the admin.
- Students should be able to log in using their email ID and password.
- Set predefined credential for admin (email: admin@admin.com, Password: admin)
- Admin should be able to log in using their email ID and password.

### Instructions:
- Don't use session - cookie for authentication
- Don't use HTML
- Request and Response should be JSON format.
- Proper API Documentation is needed
- Use .gitignore file
- Include in README.md
- The valid URL of your API
- Publish API doc in postman and share the URL
- ENV variables and values
- In API doc sample example also needed
- Use MongoDB Atlas
- TypeScript is preferred

---

A RESTful API for a student management system built with Express, TypeScript, and MongoDB.

## Features

- JWT-based authentication
- Admin panel for managing students and tasks
- Student interface for viewing and updating assigned tasks

## Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1d
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the required environment variables
4. Seed the admin account:
   ```bash
   npm run seed
   ```
5. Build the application:
   ```bash
   npm run build
   ```
6. Start the server:
   ```bash
   npm start
   ```

For development:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login for both admin and students

### Admin Routes (requires admin authentication)

- `POST /api/admin/students` - Add a new student
- `GET /api/admin/students` - Get all students
- `POST /api/admin/tasks` - Assign a task to a student
- `GET /api/admin/tasks` - Get all tasks
- `GET /api/admin/tasks/:id` - Get a specific task by ID

### Student Routes (requires student authentication)

- `GET /api/student/tasks` - Get tasks assigned to the logged-in student
- `GET /api/student/tasks/:taskId` - Get a specific task by ID
- `PATCH /api/student/tasks/:taskId/status` - Update task status (mark as completed)

## Authentication Flow

1. Login using the `/api/auth/login` endpoint
2. Use the received JWT token in the Authorization header for subsequent requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## Default Admin Credentials

- Email: admin@admin.com
- Password: admin

## Sample API Requests

### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@admin.com",
  "password": "admin"
}
```

### Add a Student (Admin only)

```
POST /api/admin/students
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Computer Science",
  "password": "password123"
}
```

### Assign a Task (Admin only)

```
POST /api/admin/tasks
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "title": "Complete Assignment",
  "description": "Complete the JavaScript assignment on loops",
  "assignedTo": "60d21b4d8a8d6c001c2345678",
  "dueDate": "2023-12-31T23:59:59Z"
}
```

### Student Mark Task as Completed

```
PATCH /api/student/tasks/60d21b4d8a8d6c001c2345678/status
Content-Type: application/json
Authorization: Bearer <student_token>

{
  "status": "completed"
}
```
