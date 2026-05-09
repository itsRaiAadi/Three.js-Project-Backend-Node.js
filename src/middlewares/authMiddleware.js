import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { errorResponse } from "../utils/apiResponse.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, 401, "Not authorized, token missing");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return errorResponse(res, 401, "Not authorized, user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 401, "Not authorized, token failed");
  }
};
