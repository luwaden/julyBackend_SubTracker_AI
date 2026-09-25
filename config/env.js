import {config} from "dotenv"

config({path:  `.env.${process.env.NODE_ENV || "development" }.local`, quiet:true})

export const {PORT, NODE_ENV, CLIENT_URL, JWT_SECRET, JWT_EXPIRES_IN, DB_URI} = process.env