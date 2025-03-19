import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

interface DecodedToken {
  id: string;
  role: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. No token provided."
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as DecodedToken;

    // Find user by id
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found."
      });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed. Invalid token."
    });
  }
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required."
    });
  }
};

export const authorizeStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Student privileges required."
    });
  }
};
