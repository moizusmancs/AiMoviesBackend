import app from "./app.js";
import { config } from "dotenv";
import { connectToMongoDB } from "./config/connectMongoDb.config.js";


config({
    path: "./src/config/.env"
})

connectToMongoDB();

app.listen(process.env.PORT, () => {
    console.log("Server started on port:", process.env.PORT, "✅");
})