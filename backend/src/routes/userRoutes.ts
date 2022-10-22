import express, { Request, Response } from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRoutes = express.Router();

// SIGNUP
userRoutes.post("/signup", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body
  try {
      const user = await UserModel.create({ firstName, lastName, email, password })      
      const token = jwt.sign({ email, password }, "secret123", { expiresIn: "1h" })
      res.status(200).json({ user, token })
  } catch (error) {
      res.status(500).json({message: "Something went wrong"})
  }
})
  
  

  
  
//   const { firstName, lastName, email, password } = req.body;

//     try {
//         const user = await UserModel.create({ firstName, lastName, email, password });
//         res.status(201).json({ user });
//     } catch (error) {
//         res.status(400).json({ message: "User could not be created" });
//     }
// });

    // const user = new UserModel({firstName, lastName, email, password})
    // await user.save()
    // res.json({firstName, lastName, email, password})


// LOGIN
userRoutes.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.find(email, password);
        res.json(user);
    } catch (e: unknown) {
        res.status(400).send(e)
    }
})

// GET USER
userRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
      } catch {
        res.status(400);
      }
    })


// GET USER ORDERS
userRoutes.get("/:id/orders", async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('orders');
        res.json(user?.orders);
      } catch (e) {
        res.status(400).send(e);
      }
    })

export default userRoutes;