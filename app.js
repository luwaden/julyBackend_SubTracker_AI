//const express = require('express') 
import express from "express"
 import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import {PORT, NODE_ENV, CLIENT_URL, } from "./config/env.js"

import authRouter from "./routes/auth.routes.js"
import connectToDataBase from "./database/mongodb.js"


const app = express()
app.set("trust proxy", 1);

const allowedOrigins = (CLIENT_URL || "http://localhost:5173").split(",").map((url)=>url.trim()).filter(Boolean)

app.use(
    cors({
        origin(origin, callback){
            if(!origin || allowedOrigins.icludes(origin)){
                return callback(null, true)
            }

            return callback(new Error(`CORS blocked for origin: ${origin}`))
        },
        credentials:true
    
    })
)
app.use(helmet())
app.use(morgan( NODE_ENV === "production" ? "combined" : "dev"))
app.use(express.json())

app.get("/", (req, res)=>{
    res.status(200).json({status: "ok", service:"Subscription tracker API is working fine"})
})
app.get('/greeting', (req, res)=>{
    const userName = "Guest"
    res.status(200).json({success:true, message: `Hello ${userName}! welcome to the aAPI`})
})

app.use("/api/v1/users", authRouter)


const startServer = async ()=>{
    await connectToDataBase()

    const port  = PORT 
    app.listen(port, ()=>{
        console.log(`The Subscript-Tracker server (${NODE_ENV || "development"})  is running on port localhost:${port} `);
        
    })
}

startServer()
export default app
