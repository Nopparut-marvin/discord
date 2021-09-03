require("dotenv").config();
const fs = require("fs");
const { Intents } = require("discord.js");
const { Player } = require("discord-player");
const Discord = require("discord.js");
const config = require("./config/bot");

//-------------------------------------------------------------------------//
// TODO : init client
//-------------------------------------------------------------------------//
// Create a new Player (you don't need any API Key)
const client = new Discord.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});
client.commands = new Discord.Collection();
client.player = new Player(client, {
	deafenOnJoin: true,
	volume: 200,
	timeout: 3 * 60 * 1000,
});

//-------------------------------------------------------------------------//
// TODO : files Load
//-------------------------------------------------------------------------//
const players = fs
	.readdirSync("./player")
	.filter((file) => file.endsWith(".js"));

const commands = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of players) {
	console.log(`Loading discord-player event ${file}`);
	const event = require(`./player/${file}`);
	client.player.on(file.split(".")[0], event.bind(null, client));
}

for (const file of commands) {
	console.log(`Loading command ${file}`);
	const command = require(`./commands/${file}`);
	client.commands.set(command.name.toLowerCase(), command);
}

//-------------------------------------------------------------------------//
// TODO : slash commands
//-------------------------------------------------------------------------//
const initSlash = require("./slash/init.js");
(async () => {
	try {
		console.log("Started refreshing application [/] commands.");
		await initSlash(client);
		console.log("Successfully reloaded application [/] commands.");
	} catch (e) {}
})();

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;
	if (!interaction.member.voice.channelId)
		return await interaction.reply({
			content: "You are not in a voice channel!",
			ephemeral: true,
		});
	if (
		interaction.guild.me.voice.channelId &&
		interaction.member.voice.channelId !==
			interaction.guild.me.voice.channelId
	)
		return await interaction.reply({
			content: "You are not in my voice channel!",
			ephemeral: true,
		});
	await interaction.deferReply();
	client.commands.map((e) => {
		if (interaction.commandName === e.name) {
			e.execute(client, interaction);
		}
	});
});

//-------------------------------------------------------------------------//
// TODO : LOGIN DISCORD
//-------------------------------------------------------------------------//
client.once("ready", () => {
	console.log(
		`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`
	);
	client.user.setActivity(config.discord.activity);
});

client.login(config.discord.token);
