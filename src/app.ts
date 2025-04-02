import express from "express"
import cookieParser from "cookie-parser"
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import routes from "./routes/routes.js"

const app = express();

// middlewares
app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/v1", routes)

// error handling
app.use(errorHandlerMiddleware)

export default app;