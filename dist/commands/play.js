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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var builders_1 = require("@discordjs/builders");
var discord_player_1 = require("discord-player");
var discord_js_1 = require("discord.js");
var bot_1 = __importDefault(require("../config/bot"));
var player_1 = __importDefault(require("../config/player"));
exports.default = {
    category: "song",
    description: "request the song!~",
    aliases: ["p"],
    minArgs: 1,
    expectedArgs: "<query>",
    slash: "both",
    callback: function (_a) {
        var message = _a.message, interaction = _a.interaction, args = _a.args, channel = _a.channel;
        return __awaiter(void 0, void 0, void 0, function () {
            var query, target, searchResult, queue, _b, ebmded, reply;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = args.join(" ");
                        target = (message ? message : interaction);
                        return [4 /*yield*/, player_1.default
                                .search(query, {
                                requestedBy: ((message === null || message === void 0 ? void 0 : message.author)
                                    ? message.author
                                    : interaction.user),
                                searchEngine: discord_player_1.QueryType.AUTO,
                            })
                                .catch(function () {
                                console.log("Doesn't found track!");
                            })];
                    case 1:
                        searchResult = (_c.sent());
                        if (!searchResult || !searchResult.tracks.length)
                            return [2 /*return*/, "❌ | Doesn't found track!"];
                        queue = player_1.default.createQueue(channel.guild, {
                            metadata: {
                                channel: channel,
                            },
                            leaveOnEmptyCooldown: bot_1.default.bot.timeout,
                            leaveOnEnd: false,
                        });
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 5, , 6]);
                        if (!!(queue === null || queue === void 0 ? void 0 : queue.connection)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (queue === null || queue === void 0 ? void 0 : queue.connect(target.member.voice.channel))];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        _b = _c.sent();
                        queue.destroy();
                        return [2 /*return*/, "❌ | Could not join your voice channel!"];
                    case 6:
                        searchResult.playlist
                            ? queue.addTracks(searchResult.tracks)
                            : queue.addTrack(searchResult.tracks[0]);
                        ebmded = new discord_js_1.MessageEmbed()
                            .setColor(0xca75eb)
                            .setAuthor("[ BOT ] เพิ่มเพลงเข้าคิว", searchResult === null || searchResult === void 0 ? void 0 : searchResult.tracks[0].requestedBy.displayAvatarURL());
                        if (!!queue.playing) return [3 /*break*/, 8];
                        return [4 /*yield*/, queue.play()];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        reply = searchResult.playlist
                            ? searchResult.tracks
                                .map(function (e, idx) {
                                return "\n" +
                                    (0, builders_1.inlineCode)((idx + 1).toString()) +
                                    " " +
                                    (0, builders_1.hyperlink)(e.title, e.url);
                            })
                                .join("")
                            : (0, builders_1.hyperlink)(searchResult.tracks[0].title, searchResult.tracks[0].url);
                        ebmded.setDescription(reply);
                        return [2 /*return*/, ebmded];
                }
            });
        });
    },
};
