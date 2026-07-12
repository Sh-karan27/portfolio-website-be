import { Router } from "express";
import { registerAdmin, loginAdmin, getImageKitAuth } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/imagekit-auth", verifyJWT, getImageKitAuth);

export default router;
