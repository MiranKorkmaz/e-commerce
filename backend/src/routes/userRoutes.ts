import express, { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "../services/auth";

const userRoutes = express.Router();

userRoutes.post("/signup", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone, address } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    const encryptedUserPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      firstName,
      lastName,
      address,
      phone,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET || "0823uoiwehfFusTKLciadfsbaasd2346sdfbjaenrw",
      {
        expiresIn: "1h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});



userRoutes.post("/login", async (req: Request, res: Response) => {
  // try {
  const { email, password, _id } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Please enter all fields" });
  }

  const user = await UserModel.findOne({ email: email.toLowerCase(), id: _id });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY || "klöasjdfgjf3q4itjiasv",
      {
        expiresIn: 1000,
      }
    );
    user.token = token;
    return res.status(200).json(user);
  }
  return res.status(400).send({ message: "Invalid Credentials" });
});

userRoutes.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

userRoutes.get(
  "/user/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

userRoutes.put(
  "/user/:id",
  // authMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

userRoutes.get(
  "/:id/orders",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById(req.params.id).populate("orders");
      res.json(user?.orders);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

export default userRoutes;
