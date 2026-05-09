import mongoose from "mongoose";

const cameraStateSchema = new mongoose.Schema(
  {
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 2 },
      z: { type: Number, default: 5 },
    },
    target: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 },
    },
    zoom: { type: Number, default: 1 },
  },
  { _id: false },
);

const object3DSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    cameraState: {
      type: cameraStateSchema,
      default: () => ({}),
    },
  },
  { timestamps: true },
);

export const Object3D = mongoose.model("Object3D", object3DSchema);
