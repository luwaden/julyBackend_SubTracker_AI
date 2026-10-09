import DemoImage from "../model/demoImage.model.js"
import { errorMessage } from "../utils/errorMessage.js"

export const uploadImageBuffer = async(req, res, next)=>{
    try {
        if(!req.file){
            return next(errorMessage("No file uploaded, Attach a file under the field image name"))
        }

        const demoImage = await DemoImage.create({
            filename:req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype,
            user:req.user._id,
        })

        res.status(201).json({
             success: true,
      message: "Image buffer stored directly in MongoDB (teaching demo — Method 1).",
      data: {
        id: demoImage._id,
        filename: demoImage.filename,
        contentType: demoImage.contentType,
        sizeInBytes: Buffer.byteLength(demoImage.data),
         viewUrl: `/api/v1/demo/buffer-storage/${demoImage._id}`,
      },
        })
    } catch (error) {
        next(error)
    }
}