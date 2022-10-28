import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw";

export type tokenPayload = {
  user: string;
  userId: string;
};

export interface JwtReq<T> extends Request<T> {
  jsonToken?: tokenPayload;
}

export const authMiddleware = async (
  req: JwtReq<any>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as tokenPayload;
      req.jsonToken = decoded;
    } catch {
      return res.sendStatus(403);
    }
  } else {
    return res.sendStatus(401);
  }
  next();
};