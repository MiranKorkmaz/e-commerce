import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw";

export type TokenPayload = {
  user_id: string;
  email: string;
};

export interface JwtRequest<T> extends Request<T> {
  jwt? : TokenPayload;
}

export const authMiddleware = (
  req: JwtRequest<any>,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("authorization")?.split(" ")[1];

  if (authHeader) {
    try {
      const token = authHeader;
      const payload = jsonwebtoken.verify(token, JWT_SECRET) as TokenPayload;
      req.jwt = payload;
      next();
    } catch (error) {
      res.status(401).send({ message: "Invalid token" });
    }
  } else {
    res.status(401).send({ message: "No token" });
  }
};
  

export const generateAccessToken = (payload: TokenPayload) => {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

