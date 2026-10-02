import {Router} from "express"
import { createSubscription } from "../controller/subscription.controller.js"

const subRouter = Router()

subRouter.post("/createSub", createSubscription)

export default subRouter