import { Request, Response } from "express";
import User from "../models/user.model";
import Task from "../models/task.model";

// Add a new student
export const addStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, department, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use.",
      });
    }

    // Create new student
    const student = new User({
      name,
      email,
      department,
      password,
      role: "student",
    });

    await student.save();

    return res.status(201).json({
      success: true,
      message: "Student added successfully.",
      data: {
        id: student._id,
        name: student.name,
        email: student.email,
        department: student.department,
        role: student.role,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding student.",
      error: error.message,
    });
  }
};

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    
    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching students.",
      error: error.message,
    });
  }
};

// Assign task to student
export const assignTask = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    // Validate student existence
    const student = await User.findOne({
      _id: assignedTo,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Create task
    const task = new Task({
      title,
      description,
      assignedTo,
      dueDate: new Date(dueDate),
      createdBy: req.user?.id,
    });

    await task.save();

    return res.status(201).json({
      success: true,
      message: "Task assigned successfully.",
      data: task,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while assigning task.",
      error: error.message,
    });
  }
};

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email department")
      .populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching tasks.",
      error: error.message,
    });
  }
};

// Get task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email department")
      .populate("createdBy", "name email");
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching task.",
      error: error.message,
    });
  }
};
