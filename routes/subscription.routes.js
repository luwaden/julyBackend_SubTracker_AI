import {Router} from "express"
import { createSubscription } from "../controller/subscription.controller.js"
import {protect} from "../middleware/protect.middleware.js"

const subRouter = Router()

subRouter.post("/create",protect, createSubscription)

export default subRouter