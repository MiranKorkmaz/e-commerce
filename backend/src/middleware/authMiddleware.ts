import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";


const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token

      // check json web token exists & is verified
    if(token) {
        jwt.verify(token, process.env.TOKEN_KEY || "klöasjdfgjf3q4itjiasv", (err: any, decodedToken: any) => {
            if(err) {
                console.log(err.message);
                res.status(401).send('Unauthorized');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        // res.status(401).send('Unauthorized');
        res.redirect('/login');
    }
}

    // check current user
const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token

    if(token) {
        jwt.verify(token, process.env.TOKEN_KEY || "klöasjdfgjf3q4itjiasv", async (err: any, decodedToken: any) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

export { requireAuth, checkUser };
