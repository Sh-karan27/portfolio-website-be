import { Router } from "express";
import { getPortfolioContent, updateSection } from "../controllers/content.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// One GET for the whole portfolio — the frontend calls this once and
// injects each section from the response.
router.get("/", getPortfolioContent);

// One PUT per section — the admin panel calls these individually.
router.put("/hero", verifyJWT, updateSection("hero"));
router.put("/about", verifyJWT, updateSection("about"));
router.put("/skills", verifyJWT, updateSection("skills"));
router.put("/experience", verifyJWT, updateSection("experience"));
router.put("/projects", verifyJWT, updateSection("projects"));
router.put("/education", verifyJWT, updateSection("education"));
router.put("/contact", verifyJWT, updateSection("contact"));
router.put("/footer", verifyJWT, updateSection("footer"));
router.put("/social-links", verifyJWT, updateSection("social-links"));

export default router;
