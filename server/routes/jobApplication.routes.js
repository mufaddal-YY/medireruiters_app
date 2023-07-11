import express from "express";


import {
 
  getAllJobApplication,
  createJobApplication,
 
} from "../controllers/jobApplication.controller.js";

const router = express.Router();

router.route("/").get(getAllJobApplication);
router.route("/").get(createJobApplication);

export default router;
