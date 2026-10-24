import mongoose from "mongoose"
import { serverConfig } from "."
import logger from "./logger.config";

export const connectDB=async()=>{
    try{
        await mongoose.connect(serverConfig.MONGO_URI);
        logger.info("MongoDB connected successfully");
    }catch(error){
        logger.error("MongoDB connection error",error);
        throw error;
    }
}