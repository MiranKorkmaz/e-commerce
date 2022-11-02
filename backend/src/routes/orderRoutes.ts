import express, { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import UserModel from "../models/UserModel";


const orderRoutes = express.Router();

// create order
// orderRoutes.post('/', async (req: Request, res: Response) => {
//     const { userId, cart, address } = req.body;
//     try {
//         const user = await UserModel.findById(userId);
//         const order = await OrderModel.create({ owner: user?._id, products: cart, address });
//         order.count = cart.count;
//         order.total = cart.total;
//         await order.save();
//         if (user) {
//             user.cart = { total: 0, count: 0 };
//             user?.orders.push(order);
//             user.markModified('orders');
//             await user.save();
//         }
//         res.status(200).json(user)

//     } catch (e) {
//         res.status(400).json(e)
//     }
// })


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


// get orders
orderRoutes.get('/', async (req: Request, res: Response)=> {
    try {
      const orders = await OrderModel.find().populate('owner', ['email', 'firstName', 'lastName']);
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json(e)
    }
  })

export default orderRoutes;
