import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getData,
  addData,
  updateData,
  deleteData,
} from "../controllers/crudController.js";

const router = express.Router();

router.get("/", authenticate, getData);
router.post("/", authenticate, addData);
router.put("/:id", authenticate, updateData);
router.delete("/:id", authenticate, deleteData);

export default router
