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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerUrl = void 0;
function getPlayerUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseUrl = process.env.BASE_URL;
        const res = yield fetch(baseUrl);
        const resText = yield res.text();
        const playerUrl = resText.match(/const AwsIndStreamDomain\s*=\s*'([^']+)'/);
        if (!playerUrl) {
            throw new Error("Could not find player URL");
        }
        return playerUrl[1];
    });
}
exports.getPlayerUrl = getPlayerUrl;
