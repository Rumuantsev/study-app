import { Request, Response } from "express";
import UserModel from "../models/userModel";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id, "-password");
    res.json(user).status(200);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" }).status(200);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userController = {
  getUserById,
  deleteUser,
};
