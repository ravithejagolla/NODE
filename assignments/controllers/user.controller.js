import argon2 from "argon2";
import { User } from "../models/user.schema.js";
import jwt from "jsonwebtoken";

const jwt_password = process.env.JWT_PASSWORD;

export const signUp = async (req, res) => {
  const { username, password,email } = req.body;

  const hash = await argon2.hash(password);

  const user = new User({
    username: username,
    password: hash,
    email,
  });

  await user.save();
  res.json({
    msg: "Sign up success",
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const dbUser = await User.findOne({
    username,
  });

  const isCorrectUser = await argon2.compare(dbUser.password, password);

  if (isCorrectUser) {
    const token = jwt.sign(
      {
        id: dbUser._id,
        name: dbUser.name,
      },
      jwt_password,
      {
        expiresIn: "2 days",
      }
    );

    return res.json({
      token: token,
    });
  } else {
    res.status(401).json({
      msg: "Invalid credentials",
    });
  }
};