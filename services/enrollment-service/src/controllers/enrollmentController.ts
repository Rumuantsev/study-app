import { Request, Response } from "express";
import { Enrollment } from "../models/enrollmentModel";
import axios from "axios";

export const enrollToCourse = async (req: Request, res: Response) => {
  try {
    const { courseId, userId } = req.body;

    if (!userId || !courseId) {
      res.status(400).json({ message: "Missing userId or courseId" });
      return;
    }

    const isEnrolled = await Enrollment.findOne({ userId, courseId });
    if (isEnrolled) {
      res.status(400).json({ message: "Already enrolled" });
      return;
    }

    const thisCourse = await axios.get(
      `${process.env.COURSE_SERVICE_URL}/${courseId}`
    );
    if (!thisCourse.data) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const thisUser = await axios.get(
      `${process.env.USER_SERVICE_URL}/${userId}`
    );
    if (!thisUser.data) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const enrollment = new Enrollment({
      userId,
      courseId,
      completedLessons: [],
    });

    await enrollment.save();
    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const completeLesson = async (req: Request, res: Response) => {
  try {
    const { userId, courseId, lessonId } = req.body;

    if (!userId || !courseId || !lessonId) {
      res.status(400).json({ message: "Missing parameters" });
      return;
    }

    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      res.status(404).json({ message: "Enrollment not found" });
      return;
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    const allLessonsThisCourse = await axios.get(
      `${process.env.LESSON_SERVICE_URL}/course/${courseId}`
    );
    const totalLessons = allLessonsThisCourse.data.length;

    enrollment.progress = Math.round(
      (enrollment.completedLessons.length / totalLessons) * 100
    );

    await enrollment.save();

    res.status(200).json({
      message: "Lesson completed",
      progress: enrollment.progress,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const uncompleteLesson = async (req: Request, res: Response) => {
  try {
    const { userId, courseId, lessonId } = req.body;

    if (!userId || !courseId || !lessonId) {
      res.status(400).json({ message: "Missing parameters" });
      return;
    }

    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      res.status(404).json({ message: "Enrollment not found" });
      return;
    }

    enrollment.completedLessons = enrollment.completedLessons.filter(
      (id) => id.toString() !== lessonId
    );

    const allLessonsThisCourse = await axios.get(
      `${process.env.LESSON_SERVICE_URL}/course/${courseId}`
    );
    const totalLessons = allLessonsThisCourse.data.length;

    enrollment.progress = Math.round(
      (enrollment.completedLessons.length / totalLessons) * 100
    );

    await enrollment.save();

    res.status(200).json({
      message: "Lesson uncompleted",
      progress: enrollment.progress,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrollmentCount = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      res.status(400).json({ message: "Missing courseId" });
      return;
    }

    const thisCourse = await axios.get(
      `${process.env.COURSE_SERVICE_URL}/${courseId}`
    );
    if (!thisCourse.data) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const count = await Enrollment.countDocuments({ courseId });

    res.status(200).json({ courseId, enrolledStudents: count });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollmentController = {
  enrollToCourse,
  completeLesson,
  uncompleteLesson,
  getEnrollmentCount,
};
