import express, { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import UserModel from "../models/UserModel";

const orderRoutes = express.Router();

orderRoutes.post('/', async (req: Request, res: Response) => {
    const { owner, products, address, total, count, date, status, shippingCost  } = req.body;
    try {
        const user = await UserModel.findById(owner);
        const order = await OrderModel.create({ owner: user?._id, products: products, address, shippingCost, total, count, date, status });
        await order.save();
        if (user) {
            await user.save();
        }
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e)
    }
})

orderRoutes.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      const orders = await OrderModel.find({ owner: id });
      res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
})

export default orderRoutes;
