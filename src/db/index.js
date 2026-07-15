import mongoose from "mongoose";

// Serverless functions can reuse a warm container across invocations, so
// skip reconnecting if a connection is already open/opening — reconnecting
// every call would exhaust MongoDB's connection limit under load. Throws
// instead of process.exit(1) since exiting would kill the whole function
// process on a transient connection error, not just this request.
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    return connectionInstance.connection;
  } catch (error) {
    console.log("MONGODB connection FAILED", error);
    throw error;
  }
};

export default connectDB;
