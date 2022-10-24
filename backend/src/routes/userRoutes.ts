import express, { Request, Response } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/auth";

const userRoutes = express.Router();
const auth = verifyToken;


// NEW USER SIGNUP
userRoutes.post("/signup", async (req: Request, res: Response) => {
  try {
  const { firstName, lastName, email, password } = req.body;

  if (!(email && password && firstName && lastName)) {
    res.status(400).send("All input is required");
  }

  //Encrypt user password
  const encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedUserPassword,
    });
    // res.header("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    // );

    //Encrypt user password  

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
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).send({ message: "Please enter all fields" });
      }
      
      const user = await UserModel.findOne({ email: email.toLowerCase()});

      if (user && (await bcrypt.compare(password, user.password))) {
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
        // user
        console.log(`THINK I GOT IN ${user}`);
        return res.status(200).json(user);
      }
      return res.status(400).send({ message: "Invalid Credentials" });
    })



// GET USER
userRoutes.get("/profile", auth, async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.body.user_id);
  res.status(200).json(user);
});


// userRoutes.get("/profile", auth, async (req: Request, res: Response) => {
//     try {
//         const users = await UserModel.find({});
//         res.status(200).json(users);
//       } catch {
//         res.status(400);
//       }
//     })




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

function useState(arg0: any): [any, any] {
  throw new Error("Function not implemented.");
}
