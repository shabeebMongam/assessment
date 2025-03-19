import { Request, Response } from "express";
import Task from "../models/task.model";

// Get tasks assigned to student
export const getMyTasks = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?._id;
    
    // Get tasks with status update if they are overdue
    const tasks = await Task.find({ assignedTo: studentId });
    
    // Check for overdue tasks and update their status
    const currentDate = new Date();
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        // If task is pending and past due date, mark as overdue
        if (task.status === "pending" && task.dueDate < currentDate) {
          task.status = "overdue";
          await task.save();
        }
        return task;
      })
    );
    
    return res.status(200).json({
      success: true,
      count: updatedTasks.length,
      data: updatedTasks,
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

// Update task status (only for tasks assigned to the student)
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const studentId = req.user?._id;

    // Validate status
    if (status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Students can only mark tasks as completed.",
      });
    }

    // Find task assigned to this student
    const task = await Task.findOne({
      _id: taskId,
      assignedTo: studentId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not assigned to you.",
      });
    }

    // Check if task is overdue
    const currentDate = new Date();
    if (task.dueDate < currentDate && task.status === "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot mark an overdue task as completed.",
      });
    }

    // Update task status
    task.status = status;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      data: task,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating task status.",
      error: error.message,
    });
  }
};

// Get task details by ID (only if assigned to the student)
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const studentId = req.user?._id;

    const task = await Task.findOne({
      _id: taskId,
      assignedTo: studentId,
    }).populate("createdBy", "name email");
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not assigned to you.",
      });
    }

    // Check if task is overdue
    const currentDate = new Date();
    if (task.status === "pending" && task.dueDate < currentDate) {
      task.status = "overdue";
      await task.save();
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
