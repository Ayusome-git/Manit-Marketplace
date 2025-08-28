import admin from "../admin";
import { Request, Response, NextFunction } from "express";

export async function authmiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).json({ error: "No token provided" });
        return 
    }
    const token = authHeader
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const id=decodedToken.email?.split("@")[0];
        (req as any).id = id
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
        return
    }
}
