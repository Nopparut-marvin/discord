import { ICommand } from "wokcommands";
import player from "../config/player";

export default {
	category: "resume",
	description: "resume the song!", // Required for slash commands
	slash: "both", // Create both a slash and legacy command

	callback: ({ message, interaction }) => {
		const target = message ? message : interaction;

		const queue = player.getQueue(
			(target as any).guild || (target as any)?.member?.guild
		);

		if (!queue || !queue.playing) {
			return "❌ | No music is being played!";
		}
		const currentTrack = queue.current;
		const success = queue.setPaused(true);
		return success
			? `✅ | Resumed **${currentTrack}**!`
			: "❌ | Something went wrong!";
		// Alternatively we can just simply return our text
		// WOKCommands will handle the proper way to reply with it
	},
} as ICommand;
