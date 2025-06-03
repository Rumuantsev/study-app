import { Request, Response } from "express";
import { Course } from "../models/courseModel";
import { processImage } from "../utils/imageProcessor";

const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price, category, level, published, author } =
      req.body;

    console.log(req.body);
    if (!req.file) {
      res.status(400).json({ message: "Image file is required." });
      return;
    }

    const processedPath = await processImage(req.file.path);

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

const getAllCourses = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
      search,
      category,
      level,
      author,
    } = req.query;

    const filter: any = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (author) filter.author = author;

    const sortOptions: any = {};
    sortOptions[sort as string] = order === "desc" ? -1 : 1;

    const skip = (Number(page) - 1) * Number(limit);

    const courses = await Course.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.status(200).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.status(200).json({ message: "Course deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const courseController = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourseById,
  deleteCourse,
};
