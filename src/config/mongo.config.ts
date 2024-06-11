import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = String(process.env.MONGODB_URI);
const dbName = String(process.env.MONGODB_NAME);

export function connectToDatabase(): void {
  mongoose
    .connect(uri, {
      authMechanism: "DEFAULT",
      autoCreate: true,
      dbName,
    })
    .then((res) => {
      console.log("Sucessfully connected to database : ", dbName);
    })
    .catch((err) => {
      console.log("Error occured on connecting to database: ", err);
    });
}
