import express, { Request, Response } from "express";
import CartModel from "../models/CartModel";

const cartRoutes = express.Router();

cartRoutes.post("/:id", async (req: Request, res: Response) => {
    JSON.stringify(req.body);
    const { cartItems, shippingCost, subTotal, total, userId } = req.body;
    res.send(req.body);

    try {
        let cart = await CartModel.findOne({ userId })    
        if(cart) {
            cart.cartItems = cartItems;
            cart.shippingCost = shippingCost;
            cart.subTotal = subTotal;
            cart.total = total;
            cart = await cart.save();
            return res.status(201);
        }
        else {
            const newCart = await CartModel.create({
                cartItems, shippingCost, subTotal, total, userId, 
            })
            return res.status(201);
        }
    } 
    catch (error) {
        res.status(500);
    }
});

cartRoutes.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userCart = await CartModel.findOne({userId: id}).exec();   
        res.status(200).json({userCart});
    } 
    catch (error) {
        res.status(400)
    }
});


export default cartRoutes;