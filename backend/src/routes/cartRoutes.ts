import express, { Request, Response } from "express";
import { json } from "stream/consumers";
import CartModel from "../models/CartModel";

const cartRoutes = express.Router();

let loggedUserId = "mock-user-id"

const mockUserData = {
    userId: loggedUserId,
    firstName: "Panos",
    lastName: "Tsap",
    email: "panos@pano.com",
    password: "123"
}

// Create Cart
cartRoutes.post("/:id", async (req: Request, res: Response) => {
    JSON.stringify(req.body);
    // console.log("req.body: ", req.body);
    const { cartItems, shippingCost, subTotal, total, userId } = req.body;
    // loggedUserId = userId
    res.send(req.body);
    
    try {
        let cart = await CartModel.findOne({ userId })    
        
        // check if cart with this user id already exists, update the current one 
        if(cart) {
            console.log("entered if")
            cart.cartItems = cartItems;
            cart.shippingCost = shippingCost;
            cart.subTotal = subTotal;
            cart.total = total;
            
            cart = await cart.save();
            return res.status(201);
        }
        else {
            // if cart with the logged in user's id doesn't exist, create a new one
            console.log("entered else")
            const newCart = await CartModel.create({
                cartItems, shippingCost, subTotal, total, userId, 
            })
            return res.status(201);
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500);
    }


    // if(userId !== loggedUserId) {
    //     // Redirect to login page?
    // }

    
});


// Get User Cart
cartRoutes.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    try {
        const userCart = await CartModel.findOne({userId: id}).exec();   
        res.status(200).json({userCart});
    } 
    catch (error) {
        // res.status(400).json(error)
        res.status(400)
    }
});


export default cartRoutes;