import { config } from "dotenv";
import express from "express";
import { connectToDatabase } from "./config";
import * as processor from "./service/processor.service";
import { fetchMessage } from "./service/twilio.service";

config();

const app = express();
const port = process.env.PORT || 3000;
connectToDatabase();

// Start task processor
processor.start();
// sendMessage();
// sendWhatsAppMessage();
fetchMessage();
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Server is up!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
