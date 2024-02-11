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
      return next(errorHandler(400, "wrong email or password"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "wrong email or password"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );
    const loggedInUser = await User.findOne({ email }).select("-password");
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(loggedInUser);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const userInfo = await User.findOne({ email }).select("-password");
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(userInfo);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpass = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedpass,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const newCreateduser = await User.findOne({ email }).select("-password");
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(newCreateduser);
    }
  } catch (error) {
    next(error);
  }
};
