import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import player from "../config/player";

export default {
	category: "song",
	description: "queue check", // Required for slash commands
	aliases: ["q"],
	slash: "both", // Create both a slash and legacy command

	callback: ({ message, interaction }) => {
		const target = message ? message : interaction;

		const queue = player.getQueue(
			(target as any).guild || (target as any)?.member?.guild
		);

		if (!queue || !queue.playing) {
			return "❌ | No music is being played!";
		}
		const text = queue.tracks
			.map(
				(e, idx) =>
					"`" + (idx + 1).toString() + "`" + ` [${e.title}](${e.url})`
			)
			.join("\n");

		const ebmded = new MessageEmbed()
			.setColor(0xca75eb)
			.setAuthor(
				"[Message] รายการเพลง",
				"https://images.template.net/wp-content/uploads/2016/04/28062140/Youtube-Icon1.jpg?width=450"
			)
			.setDescription(text);
		return ebmded;
		// Alternatively we can just simply return our text
		// WOKCommands will handle the proper way to reply with it
	},
} as ICommand;
