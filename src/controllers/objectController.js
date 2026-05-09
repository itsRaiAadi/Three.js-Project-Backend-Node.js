import fs from "fs";
import { Object3D } from "../models/Object3D.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

export const uploadObject = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, "Please upload a .glb file");
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const object = await Object3D.create({
      user: req.user._id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileUrl,
      mimeType: req.file.mimetype || "model/gltf-binary",
      size: req.file.size,
    });

    return successResponse(res, 201, "3D object uploaded successfully", {
      object,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyObjects = async (req, res, next) => {
  try {
    const objects = await Object3D.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return successResponse(res, 200, "3D objects fetched successfully", {
      objects,
    });
  } catch (error) {
    next(error);
  }
};

export const getObjectById = async (req, res, next) => {
  try {
    const object = await Object3D.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!object) {
      return errorResponse(res, 404, "3D object not found");
    }

    return successResponse(res, 200, "3D object fetched successfully", {
      object,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCameraState = async (req, res, next) => {
  try {
    const { cameraState } = req.body;

    if (!cameraState?.position || !cameraState?.target) {
      return errorResponse(res, 400, "Valid camera state is required");
    }

    const object = await Object3D.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { cameraState },
      { new: true, runValidators: true },
    );

    if (!object) {
      return errorResponse(res, 404, "3D object not found");
    }

    return successResponse(res, 200, "Camera state saved successfully", {
      object,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteObject = async (req, res, next) => {
  try {
    const object = await Object3D.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!object) {
      return errorResponse(res, 404, "3D object not found");
    }

    if (fs.existsSync(`src/uploads/${object.fileName}`)) {
      fs.unlinkSync(`src/uploads/${object.fileName}`);
    }

    await object.deleteOne();

    return successResponse(res, 200, "3D object deleted successfully");
  } catch (error) {
    next(error);
  }
};
