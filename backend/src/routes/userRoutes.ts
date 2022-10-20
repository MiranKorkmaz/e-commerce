import express, { Request, Response } from "express";
import UserModel from "../models/UserModel";

const userRoutes = express.Router();

// REGISTER
userRoutes.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserModel.create({ name, email, password });
        res.json(user);
    } catch (e: unknown) {
        if(e === 11000) return res.status(400).send('Email already exists');
    res.status(400).send(e)
  }
})

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
        const users = await UserModel.find({}).populate('orders');
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