import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: mongoose.Types.ObjectId;
  status: "pending" | "completed" | "overdue";
  dueDate: Date;
  createdBy: mongoose.Types.ObjectId;
}

const taskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "overdue"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Update pre-save middleware to check completion and handle overdue status
taskSchema.pre('save', function(next) {
  const currentDate = new Date();
  
  // Set status to overdue if due date has passed and task is still pending
  if (this.dueDate < currentDate && this.status === 'pending') {
    this.status = 'overdue';
  }
  
  // Prevent changing status to completed if task is overdue
  if (this.isModified('status') && this.status === 'completed') {
    // Check if due date has passed
    if (this.dueDate < currentDate) {
      const err = new Error('Cannot mark an overdue task as completed');
      return next(err);
    }
  }
  
  next();
});

export default mongoose.model<ITask>("Task", taskSchema);
