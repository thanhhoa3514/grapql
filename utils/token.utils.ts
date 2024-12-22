import jwt from "jsonwebtoken";
import crypto from 'crypto';

interface TokenPayload {
    userId: string;
    email: string;
}

export const generateToken = (payload: TokenPayload): string => {
    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY not defined in environment variables");
    }
    
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    );
};

export const generateRefreshToken = (): string => {
    return crypto.randomBytes(40).toString('hex');
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(
            token, 
            process.env.SECRET_KEY!
        ) as TokenPayload;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};