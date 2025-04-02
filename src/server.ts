import app from "./app.js";
import { config } from "dotenv";


config({
    path: "./src/config/.env"
})


app.listen(process.env.PORT, () => {
    console.log("Server started on port:", process.env.PORT, "✅");
})