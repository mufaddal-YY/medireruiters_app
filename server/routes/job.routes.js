import express from "express";


import {
  createJob,
  getAllJobs,
  getJobDetail,
  deleteJob,
  updateJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/").get(getAllJobs);
router.route("/").post(createJob);
router.route("/:id").get(getJobDetail);
router.route("/:id").put(updateJob);
router.route("/:id").delete(deleteJob);

export default router;
