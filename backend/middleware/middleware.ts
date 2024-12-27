import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload as JwtPayloadType } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload extends JwtPayloadType{
    id: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

// Middleware to authenticate JWT tokens
export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(403).json({ message: "Access token required" });
        return;
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "defaultSecret",
        (err, user) => {
            if (err) {
                res.status(403).json({ message: "Invalid token" });
                return;
            }
            req.user = user as JwtPayload;
            next();
        }
    );
};

// Middleware to authorize specific roles
export const authorizeRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        next();
    };
};
