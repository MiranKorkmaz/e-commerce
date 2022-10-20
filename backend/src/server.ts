import express, { Application, json, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { mongoDbSetUp } from './models/ProductModel';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
<<<<<<< HEAD
// import jwt from 'jsonwebtoken';
=======
import orderRoutes from './routes/orderRoutes';
>>>>>>> master

dotenv.config();

const app: Application = express()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoDbURL: string = process.env.MONGO_URL ||  "mongodb://localhost:27017";
const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)


app.listen(port, async function () {
    await mongoDbSetUp(mongoDbURL)
    console.log(`App is listening on port ${port} !`)
})