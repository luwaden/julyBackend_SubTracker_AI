import {config} from "dotenv"

config({path:  `.env.${process.env.NODE_ENV || "development" }.local`, quiet:true})

export const {PORT, NODE_ENV, CLIENT_URL, JWT_SECRET, JWT_EXPIRES_IN, DB_URI, GEMINI_API_KEY, GEMINI_MODEL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env