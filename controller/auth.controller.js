import User from "../model/user.model.js"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js"
import Session from "../model/session.model.js"

export const signUp = async(req, res, next)=>{
    const session = await mongoose.startSession();
    session.startTransaction()

    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({ email});

        if (existingUser){
            const error = new Error('User already exisit ');
            error.statusCode = 404; 
            throw error 
         }
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUsers = await User.create([{name, email, password: hashedPassword }], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN })

        const expiresAt = new Date(Date.now() +7 * 24 * 60 * 60 * 1000); //7days
        await Session.create([{userId: newUsers[0]._id, token, expiresAt}], {session,})

        await session.commitTransaction()
        session.endSession()

        const userToReturn = newUsers[0].toObject()
        delete userToReturn.password
        
        res.status(201).json({
            success: true, 
            message:'User created successfully',
            data:{token, user: userToReturn}
        })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}


export const signIn = async(req, res, next )=>{
    try{
        const {email, password} = req.body
        const user =await User.findOne({email}).select("+password");
        if(!user){
            const error = new Error("user not found")
            error.statusCode = 404;
            throw error
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const error = new Error("Invalid Password")
            error.statusCode = 404;
            throw error
        }

        const token = jwt.sign({userId: user.Id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
         const expiresAt = new Date(Date.now() + 7*24*60*60*1000);
         await Session.create({userId: user._id, token, expiresAt})

         const userToReturn = user.toObject()
         delete userToReturn.password

         res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {token, user: userToReturn}
         })

    }
    catch (error){
        next (error)

    }
}