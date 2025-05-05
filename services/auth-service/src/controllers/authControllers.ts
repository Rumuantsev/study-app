import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";

const signup = async (req: Request, res: Response) => {
  try {
    const { login } = req.body;
    const existingUser = await UserModel.findOne({ login });
    if (existingUser) {
      throw new Error("User with this login already exists!");
    }
    const user = new UserModel(req.body);
    await user.save();
    const token = generateToken(user._id.toString());
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const user = await UserModel.findOne({ login });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user!.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user!._id.toString());
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const authController = {
  signup,
  signin,
};
