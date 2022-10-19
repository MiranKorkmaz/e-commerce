import express, { Request, Response } from "express";
import { loadAllProducts } from "../models/ProductModel";

const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
    return await loadAllProducts()
});


export default productRoute;