import { ICommand } from "wokcommands";
import player from "../config/player";

export default {
	category: "song",
	description: "clear queue!", // Required for slash commands
	aliases: ["c"],
	slash: "both", // Create both a slash and legacy command
	callback: ({ channel }) => {
		const queue = player.getQueue(channel.guild);

		if (!queue || !queue.playing) {
			return "❌ | No music is being played!";
		}
		queue.clear();

		return "✅ | Queue cleared!";
	},
} as ICommand;
