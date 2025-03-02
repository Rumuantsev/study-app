import { Request, Response } from "express";
// import { authService } from "../services/authService";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

const signup = async (req: Request, res: Response) => {
  try {
    // const { firstName } = req.body;
    // const existingUser = await UserModel.findOne({ firstName });
    // if (existingUser) {
    //   throw new Error("User already exist");
    // }
    const user = new UserModel(req.body);
    await user.save();
    // const token = generateToken(user._id.toString());
    res.status(201).json({});
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

// const login = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;
//     const user = await authService.loginUser(username, password);
//     const token = authService.generateToken(user._id.toString());
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

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
  //   login,
  getUserById,
  deleteUser,
};
