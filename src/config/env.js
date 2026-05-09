import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  clientUrl:
    process.env.CLIENT_URL ||
    "https://three-js-project-frontend-react-js.vercel.app",
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  uploadDir: process.env.UPLOAD_DIR || "src/uploads",
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 50),
};

export const validateEnv = () => {
  const required = ["mongoUri", "jwtSecret"];
  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};
