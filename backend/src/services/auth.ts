import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const JWT_SECRET = process.env.JWT_SECRET || "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw"

export type JwtPayload = {
  email: string | undefined
  _id: string | undefined
}
export interface JwtRequest<T> extends Request<T> {
  jwt?: JwtPayload
}

export function createJwtToken(payload: JwtPayload) {
  const token: string = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
  return token
}

export const authenticateJwtTokenMiddleware = async (req: JwtRequest<string>, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.header("authorization")
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    console.log("token", token)
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
      console.log("decoded", decoded)
      req.jwt = decoded
    } else {
      return res.sendStatus(400) // bad token
    }
  } else {
    return res.sendStatus(401) // missing header
  }
  next()
}

