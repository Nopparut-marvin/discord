"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = __importDefault(require("../config/player"));
exports.default = {
    category: "song",
    description: "skip the song!",
    aliases: ["s"],
    slash: "both",
    callback: function (_a) {
        var channel = _a.channel;
        var queue = player_1.default.getQueue(channel.guild);
        if (!queue || !queue.playing) {
            return "❌ | No music is being played!";
        }
        var currentTrack = queue.current;
        var success = queue.skip();
        return success
            ? "\u2705 | Skipped **" + currentTrack + "**!"
            : "\u274C | Something went wrong";
        // Alternatively we can just simply return our text
        // WOKCommands will handle the proper way to reply with it
    },
};
