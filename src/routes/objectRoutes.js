import express from "express";
import {
  deleteObject,
  getMyObjects,
  getObjectById,
  updateCameraState,
  uploadObject,
} from "../controllers/objectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadGLB } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getMyObjects)
  .post(uploadGLB.single("model"), uploadObject);
router.route("/:id").get(getObjectById).delete(deleteObject);
router.patch("/:id/camera-state", updateCameraState);

export default router;
