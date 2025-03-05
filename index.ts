import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/route";
import rateLimit from "express-rate-limit";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
if (process.env.RATE_LIMIT === "true") {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
}

// Routes
app.use("/", router);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
