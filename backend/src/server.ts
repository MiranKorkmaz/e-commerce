import express, { Application, json, NextFunction, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { mongoDbSetUp } from './models/ProductModel';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import bodyParser from "body-parser";
import verifyToken from './middleware/auth';

const auth = verifyToken;

dotenv.config();

const app: Application = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({extended: true}))

const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoDbURL: string = process.env.MONGO_URL ||  "mongodb://localhost:27017/";

app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)
// app.use("/profile", cors(), auth, userRoutes)
app.use("/profile", userRoutes)

app.get('/cors', (_req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*');
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    mongoDbSetUp(mongoDbURL)
})

