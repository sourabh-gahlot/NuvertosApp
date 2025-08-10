import express from "express";
import {
  createCompound,
  getAllCompounds,
  getCompound,
  updateCompound,
} from "./controller/compoundController";

const router = express.Router();

router.get("/", getAllCompounds);
router.post("/", createCompound);
router.get("/:id", getCompound);
router.put("/:id",updateCompound)

export default router;
