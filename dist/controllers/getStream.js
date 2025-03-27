"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getPlayerUrl_1 = require("../lib/getPlayerUrl");
function getStream(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { file, key } = req.body;
        if (!file || !key) {
            return res.json({
                success: false,
                message: "Please provide a valid id",
            });
        }
        const f = file;
        const path = f.slice(1) + ".txt";
        try {
            const playerUrl = yield (0, getPlayerUrl_1.getPlayerUrl)();
            const link = yield axios_1.default.get(`${playerUrl}/playlist/${path}`, {
                headers: {
                    Accept: "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Cache-Control": "no-cache",
                    "Content-Length": "0",
                    "Content-Type": "application/x-www-form-urlencoded",
                    Dnt: "1",
                    Origin: "https://friness-cherlormur-i-275.site",
                    Pragma: "no-cache",
                    "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
                    "Sec-Ch-Ua-Mobile": "?0",
                    "Sec-Ch-Ua-Platform": '"Windows"',
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
                    "X-Csrf-Token": key,
                    Referer: `https://google.com/`,
                },
            });
            res.json({
                success: true,
                data: {
                    link: link.data,
                },
            });
        }
        catch (err) {
            console.log("error: ", err);
            res.json({
                success: false,
                message: "No media found",
            });
        }
    });
}
exports.default = getStream;
