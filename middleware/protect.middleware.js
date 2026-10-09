import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
import Session from "../model/session.model.js"
import {JWT_SECRET} from "../config/env.js"
import {errorMessage} from "../utils/errorMessage.js"

export const protect = async (req, res, next )=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return next(errorMessage("No token please log in"))
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, JWT_SECRET)

        const activeSession =  await Session.findOne({token});
        if (!activeSession){
            return next(errorMessage("Session ended please log in again"))
        }

        const user = await User.findById(decoded.userId)
        if (!user){
            return next(errorMessage("User no longer exisist"))
        }
        req.user = user 
        next()
    } catch (error) {
        next(error)
    }
}