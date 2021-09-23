import { ICommand } from "wokcommands";
import player from "../config/player";

export default {
	category: "song",
	description: "play previous song!", // Required for slash commands
	aliases: ["b"],
	slash: "both", // Create both a slash and legacy command
	callback: ({ channel }) => {
		const queue = player.getQueue(channel.guild);

		if (!queue || !queue.playing) {
			return "❌ | No music is being played!";
		}
		queue.back();

		return "✅ | Playing the previous track!";
	},
} as ICommand;
