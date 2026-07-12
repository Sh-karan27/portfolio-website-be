import mongoose from "mongoose";

const { Schema } = mongoose;

const heroSchema = new Schema(
  {
    sectionNumber: { type: String, default: "01" },
    sectionLabel: { type: String, default: "Frontend Developer" },
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { _id: false }
);

const statSchema = new Schema(
  {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: true }
);

const aboutSchema = new Schema(
  {
    sectionNumber: { type: String, default: "02" },
    sectionLabel: { type: String, default: "About" },
    heading: { type: String, default: "" },
    quote: { type: String, default: "" },
    bio: { type: String, default: "" },
    stats: { type: [statSchema], default: [] },
  },
  { _id: false }
);

const skillGroupSchema = new Schema(
  {
    category: { type: String, default: "" },
    items: { type: String, default: "" },
  },
  { _id: true }
);

const skillsSchema = new Schema(
  {
    sectionNumber: { type: String, default: "03" },
    sectionLabel: { type: String, default: "Skills" },
    heading: { type: String, default: "" },
    groups: { type: [skillGroupSchema], default: [] },
  },
  { _id: false }
);

const jobSchema = new Schema(
  {
    role: { type: String, default: "" },
    period: { type: String, default: "" },
    points: { type: [String], default: [] },
  },
  { _id: true }
);

const experienceSchema = new Schema(
  {
    sectionNumber: { type: String, default: "04" },
    sectionLabel: { type: String, default: "Experience" },
    heading: { type: String, default: "" },
    jobs: { type: [jobSchema], default: [] },
  },
  { _id: false }
);

const projectItemSchema = new Schema(
  {
    number: { type: String, default: "" },
    title: { type: String, default: "" },
    slug: { type: String, default: "" },
    description: { type: String, default: "" },
    stack: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    hasBeforeAfter: { type: Boolean, default: false },
    beforeImages: { type: [String], default: [] },
    afterImages: { type: [String], default: [] },
  },
  { _id: true }
);

const projectsSchema = new Schema(
  {
    sectionNumber: { type: String, default: "05" },
    sectionLabel: { type: String, default: "Projects" },
    heading: { type: String, default: "" },
    items: { type: [projectItemSchema], default: [] },
  },
  { _id: false }
);

const educationSchema = new Schema(
  {
    sectionNumber: { type: String, default: "06" },
    sectionLabel: { type: String, default: "Education" },
    degree: { type: String, default: "" },
    institution: { type: String, default: "" },
    coursework: { type: String, default: "" },
    period: { type: String, default: "" },
    score: { type: String, default: "" },
    scoreScale: { type: String, default: "" },
  },
  { _id: false }
);

const contactSchema = new Schema(
  {
    sectionNumber: { type: String, default: "07" },
    sectionLabel: { type: String, default: "Contact" },
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { _id: false }
);

const footerSchema = new Schema(
  {
    name: { type: String, default: "" },
    copyrightText: { type: String, default: "" },
  },
  { _id: false }
);

const socialLinkSchema = new Schema(
  {
    platform: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  { _id: true }
);

const portfolioContentSchema = new Schema(
  {
    hero: { type: heroSchema, default: () => ({}) },
    about: { type: aboutSchema, default: () => ({}) },
    skills: { type: skillsSchema, default: () => ({}) },
    experience: { type: experienceSchema, default: () => ({}) },
    projects: { type: projectsSchema, default: () => ({}) },
    education: { type: educationSchema, default: () => ({}) },
    contact: { type: contactSchema, default: () => ({}) },
    footer: { type: footerSchema, default: () => ({}) },
    socialLinks: { type: [socialLinkSchema], default: [] },
  },
  { timestamps: true }
);

export const PortfolioContent = mongoose.model(
  "PortfolioContent",
  portfolioContentSchema
);
