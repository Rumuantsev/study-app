import { Request, Response } from "express";
import { Tag } from "../models/tagModel";

const createTag = async (req: Request, res: Response) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = Tag.find();
    res.status(200).json(tags);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getTagById = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json({ message: "Tag deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const tagController = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
