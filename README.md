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

## Live API

The API is hosted at:
https://assessment-df3e.onrender.com

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

## API Documentation

API documentation is available at:
https://documenter.getpostman.com/view/20220623/2sAYkErLJP

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

## API Examples

### Authentication

#### Login (Admin)

```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "admin@admin.com",
  "password": "admin"
}

Response:
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "60d21b4d8a8d6c001c2345678",
      "name": "Administrator",
      "email": "admin@admin.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Admin Operations

#### Add a Student

```
POST /api/admin/students
Content-Type: application/json
Authorization: Bearer <admin_token>

Request:
{
  "name": "Shabeeb K",
  "email": "shabeeb@example.com",
  "department": "Electronics Engineering",
  "password": "password456"
}

Response:
{
  "success": true,
  "message": "Student added successfully.",
  "data": {
    "id": "60d21b4d8a8d6c001c2345680",
    "name": "Shabeeb K",
    "email": "shabeeb@example.com",
    "department": "Electronics Engineering",
    "role": "student"
  }
}
```

#### Get All Students

```
GET /api/admin/students
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60d21b4d8a8d6c001c2345679",
      "name": "Shabeeb K",
      "email": "shabeeb@example.com",
      "role": "student",
      "department": "Electronics Science",
      "createdAt": "2023-11-01T10:30:00Z",
      "updatedAt": "2023-11-01T10:30:00Z"
    }
  ]
}
```

#### Assign a Task

```
POST /api/admin/tasks
Content-Type: application/json
Authorization: Bearer <admin_token>

Request:
{
  "title": "Circuit Diagram",
  "description": "Create a circuit diagram for series and parallel resistors",
  "assignedTo": "60d21b4d8a8d6c001c2345679",
  "dueDate": "2025-4-15T23:59:59Z"
}

Response:
{
  "success": true,
  "message": "Task assigned successfully.",
  "data": {
    "_id": "60d21b4d8a8d6c001c2345681",
    "title": "Circuit Diagram",
    "description": "Create a circuit diagram for series and parallel resistors",
    "assignedTo": "60d21b4d8a8d6c001c2345679",
    "status": "pending",
    "dueDate": "2023-12-15T23:59:59Z",
    "createdBy": "60d21b4d8a8d6c001c2345678",
    "createdAt": "2023-11-01T10:30:00Z",
    "updatedAt": "2023-11-01T10:30:00Z"
  }
}
```

#### Get All Tasks

```
GET /api/admin/tasks
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60d21b4d8a8d6c001c2345681",
      "title": "Circuit Diagram",
      "description": "Create a circuit diagram for series and parallel resistors",
      "assignedTo": {
        "_id": "60d21b4d8a8d6c001c2345679",
        "name": "Shabeeb K",
        "email": "shabeeb@example.com",
        "department": "Electronics Science"
      },
      "status": "pending",
      "dueDate": "2023-12-15T23:59:59Z",
      "createdBy": "60d21b4d8a8d6c001c2345678",
      "createdAt": "2023-11-01T10:30:00Z",
      "updatedAt": "2023-11-01T10:30:00Z"
    }
  ]
}
```

#### Get Task by ID

```
GET /api/admin/tasks/60d21b4d8a8d6c001c2345681
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "data": {
    "_id": "60d21b4d8a8d6c001c2345681",
    "title": "Circuit Diagram",
    "description": "Create a circuit diagram for series and parallel resistors",
    "assignedTo": {
      "_id": "60d21b4d8a8d6c001c2345679",
      "name": "Shabeeb K",
      "email": "shabeeb@example.com",
      "department": "Electronics Science"
    },
    "status": "pending",
    "dueDate": "2023-12-15T23:59:59Z",
    "createdBy": "60d21b4d8a8d6c001c2345678",
    "createdAt": "2023-11-01T10:30:00Z",
    "updatedAt": "2023-11-01T10:30:00Z"
  }
}
```

### Student Operations

#### Login (Student)

```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "shabeeb@example.com",
  "password": "password456"
}

Response:
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "60d21b4d8a8d6c001c2345679",
      "name": "Shabeeb K",
      "email": "shabeeb@example.com",
      "role": "student",
      "department": "Electronics Science"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get My Tasks

```
GET /api/student/tasks
Authorization: Bearer <student_token>

Response:
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "60d21b4d8a8d6c001c2345681",
      "title": "Circuit Diagram",
      "description": "Create a circuit diagram for series and parallel resistors",
      "status": "pending",
      "dueDate": "2023-12-15T23:59:59Z",
      "createdAt": "2023-11-01T10:30:00Z",
      "updatedAt": "2023-11-01T10:30:00Z"
    }
  ]
}
```

#### Get Task by ID (Student)

```
GET /api/student/tasks/60d21b4d8a8d6c001c2345681
Authorization: Bearer <student_token>

Response:
{
  "success": true,
  "data": {
    "_id": "60d21b4d8a8d6c001c2345681",
    "title": "Circuit Diagram",
    "description": "Create a circuit diagram for series and parallel resistors",
    "status": "pending",
    "dueDate": "2023-12-15T23:59:59Z",
    "createdAt": "2023-11-01T10:30:00Z",
    "updatedAt": "2023-11-01T10:30:00Z"
  }
}
```

#### Update Task Status

```
PATCH /api/student/tasks/60d21b4d8a8d6c001c2345681/status
Content-Type: application/json
Authorization: Bearer <student_token>

Request:
{
  "status": "completed"
}

Response:
{
  "success": true,
  "message": "Task status updated successfully.",
  "data": {
    "_id": "60d21b4d8a8d6c001c2345681",
    "title": "Circuit Diagram",
    "description": "Create a circuit diagram for series and parallel resistors",
    "status": "completed",
    "dueDate": "2023-12-15T23:59:59Z",
    "createdAt": "2023-11-01T10:30:00Z",
    "updatedAt": "2023-11-05T14:20:00Z"
  }
}
```


