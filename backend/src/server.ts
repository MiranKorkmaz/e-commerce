import express, { Application, json, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { mongoDbSetUp } from './models/ProductModel';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import jwt from 'jsonwebtoken';

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

app.use((req, _res, next) => {
    const authHeader = req.header("Authorization")
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        try {
            const user = jwt.verify(token, JWT_SECRET)
            req.user = user
        } catch (e) {
            console.log(e)
        }
    }
    navigate("/login")
})

app.listen(port, async function () {
    await mongoDbSetUp(mongoDbURL)
    console.log(`App is listening on port ${port} !`)
})

function navigate(arg0: string) {
    throw new Error('Function not implemented.');
}
