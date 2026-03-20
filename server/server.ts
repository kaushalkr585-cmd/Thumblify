import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";

import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: string;
  }
}

const app = express();

// Trust proxy for Vercel (required for secure cookies)
app.set("trust proxy", 1);

// Initialize database connection
connectDB();

// Always allow localhost (dev) + production frontend.
// FRONTEND_URL env var is added on top if it differs from the defaults.
const allowedOrigins = [
  "http://localhost:5173",
  "https://thumblify-nu.vercel.app",
];

if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. same-origin, curl, mobile apps)
      if (!origin) return callback(null, true);
      // Remove any trailing slashes from origin for comparison
      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.some(o => o.replace(/\/$/, "") === normalizedOrigin)) {
         return callback(null, true);
      }
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: (process.env.SESSION_SECRET as string) || "fallback-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: true, // Always true for Vercel (HTTPS)
      httpOnly: true,
      sameSite: "none", // Required for cross-site cookies
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI as string,
      collectionName: "sessions",
    }),
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

// API routes
app.use("/api/auth", AuthRouter);
app.use("/api/thumbnail", ThumbnailRouter);
app.use("/api/user", UserRouter);

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
