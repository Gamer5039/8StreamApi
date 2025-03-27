"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = __importDefault(require("./routes/route"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
dotenv_1.default.config();
app.use(express_1.default.json());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 10, // 100 requests per window
    message: "Too many requests, please try again later.",
});
if (process.env.RATE_LIMIT === "true") {
    app.use(limiter);
}
app.use("/api/v1", route_1.default);
app.get("/", (req, res) => {
    res.send("its ok");
});
const Port = process.env.PORT || 5001;
app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
});
