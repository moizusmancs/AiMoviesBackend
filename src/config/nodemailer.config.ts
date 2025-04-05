import nodemailer from "nodemailer"
import { config } from "dotenv"

config({
    path: "src/config/.env"
})

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    }
})

