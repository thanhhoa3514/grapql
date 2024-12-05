// const mongoose = require("mongoose");
import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('MongoDB URL is not defined');
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}
// mongoose.connect(process.env.MONGODB_URL);