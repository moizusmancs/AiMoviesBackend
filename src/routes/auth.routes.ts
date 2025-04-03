import express from "express"
import { handleSignUpUser } from "../controllers/auth.controllers.js";
import { validateSignupDataMiddleware } from "../middlewares/signupValidation.middleware.js";

const router = express.Router();

router.post("/signup",validateSignupDataMiddleware, handleSignUpUser)

export {router as authRouter}