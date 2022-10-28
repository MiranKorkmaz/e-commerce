import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("authorization");
  const token = authHeader?.split(" ")[1];
  
  console.log("authHeader", authHeader);
  console.log("TOKEN", token);

  if (token == null) {
    return res.sendStatus(401);
  } else {
  jwt.verify(token, JWT_SECRET, () => {
    // if (err) return res.sendStatus(403);
    req.body.user = token;
    console.log("CODE COMES HERE");
    next();
  })
  }
};