import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("authorization");
  const token = authHeader?.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  } else {
  jwt.verify(token, JWT_SECRET, () => {
    req.body.user = token;
    next();
  })
};
}