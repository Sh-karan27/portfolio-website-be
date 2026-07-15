import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

// Vercel runs this module once per cold start and reuses the warm container
// for later invocations, so the DB connection made on the first request is
// reused rather than reopened on every call.
export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Database connection failed",
      success: false,
      errors: [],
    });
    return;
  }

  return app(req, res);
}
