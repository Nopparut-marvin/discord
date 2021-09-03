module.exports = {
	emojis: {
		off: ":x:",
		error: ":warning:",
		queue: ":bar_chart:",
		music: ":musical_note:",
		success: ":white_check_mark:",
	},

	discord: {
		token: process.env.DISCORD_TOKEN || "",
		guild_id: process.env.DISCORD_GUILD_ID || "",
		client_id: process.env.DISCORD_CLIENT_ID || "",
		prefix: process.env.PREFIX || "!",
		activity: "/play to play a song!",
	},
	website: {
		port: process.env.PORT || 3000,
	},
};
