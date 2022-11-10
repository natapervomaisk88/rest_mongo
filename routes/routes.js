import { Router } from "express";
import mongoose from "mongoose";
import News from "../models/news.js";
import { Error, Ok } from "../features/features.js";

const router = Router();

router
  .route("/news")
  .post(async (req, res) => {
    const { title, text, email } = req.body;
    console.log(req.body);
    const news = new News({ title, text, email });
    try {
      await news.save();
      res.json(new Ok("News has been added"));
    } catch (err) {
      res.json(new Error(err.message));
    }
  })
  .get(async (req, res) => {
    try {
      const news = await News.find();
      console.log(news);
      res.json(new Ok(news));
    } catch (err) {
      res.json(new Error("Fail"));
    }
  });
router
  .route("/news/:id")
  .put(async (req, res) => {
    try {
      await News.findOneAndUpdate(req.params.id, req.body, {
        runValidators: true,
      });
      res.json(new Ok("News has been updated"));
    } catch (err) {
      res.json(new Error(err.message));
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await News.findByIdAndDelete(req.params.id);
      if (data != null) {
        res.json(new Ok("News has been deleted"));
      } else {
        res.json(new Error("News not found"));
      }
    } catch (err) {
      res.json(new Error(err.message));
    }
  });

export default router;
