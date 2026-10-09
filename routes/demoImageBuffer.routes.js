import { Router } from "express";
import {protect} from "../middleware/protect.middleware.js"
import upload from "../middleware/upload.middleware.js"

import { uploadImageBuffer } from "../controller/demoImageBuffer.controller.js";

const demoImageBufferRouter =  Router()

demoImageBufferRouter.post("/", protect, upload.single("image"), uploadImageBuffer)

export default demoImageBufferRouter