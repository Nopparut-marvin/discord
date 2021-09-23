"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var builders_1 = require("@discordjs/builders");
var discord_js_1 = require("discord.js");
var player_1 = __importDefault(require("../config/player"));
exports.default = {
    category: "song",
    description: "queue check",
    aliases: ["q"],
    slash: "both",
    callback: function (_a) {
        var channel = _a.channel;
        var queue = player_1.default.getQueue(channel.guild);
        if (!queue || !queue.playing) {
            return "❌ | No music is being played!";
        }
        var text = queue.tracks
            .map(function (e, idx) {
            return (0, builders_1.inlineCode)((idx + 1).toString()) + (" [" + e.title + "](" + e.url + ")");
        })
            .join("\n");
        var ebmded = new discord_js_1.MessageEmbed()
            .setColor(0xca75eb)
            .setAuthor("[Message] รายการเพลง", "https://images.template.net/wp-content/uploads/2016/04/28062140/Youtube-Icon1.jpg?width=450")
            .setDescription(text);
        return ebmded;
        // Alternatively we can just simply return our text
        // WOKCommands will handle the proper way to reply with it
    },
};
