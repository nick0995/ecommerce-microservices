const mongoose = require('mongoose')
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() =>{
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}
