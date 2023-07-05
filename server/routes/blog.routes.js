import express from "express";
import {
  createBlogs,
  getAllBlogs,
  getBlogInfoById,
  deleteBlogs,
  updateBlogs,
} from "../controllers/blog.controller.js";

const router = express.Router();


router.route("/").get(getAllBlogs);
router.route("/").post(createBlogs);
router.route("/:id").get(getBlogInfoById);
router.route("/:id").put(updateBlogs);
router.route("/:id").delete(deleteBlogs);

export default router;
