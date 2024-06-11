import { config } from "dotenv";
import express from "express";

config();

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Server is up!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
