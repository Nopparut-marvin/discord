"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = __importDefault(require("../config/player"));
exports.default = {
    category: "song",
    description: "clear queue!",
    aliases: ["c"],
    slash: "both",
    callback: function (_a) {
        var channel = _a.channel;
        var queue = player_1.default.getQueue(channel.guild);
        if (!queue || !queue.playing) {
            return "❌ | No music is being played!";
        }
        queue.clear();
        return "✅ | Queue cleared!";
    },
};
