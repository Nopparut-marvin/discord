"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var discord_js_1 = __importStar(require("discord.js"));
var path_1 = __importDefault(require("path"));
var wokcommands_1 = __importDefault(require("wokcommands"));
var bot_1 = __importDefault(require("./config/bot"));
var client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});
exports.client = client;
client.once("ready", function () {
    var _a, _b, _c, _d, _e, _f;
    console.log("\nLogged in as " + ((_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.username) + ". Ready on " + ((_c = (_b = client === null || client === void 0 ? void 0 : client.guilds) === null || _b === void 0 ? void 0 : _b.cache) === null || _c === void 0 ? void 0 : _c.size) + " servers, for a total of " + ((_e = (_d = client === null || client === void 0 ? void 0 : client.users) === null || _d === void 0 ? void 0 : _d.cache) === null || _e === void 0 ? void 0 : _e.size) + " users");
    (_f = client === null || client === void 0 ? void 0 : client.user) === null || _f === void 0 ? void 0 : _f.setActivity(bot_1.default.bot.status, { type: bot_1.default.bot.type });
    new wokcommands_1.default(client, {
        // The name of the local folder for your command files
        commandsDir: path_1.default.join(__dirname, "commands"),
        // Allow importing of .ts files if you are using ts-node
        // typeScript: true,
        mongoUri: bot_1.default.mongo.monroUri,
    })
        .setDefaultPrefix(bot_1.default.discord.prefix)
        .setColor(0xca75eb);
});
client.login(bot_1.default.discord.token);
