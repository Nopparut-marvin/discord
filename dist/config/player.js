"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var builders_1 = require("@discordjs/builders");
var discord_player_1 = require("discord-player");
var index_1 = require("../index");
var bot_1 = __importDefault(require("./bot"));
var tempTimeOut = {};
var discord = new discord_player_1.Player(index_1.client, {
    autoRegisterExtractor: true,
    ytdlOptions: {
        highWaterMark: 1 << 25,
    },
    connectionTimeout: bot_1.default.bot.timeout,
});
var clearExitRoom = function (queue) {
    return tempTimeOut[queue.guild.id]
        ? clearTimeout(tempTimeOut[queue.guild.id])
        : null;
};
discord.on("queueEnd", function (queue) {
    var exitRoom = setTimeout(function () {
        if (!queue.nowPlaying())
            queue.destroy(true);
    }, bot_1.default.bot.timeout);
    tempTimeOut[queue.guild.id] = exitRoom;
});
discord.on("trackStart", function (queue, track) {
    clearExitRoom(queue);
    return queue.metadata.channel.send({
        embeds: [
            {
                color: "PURPLE",
                author: {
                    name: "[ BOT ] กำลังเล่นเพลง",
                    icon_url: "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/91-512.png",
                },
                description: (0, builders_1.hyperlink)(track.title, track.url),
                thumbnail: {
                    url: track.thumbnail,
                },
            },
        ],
    });
});
exports.default = discord;
