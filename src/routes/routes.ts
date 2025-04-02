import express from "express"
import { customNextError } from "../utils/customNextError.utils.js";

const router = express.Router();

router.use("/auth", (req,res) => {
    
    throw new customNextError("i am custom thrown", 501)
})

export default router;