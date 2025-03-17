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
  } catch (err) {
    const error = err as Error;
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
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id, "-password");
    res.json(user).status(200);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" }).status(200);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const userController = {
  signup,
  signin,
  getUserById,
  deleteUser,
};
