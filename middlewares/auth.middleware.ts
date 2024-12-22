import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/users.model";

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ 
                success: false,
                message: "Authentication required" 
            });
        }
        
        const token = authHeader.split(" ")[1];
        
        // Verify token
        const decoded = jwt.verify(
            token, 
            process.env.SECRET_KEY!
        ) as jwt.JwtPayload;
        
        // Find user
        const user = await User.findOne({
            _id: decoded.userId,
            deleted: false
        }).select("-password");
        
        if (!user) {
            return res.status(403).json({ 
                success: false,
                message: "User not found or invalid token" 
            });
        }
        
        // Add user to request object
        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false,
            message: "Invalid or expired token" 
        });
    }
};