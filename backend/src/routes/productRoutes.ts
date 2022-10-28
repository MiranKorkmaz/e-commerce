import express, { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import UserModel from "../models/UserModel";
import { authMiddleware } from "../services/auth";

const productRoutes = express.Router();

productRoutes.get("/", authMiddleware, async (req: Request, res: Response) => {
    const search = req.query.search || "";
    const products = await ProductModel.find({ name: { $regex: search, $options: "i" }}).sort({ _id: -1, })
    res.status(200).json(products)
});

productRoutes.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        res.status(200).json({product})
      } catch {
        res.status(400);
      }
})

productRoutes.get('/products?category=:category', async (req: Request, res: Response) => {
    const {category} = req.params;

    try {
      let products;
      if (category == "all") {
        products = await ProductModel.find({}).sort({ _id: -1 }).exec();
      } else {
        products = await ProductModel.find({ category }).sort({ _id: -1 }).exec()
      }
      res.status(200).json(products)
    } catch (e: unknown) {
      res.status(400).send(e);
    }
})

// Cart Routes
productRoutes.post('/add-to-cart', async (req, res)=> {
    const {userId, productId, price} = req.body;
    try {
      const user = await UserModel.findById(userId);
      const userCart = user!.cart;
      if(user!.cart[productId]){
        userCart[productId] += 1;
      } else {
        userCart[productId] = 1;
      }
      userCart.count += 1;
      userCart.total = Number(userCart.total) + Number(price);
      if (user) {
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  productRoutes.post('/increase-cart', async(req: Request, res: Response)=> {
    const {userId, productId, price} = req.body;
    try {
      const user = await UserModel.findById(userId);
      const userCart = user!.cart;
      userCart.total += Number(price);
      userCart.count += 1;
      userCart[productId] += 1;
      if (user) {
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  
  productRoutes.post('/decrease-cart', async (req: Request, res: Response)=> {
    const {userId, productId, price} = req.body;
    try {
      const user = await UserModel.findById(userId);
      const userCart = user!.cart;
      userCart.total -= Number(price);
      userCart.count -= 1;
      userCart[productId] -= 1;
      if (user) {
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  
  productRoutes.post('/remove-from-cart', async (req: Request, res: Response)=> {
    const {userId, productId, price} = req.body;
    try {
      const user = await UserModel.findById(userId);
      const userCart = user!.cart;
      userCart.total -= Number(userCart[productId]) * Number(price);
      userCart.count -= userCart[productId];
      delete userCart[productId];
      if (user) {
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  

export default productRoutes;