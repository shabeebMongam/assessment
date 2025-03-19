/**
 * API Routes Documentation
 * 
 * This file contains a list of all API routes, sample request/response data,
 * and usage flow examples for the Student Management System API.
 */

// Sample data for reference
const sampleData = {
  // Authentication
  login: {
    admin: {
      request: { email: "admin@admin.com", password: "admin" },
      response: {
        success: true,
        message: "Login successful.",
        data: {
          user: {
            id: "60d21b4d8a8d6c001c2345678",
            name: "Administrator",
            email: "admin@admin.com",
            role: "admin"
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
    },
    student: {
      request: { email: "john.doe@example.com", password: "password123" },
      response: {
        success: true,
        message: "Login successful.",
        data: {
          user: {
            id: "60d21b4d8a8d6c001c2345679",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "student",
            department: "Computer Science"
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
    }
  },
  
  // Admin operations
  admin: {
    addStudent: {
      request: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Electrical Engineering",
        password: "password456"
      },
      response: {
        success: true,
        message: "Student added successfully.",
        data: {
          id: "60d21b4d8a8d6c001c2345680",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          department: "Electrical Engineering",
          role: "student"
        }
      }
    },
    assignTask: {
      request: {
        title: "Database Assignment",
        description: "Create an ER diagram for a library management system",
        assignedTo: "60d21b4d8a8d6c001c2345679", // Student ID
        dueDate: "2023-12-15T23:59:59Z"
      },
      response: {
        success: true,
        message: "Task assigned successfully.",
        data: {
          _id: "60d21b4d8a8d6c001c2345681",
          title: "Database Assignment",
          description: "Create an ER diagram for a library management system",
          assignedTo: "60d21b4d8a8d6c001c2345679",
          status: "pending",
          dueDate: "2023-12-15T23:59:59Z",
          createdBy: "60d21b4d8a8d6c001c2345678",
          createdAt: "2023-11-01T10:30:00Z",
          updatedAt: "2023-11-01T10:30:00Z"
        }
      }
    }
  },
  
  // Student operations
  student: {
    updateTaskStatus: {
      request: { status: "completed" },
      response: {
        success: true,
        message: "Task status updated successfully.",
        data: {
          _id: "60d21b4d8a8d6c001c2345681",
          title: "Database Assignment",
          description: "Create an ER diagram for a library management system",
          assignedTo: "60d21b4d8a8d6c001c2345679",
          status: "completed",
          dueDate: "2023-12-15T23:59:59Z",
          createdBy: "60d21b4d8a8d6c001c2345678",
          createdAt: "2023-11-01T10:30:00Z",
          updatedAt: "2023-11-05T14:20:00Z"
        }
      }
    }
  }
};

// API Routes
const apiRoutes = {
  auth: {
    login: {
      method: "POST",
      url: "/api/auth/login",
      description: "Login for both admin and students",
      body: { email: "string", password: "string" }
    }
  },
  
  admin: {
    addStudent: {
      method: "POST",
      url: "/api/admin/students",
      description: "Add a new student",
      auth: "Admin token required",
      body: {
        name: "string",
        email: "string",
        department: "string",
        password: "string"
      }
    },
    getAllStudents: {
      method: "GET",
      url: "/api/admin/students",
      description: "Get all students",
      auth: "Admin token required"
    },
    assignTask: {
      method: "POST",
      url: "/api/admin/tasks",
      description: "Assign a task to a student",
      auth: "Admin token required",
      body: {
        title: "string",
        description: "string",
        assignedTo: "string (student ID)",
        dueDate: "string (ISO date format)"
      }
    },
    getAllTasks: {
      method: "GET",
      url: "/api/admin/tasks",
      description: "Get all tasks",
      auth: "Admin token required"
    },
    getTaskById: {
      method: "GET",
      url: "/api/admin/tasks/:id",
      description: "Get a specific task by ID",
      auth: "Admin token required"
    }
  },
  
  student: {
    getMyTasks: {
      method: "GET",
      url: "/api/student/tasks",
      description: "Get tasks assigned to the logged-in student",
      auth: "Student token required"
    },
    getTaskById: {
      method: "GET",
      url: "/api/student/tasks/:taskId",
      description: "Get a specific task by ID",
      auth: "Student token required"
    },
    updateTaskStatus: {
      method: "PATCH",
      url: "/api/student/tasks/:taskId/status",
      description: "Update task status (mark as completed)",
      auth: "Student token required",
      body: { status: "string (completed)" }
    }
  }
};

/**
 * Usage Flow Examples
 * 
 * 1. Admin Flow:
 *    a. Login as admin using /api/auth/login
 *    b. Add students using /api/admin/students
 *    c. View all students using /api/admin/students
 *    d. Assign tasks to students using /api/admin/tasks
 *    e. View all tasks using /api/admin/tasks
 *    f. View specific task details using /api/admin/tasks/:id
 * 
 * 2. Student Flow:
 *    a. Login as student using /api/auth/login
 *    b. View assigned tasks using /api/student/tasks
 *    c. View specific task details using /api/student/tasks/:taskId
 *    d. Mark task as completed using /api/student/tasks/:taskId/status
 * 
 * Authentication:
 * - After login, use the received JWT token in the Authorization header:
 *   Authorization: Bearer <your_jwt_token>
 */

export { apiRoutes, sampleData };