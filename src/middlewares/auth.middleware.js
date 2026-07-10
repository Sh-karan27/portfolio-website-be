import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

// Verifies the access token only — there is no refresh token. Once the
// 15-minute access token expires this throws 401, and the admin panel
// is expected to drop back to the logged-out state.
export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const admin = await Admin.findById(decodedToken?._id).select("-password");

    if (!admin) {
      throw new ApiError(401, "Invalid access token");
    }

    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired access token");
  }
});
