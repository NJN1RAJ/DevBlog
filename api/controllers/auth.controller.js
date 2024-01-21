import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
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
    res.status(500).json({ message: error.message });
  }
};
