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

    const updated = await PortfolioContent.findOneAndUpdate(
      {},
      { $set: { [field]: req.body } },
      { new: true, upsert: true, runValidators: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, updated, `${section} updated`));
  });

export { getPortfolioContent, updateSection };
