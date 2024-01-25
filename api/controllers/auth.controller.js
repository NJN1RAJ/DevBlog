import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "wrong email"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "wrong password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const loggedInUser = await User.findOne({ email }).select("-password");
    res
      .status(200)
      .cookie("access token", token, {
        httpOnly: true,
      })
      .json({ message: "LoggedIn successfully", user: loggedInUser });
  } catch (error) {
    next(error);
  }
};
