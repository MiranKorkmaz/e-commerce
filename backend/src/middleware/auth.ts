import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const config = process.env

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY || "klöasjdfgjf3q4itjiasv");
        req.body = decoded;
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
    return next();
};

export default verifyToken;
    