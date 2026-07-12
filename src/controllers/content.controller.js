import { PortfolioContent } from "../models/portfolioContent.model.js";
import { DEFAULT_CONTENT } from "../constants/defaultContent.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// The site has exactly one portfolio — this collection only ever holds
// a single document. Fetch it, seeding it with the current site's
// default content the first time it's called.
const getSingleton = async () => {
  let content = await PortfolioContent.findOne();
  if (!content) {
    content = await PortfolioContent.create(DEFAULT_CONTENT);
  }
  return content;
};

const slugify = (text) =>
  (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "project";

// Assigns a slug to any project item missing one (or falls back to the
// title-derived slug when it collides), so /projects/:slug always has
// something stable to match on without requiring the admin to fill it in.
const withProjectSlugs = (items) => {
  const usedSlugs = new Set();
  return items.map((item) => {
    let slug = item.slug?.trim() || slugify(item.title);
    let unique = slug;
    let i = 2;
    while (usedSlugs.has(unique)) {
      unique = `${slug}-${i++}`;
    }
    usedSlugs.add(unique);
    return { ...item, slug: unique };
  });
};

// URL slug -> schema field name
const SECTION_FIELD = {
  hero: "hero",
  about: "about",
  skills: "skills",
  experience: "experience",
  projects: "projects",
  education: "education",
  contact: "contact",
  footer: "footer",
  "social-links": "socialLinks",
};

const getPortfolioContent = asyncHandler(async (req, res) => {
  const content = await getSingleton();
  return res
    .status(200)
    .json(new ApiResponse(200, content, "Portfolio content fetched"));
});

const updateSection = (section) =>
  asyncHandler(async (req, res) => {
    const field = SECTION_FIELD[section];
    if (!field) {
      throw new ApiError(400, `Unknown section "${section}"`);
    }

    await getSingleton(); // ensures a document exists before updating

    const body =
      section === "projects" && Array.isArray(req.body.items)
        ? { ...req.body, items: withProjectSlugs(req.body.items) }
        : req.body;

    const updated = await PortfolioContent.findOneAndUpdate(
      {},
      { $set: { [field]: body } },
      { new: true, upsert: true, runValidators: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, updated, `${section} updated`));
  });

const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const content = await getSingleton();
  const project = content.projects.items.find((item) => item.slug === slug);

  if (!project) {
    throw new ApiError(404, `Project "${slug}" not found`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched"));
});

export { getPortfolioContent, updateSection, getProjectBySlug };
