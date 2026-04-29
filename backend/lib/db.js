// function that enables us connect to mongo db
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () =>{ 
    //to be accessed in server.js
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`mongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        process.exit(1);
    }
}