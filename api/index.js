import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log("Successfully connected to DB");
  });
} catch (error) {
  console.log(error);
}

const app = express();

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
