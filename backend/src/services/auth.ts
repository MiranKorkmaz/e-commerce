import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw";

// export type tokenPayload = {
//   user_id: string;
// };

// export interface JwtReq<T> extends Request<T> {
//   jsonToken?: tokenPayload;
// }

// export const authMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token: string | undefined = req.header("authorization")?.split(" ")[1];
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET)
//       req.jsonToken = decoded;
//     } catch {
//       return res.sendStatus(403);
//     }
//   } else {
//     return res.sendStatus(401);
//   }
//   next();
// };

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.header("authorization");
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, JWT_SECRET)
//   }
//       next();
// };

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("authorization");

  console.log("authHeader", authHeader);

  const token = authHeader?.split(" ")[1];

  console.log("TOKEN", token);

  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, JWT_SECRET, () => {
    // if (err) return res.sendStatus(403);
    req.body.user = token;
    console.log("CODE COMES HERE");
    next();
  })
};