import express, { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import UserModel from "../models/UserModel";


const orderRoutes = express.Router();

// orderRoutes.post('/', async (req: Request, res: Response) => {
    
//     try {
//         const { owner, products, address, total, count, date, status, shippingCost } = req.body;
//         const order = JSON.stringify({ owner, products, address, total, count, date, status, shippingCost });
   
//         if (order) {
//             const orders = await OrderModel.create({ 
//                 owner,
//                 products,
//                 address,
//                 total,
//                 count,
//                 date,
//                 status,
//                 shippingCost,
//             });
//             res.status(201).json(orders)
//         }
//     } catch (e) {
//         res.status(400).json(e)
//     }
// })


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


// delete order
orderRoutes.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await OrderModel.deleteOne({ owner : id });
        res.status(200).json(order)
    } catch (e) {
        res.status(400).json(e)
    }
})


// get orders
orderRoutes.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    //   const order = await OrderModel.findOne({ owner: id });
      const orders = await OrderModel.find({ owner: id });
      console.log(orders)
      res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
})

export default orderRoutes;
