import express from "express";
import {
  createCandidates,
  getAllCandidates,
  getCandidateInfoById,
  deleteCandidates,
  updateCandidates,
} from "../controllers/candidate.controller.js";

const router = express.Router();


router.route("/").get(getAllCandidates);
router.route("/").post(createCandidates);
router.route("/:id").get(getCandidateInfoById);
router.route("/:id").put(updateCandidates);
router.route("/:id").delete(deleteCandidates);

export default router;
