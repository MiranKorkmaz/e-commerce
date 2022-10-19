import dotenv from "dotenv"

dotenv.config();
import mongoose from "mongoose";

const connectionStr: string = process.env.MONGO_URL || "mongodb://localhost:27017";

mongoose.connect(connectionStr)
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
