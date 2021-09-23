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
        undeaf: ":undeaf:",
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
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=805856620026265610&permissions=0&scope=bot%20applications.commands",
        type: "LISTENING",
        status: "OSM Bot",
    },
};
exports.default = config;
