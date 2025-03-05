import express from "express";
import mediaInfo from "../controllers/mediaInfo";
import getStream from "../controllers/getStream";
import getSeasonList from "../controllers/getSeasonList";

const router = express.Router();

// Add this new route
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "8Stream API is running",
    endpoints: {
      mediaInfo: "/mediaInfo",
      getStream: "/getStream",
      getSeasonList: "/getSeasonList"
    }
  });
});

router.get("/mediaInfo", mediaInfo);
router.post("/getStream", getStream);
router.get("/getSeasonList", getSeasonList);

export default router;
