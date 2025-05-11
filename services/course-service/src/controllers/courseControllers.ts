import { Request, Response } from "express";
import { Course } from "../models/courseModel";
import { processImage } from "../utils/imageProcessor";

const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price, category, level, published, author } =
      req.body;

    if (!req.file) {
      res.status(400).json({ message: "Image file is required." });
      return;
    }

    const processedPath = await processImage(req.file.path);
    // const processedPath = req.file.path;

    const course = await Course.create({
      title,
      description,
      price,
      image: processedPath,
      category,
      level,
      published,
      author,
    });

    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const courseController = {
  createCourse,
};
