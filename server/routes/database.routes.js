import express from "express";

import {
  createDatabase,
  getAllDatabase,
  deleteDatabase,
  updateDatabase,
} from "../controllers/database.controller.js";

const router = express.Router();

router.route("/").get(getAllDatabase);
router.route("/").post(createDatabase);
router.route("/:id").put(updateDatabase);
router.route("/:id").delete(deleteDatabase);

export default router;
