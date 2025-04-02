import mongoose from "mongoose";

export const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL as string)
    .then((data) =>
      console.log(
        `MonngoDB connected with Server ${data.connection.host} at Port ${data.connection.port} and DB name is ${data.connection.name} ✅`
      )
    )
    .catch((error) =>
      console.log(`MongoDB Connection Failed! Error Message - ${error.message} ❌`)
    );
};