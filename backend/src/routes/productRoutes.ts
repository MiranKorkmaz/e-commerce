import express, { Request, Response } from "express";
import ProductModel, { loadAllProducts } from "../models/ProductModel";

const productRoutes = express.Router();

productRoutes.get("/", async (req: Request, res: Response) => {
    res.send(await loadAllProducts())
});

productRoutes.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        // const similar = await ProductModel.find({category: product.category}).limit(5);
        res.status(200).json({product})
      } catch {
        res.status(400);
      }
})

productRoutes.get('/category/:category', async (req: Request, res: Response)=> {
    const {category} = req.params;
    try {
      let products;
      if (category == "all") {
        products = await ProductModel.find({}).sort({ _id: -1 }).exec();
      } else {
        products = await ProductModel.find({category}).sort({ _id: -1 }).exec()
      }
      res.status(200).json(products)
    } catch (e: unknown) {
      res.status(400).send(e);
    }
})


export default productRoutes;