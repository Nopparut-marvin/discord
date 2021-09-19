import Discord, { Intents } from "discord.js";
import path from "path";
import WOKCommands from "wokcommands";
import config from "./config/bot";
const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

client.once("ready", () => {
	console.log(
		`\nLogged in as ${client?.user?.username}. Ready on ${client?.guilds?.cache?.size} servers, for a total of ${client?.users?.cache?.size} users`
	);
	client?.user?.setActivity("OSM Bot", { type: "LISTENING" });
	new WOKCommands(client, {
		// The name of the local folder for your command files
		commandsDir: path.join(__dirname, "commands"),
		// Allow importing of .ts files if you are using ts-node
		typeScript: true,
		mongoUri: config.mongo.monroUri,
	})
		.setDefaultPrefix(config.discord.prefix)
		.setColor(0xca75eb);
});

client.login(config.discord.token);

export { client };
