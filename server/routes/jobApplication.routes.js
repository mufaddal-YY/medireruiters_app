import express from "express";


import {
 
  getAllJobApplication,
 
} from "../controllers/jobApplication.controller.js";

const router = express.Router();

router.route("/").get(getAllJobApplication);

export default router;
