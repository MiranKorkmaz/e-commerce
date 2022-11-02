import express, { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import UserModel from "../models/UserModel";


const orderRoutes = express.Router();

orderRoutes.post('/', async (req: Request, res: Response) => {
    console.log(`req.body in Stringify: ${JSON.stringify(req.body)}`)
    console.log(`req.body: ${req.body.owner}, ${req.body.owner}, ${req.body.products}, ${req.body.address}`)
    try {
        const { owner, products, address, total, count, date, status, shippingCost } = req.body;
        const order = JSON.stringify({ owner, products, address, total, count, date, status, shippingCost });

        if (order) {
            const orders = await OrderModel.create({ 
                owner,
                products,
                address,
                total,
                count,
                date,
                status,
                shippingCost,
            });

            res.status(201).json(orders)
            console.log("ORDER CREATED")
        }
    } catch (e) {
        res.status(400).json(e)
        console.log("ORDER CRASHED")
    }
})


// delete order
orderRoutes.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`Delete id: ${id}`)	
    try {
        const order = await OrderModel.findOne({id}).remove();
        res.status(200).json(order)
    } catch (e) {
        res.status(400).json(e)
    }
})


// get orders
orderRoutes.get('/', async (req: Request, res: Response)=> {
    try {
      const orders = await OrderModel.find({});
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json(e)
    }
  })

export default orderRoutes;
