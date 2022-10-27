import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// const JWT_SECRET = process.env.TOKEN_KEY || "klöasjdfgjf3q4itjiasv";

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization")?.split(" ")[1];

    console.log(token);

    if (token) {
        try {
            const decoded = jwt.verify(token, "klöasjdfgjf3q4itjiasv") 
            req.body.user = decoded;
            console.log(`AUTH FILE req.dody.user = decoded: ${JSON.stringify(decoded)}`);
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(401).json({ message: "No token" });
    }
}


     