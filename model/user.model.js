import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:[true, 'Name is required'],
    trim: true, 
    minLength:[2, 'name must be at least 2 charcters.'],
    maxLength:[50, 'Name must be at most 50 characters long'],
   },
   email:{
    type:String,
    required:[true, 'insert your email'],
    unique:[true, 'the email is currently in the data base '], 
    trim:true,
    lowercase: true,
    match:[/\S+@\S+\.\S+/, "Please provide a valid email address"]
   
   },
   password:{
    type:String,
     match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/],
     select: false
   }
}, 
{timestamp: true})

const User = mongoose.model("User", userSchema)

export default User 

