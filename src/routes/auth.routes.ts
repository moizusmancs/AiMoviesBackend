import express from "express"
import { handleSignUpUser, handleTest } from "../controllers/auth.controllers.js";
import { validateSignupDataMiddleware } from "../middlewares/signupValidation.middleware.js";

const router = express.Router();

router.post("/signup",validateSignupDataMiddleware, handleSignUpUser)
router.get("/test", handleTest)

export {router as authRouter}