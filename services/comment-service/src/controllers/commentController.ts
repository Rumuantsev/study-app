import { Request, Response } from "express";
import { Comment } from "../models/commentModel";
import axios from "axios";

const createComment = async (req: Request, res: Response) => {
  try {
    const { userId, lessonId } = req.body;

    const userResponse = await axios.get(
      `${process.env.USER_SERVICE_URL}/${userId}`
    );

    if (!userResponse.data) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const lessonResponse = await axios.get(
      `${process.env.LESSON_SERVICE_URL}/${lessonId}`
    );

    if (!lessonResponse.data) {
      res.status(404).json({ message: "Lesson not found" });
      return;
    }

    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json(comment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json(comment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json({ message: "Comment deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const commentController = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
