const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("../config/bot");
const rest = new REST({ version: "9" }).setToken(config.discord.token);
module.exports = async (client) => {
	const commands = client.commands.map((e) => e);
	try {
		await rest.put(
			Routes.applicationGuildCommands(
				config.discord.client_id,
				config.discord.guild_id
			),
			{
				body: commands,
			}
		);
	} catch (error) {
		console.error(error);
	}
};
