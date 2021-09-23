"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DISCORD_TOKEN)
    console.error("TOKEN NOT FOUND");
var config = {
    emojis: {
        off: ":x:",
        error: ":warning:",
        queue: ":bar_chart:",
        music: ":musical_note:",
        success: ":white_check_mark:",
    },
    discord: {
        token: process.env.DISCORD_TOKEN,
        prefix: process.env.PREFIX || "-",
        activity: process.env.PREFIX + "play to play a song!",
    },
    mongo: {
        monroUri: process.env.MONGO_URI,
    },
    bot: {
        timeout: 10 * 60 * 1000,
    },
};
exports.default = config;