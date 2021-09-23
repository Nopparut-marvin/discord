import { hyperlink } from "@discordjs/builders";
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import config from "../config/bot";

export default {
	category: "bot",
	description: "invite bot to your channel !", // Required for slash commands
	aliases: ["i"],

	slash: false, // Create both a slash and legacy command
	callback: ({ message }) => {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle("LINK")
				.setLabel("Invite OSM Bot")
				.setURL(config.bot.inviteLink)
		);
		const ebmded = new MessageEmbed()
			.setColor(0xca75eb)
			.setAuthor("[ BOT ] Invite Bot")
			.setDescription(
				"You can simply fix this by " +
					hyperlink(
						"reinviting me to your server",
						config.bot.inviteLink
					) +
					"or adding that permission in channel/server roles settings."
			);

		return void message.reply({ embeds: [ebmded], components: [row] });
	},
} as ICommand;
