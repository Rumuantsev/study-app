import { Request, Response } from "express";
import UserModel from "../models/userModel";
import axios from "axios";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id, "-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user).status(200);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addFavoriteCourse = async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const response = await axios.get(
      `${process.env.COURSE_SERVICE_URL}/${courseId}`
    );

    if (!response.data) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    if (!user.favoriteCourses.includes(courseId)) {
      user.favoriteCourses.push(courseId);
      await user.save();
    }

    res.status(200).json({
      message: "Course added to favorites",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userController = {
  getUserById,
  deleteUser,
  addFavoriteCourse,
};
