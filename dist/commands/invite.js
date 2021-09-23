"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var builders_1 = require("@discordjs/builders");
var discord_js_1 = require("discord.js");
var bot_1 = __importDefault(require("../config/bot"));
exports.default = {
    category: "bot",
    description: "invite bot to your channel !",
    aliases: ["i"],
    slash: false,
    callback: function (_a) {
        var message = _a.message;
        var row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setStyle("LINK")
            .setLabel("Invite OSM Bot")
            .setURL(bot_1.default.bot.inviteLink));
        var ebmded = new discord_js_1.MessageEmbed()
            .setColor(0xca75eb)
            .setAuthor("[ BOT ] Invite Bot")
            .setDescription("You can simply fix this by " +
            (0, builders_1.hyperlink)("reinviting me to your server", bot_1.default.bot.inviteLink) +
            "or adding that permission in channel/server roles settings.");
        return void message.reply({ embeds: [ebmded], components: [row] });
    },
};
