import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getImageKit } from "../utils/imagekit.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 15 * 60 * 1000, // matches ACCESS_TOKEN_EXPIRY (15m)
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "username, email and password are required");
  }

  // Single-admin system — only the first registration is allowed.
  const adminExists = await Admin.exists({});
  if (adminExists) {
    throw new ApiError(409, "An admin account already exists");
  }

  const admin = await Admin.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdAdmin = await Admin.findById(admin._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, createdAdmin, "Admin registered"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "email and password are required");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = admin.generateAccessToken();
  const loggedInAdmin = await Admin.findById(admin._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { admin: loggedInAdmin, accessToken },
        "Login successful"
      )
    );
});

// Signs a short-lived token so the admin panel can upload directly to
// ImageKit from the browser — the file itself never passes through this
// server. Gated behind verifyJWT so only a logged-in admin can obtain one.
const getImageKitAuth = asyncHandler(async (req, res) => {
  const authenticationParameters = getImageKit().getAuthenticationParameters();
  return res
    .status(200)
    .json(new ApiResponse(200, authenticationParameters, "ImageKit auth issued"));
});

export { registerAdmin, loginAdmin, getImageKitAuth };
