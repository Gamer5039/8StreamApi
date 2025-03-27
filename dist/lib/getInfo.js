"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cheerio = __importStar(require("cheerio"));
const getPlayerUrl_1 = require("./getPlayerUrl");
function getInfo(id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playerUrl = yield (0, getPlayerUrl_1.getPlayerUrl)();
            console.log(`Player URL: ${playerUrl}`);
            const response = yield axios_1.default.get(`${playerUrl}/play/${id}`, {
                headers: {
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    DNT: "1",
                    "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-User": "?1",
                    "Upgrade-Insecure-Requests": "1",
                    Origin: "https://allmovieland.fun/",
                    Referer: "https://google.com",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
                },
            });
            const $ = cheerio.load(response.data);
            // get last script tag
            const script = $("script").last().html();
            if (!script) {
                return {
                    success: false,
                    message: "Something went wrong",
                };
            }
            // get json data from script tag
            const content = ((_a = script.match(/(\{[^;]+});/)) === null || _a === void 0 ? void 0 : _a[1]) || ((_b = script.match(/\((\{.*\})\)/)) === null || _b === void 0 ? void 0 : _b[1]);
            if (!content) {
                return {
                    success: false,
                    message: "Media not found",
                };
            }
            const data = JSON.parse(content);
            const file = data["file"];
            const key = data["key"];
            const link = (file === null || file === void 0 ? void 0 : file.startsWith("http")) ? file : `${playerUrl}${file}`;
            const playlistRes = yield axios_1.default.get(link, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                    Accept: "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    Origin: process.env.BASE_URL,
                    "X-Csrf-Token": key,
                    Referer: `${process.env.BASE_URL}/play/${id}`,
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                },
            });
            const playlist = playlistRes.data;
            return {
                success: true,
                data: {
                    playlist,
                    key,
                },
            };
        }
        catch (error) {
            console.log((error === null || error === void 0 ? void 0 : error.message) || error);
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    });
}
exports.default = getInfo;
