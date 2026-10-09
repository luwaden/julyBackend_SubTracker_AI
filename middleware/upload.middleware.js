import multer from "multer"
import {errorMessage} from "../utils/errorMessage.js"

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "application/pdf"
])

function fileFilter(req,file, cb){
    if (ALLOWED_MIME_TYPES.has(file.mimetype)){
        return cb (null, true);
    }

    return next(errorMessage( `Unsupported file type: ${file.mimetype}. Please upload a JPEG, PNG, WEBP, HEIC image, or a PDF.`))
}

const upload = multer ({
    storage: multer.memeoryStorage(),
    limits:{
        fileSize: MAX_FILE_SIZE_BYTES,
    },
    fileFilter
})

export default upload