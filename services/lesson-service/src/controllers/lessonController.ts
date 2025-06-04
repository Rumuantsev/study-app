import { Request, Response } from "express";
import { Lesson } from "../models/lessonModel";
import axios from "axios";

const createLesson = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const response = await axios.get(
      `${process.env.COURSE_SERVICE_URL}/${courseId}`
    );

    if (!response.data) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getAllLessons = async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getLessonById = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
      return;
    }
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
      return;
    }
    res.status(200).json(lesson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
      return;
    }
    res.status(200).json({ message: "Lesson deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const lessonController = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
};
