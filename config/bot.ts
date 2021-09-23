import dotenv from "dotenv";
dotenv.config();
if (!process.env.DISCORD_TOKEN) console.error("TOKEN NOT FOUND");

const config = {
	emojis: {
		off: ":x:",
		error: ":warning:",
		queue: ":bar_chart:",
		music: ":musical_note:",
		success: ":white_check_mark:",
	},
	discord: {
		token: process.env.DISCORD_TOKEN as string,
		prefix: process.env.PREFIX || "-",
		activity: process.env.PREFIX + "play to play a song!",
	},
	mongo: {
		monroUri: process.env.MONGO_URI as string,
	},
	bot: {
		timeout: 10 * 60 * 1000,
	},
};

export default config;
