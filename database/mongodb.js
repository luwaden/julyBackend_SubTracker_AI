import mongoose from "mongoose"
import  {DB_URI, NODE_ENV } from "../config/env.js"

if(!DB_URI){
    throw new Error("DB URI is not defined in enviroment variales inside .env.<development/production>.local")
}

const connectToDataBase = async()=>{
    try {
        await mongoose.connect(DB_URI)
        console.log(`MonogoDB conected successfully in ${NODE_ENV} mode `);
        
    } catch (error) {
       console.error("Error connecting to MongoDB", error);
       process.exit(1)
    }
}

export default connectToDataBase