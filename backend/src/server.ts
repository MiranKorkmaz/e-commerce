import express, { Application, json, Request, Response } from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { mongoDbSetUp } from './models/ProductModel';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import jwt from 'jsonwebtoken';

dotenv.config();

const app: Application = express()
app.use(cors())
app.use(json())

const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoDbURL: string = process.env.MONGO_URL ||  "mongodb://localhost:27017";
const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/register", userRoutes)

app.listen(port, async function () {
    await mongoDbSetUp(mongoDbURL)
    console.log(`App is listening on port ${port} !`)
})