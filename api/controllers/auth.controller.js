import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedpass = bcryptjs.hashSync(password, 10); //we need no use of async here as we are using hashsync instead of hash

  const newUser = new User({
    username,
    email,
    password: hashedpass,
  });

  try {
    await newUser.save();
    res.json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};
