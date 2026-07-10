import { Router } from "express";
import { getPortfolioContent, updateSection } from "../controllers/content.controller.js";

const router = Router();

// One GET for the whole portfolio — the frontend calls this once and
// injects each section from the response.
router.get("/", getPortfolioContent);

// One PUT per section — the admin panel calls these individually.
// TODO: put an auth middleware in front of these once admin login exists.
router.put("/hero", updateSection("hero"));
router.put("/about", updateSection("about"));
router.put("/skills", updateSection("skills"));
router.put("/experience", updateSection("experience"));
router.put("/projects", updateSection("projects"));
router.put("/education", updateSection("education"));
router.put("/contact", updateSection("contact"));
router.put("/footer", updateSection("footer"));
router.put("/social-links", updateSection("social-links"));

export default router;
