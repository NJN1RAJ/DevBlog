import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

try {
  mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log("Successfully connected to DB");
  });
} catch (error) {
  console.log(error);
}

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
