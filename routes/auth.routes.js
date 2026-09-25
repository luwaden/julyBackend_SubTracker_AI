import {Router} from "express"
import {signUp, signIn, signOut} from "../controller/auth.controller.js";


const authRouter = Router() 

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.post("/sign-out", signOut)

// authRouter.get("/Quadri", (req, res)=>{
//     res.send("why is Quadri sleeping in the class?")
// })

export default authRouter;