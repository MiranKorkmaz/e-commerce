import express, { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRoutes = express.Router();
const JWT_SECRET = process.env.TOKEN_KEY || "klöasjdfgjf3q4itjiasv";

// NEW USER SIGNUP
userRoutes.post("/signup", async (req: Request, res: Response) => {
  try {
  const { firstName, lastName, email, password, deliveryAdress } = req.body;

  if (!(email && password && firstName && lastName)) {
    res.status(400).send("All input is required");
  }

  //Encrypt user password
  const encryptedUserPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      firstName,
      lastName,
      deliveryAdress,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    });
    
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
        process.env.TOKEN_KEY || "klöasjdfgjf3q4itjiasv",
      {
        expiresIn: "1h",
      }
    );
    
    // save user token
    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
})



// LOGIN USER 
userRoutes.post("/login", async (req: Request, res: Response) => {

    // try {
      const { email, password, _id } = req.body;

      if (!email || !password) {
        res.status(400).send({ message: "Please enter all fields" });
      }
      
      const user = await UserModel.findOne({ email: email.toLowerCase(), id: _id});

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY || "klöasjdfgjf3q4itjiasv",
          {
            expiresIn: "1h",
          }
        );
        user.token = token;
        return res.status(200).json(user);
      }
      return res.status(400).send({ message: "Invalid Credentials" });
    })


// GET ALL USER;
userRoutes.get("/", async (req: Request, res: Response) => {
  try {
  const user = await UserModel.find({})
  res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
})

// GET LOGGED IN USER
userRoutes.get("/user/:id", async (req: Request, res: Response) => {
// userRoutes.get("/user/", async (req: Request, res: Response) => {
  const { id } = req.params;
  // const user2 = req.body.user;
  // const user2Id = user2.user_id;
  // console.log(req.body.user);
  // console.log(`USER ROUTES req.body.user = user2: ${JSON.stringify(user2)}`);
  // console.log(`USER ROUTES req.body.user.user_id = user2Id: ${JSON.stringify(user2Id)}`);
  // const user3 = JSON.stringify(user2);
  // console.log(`USER ROUTES req.body.user = user3: ${JSON.stringify(user3)}`);
  try {
  const user = await UserModel.findById(id)
  res.status(200).json(user);
  // console.log(`res status user is 200: ${JSON.stringify(user)}`);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
})

// UPDATE USER
userRoutes.put("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
  const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
  res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
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

