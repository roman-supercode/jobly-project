import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";

// POST Anfragen - weiterleitung an "createJob"
// GET Anfragen - weiterleitung an "getAllJobs"
router.route("/").post(createJob).get(getAllJobs);

// GET Anfragen - weiterleitung an "showStats"
router.route("/stats").get(showStats);

// DELETE Anfragen - weiterleitung an "deleteJOB"
// PATCH Anfrage - weiterleitung an "updateJob"
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
