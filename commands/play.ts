import { hyperlink, inlineCode } from "@discordjs/builders";
import { QueryType } from "discord-player";
import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import player from "../config/player";

export default {
	category: "song",
	description: "request the song!~", // Required for slash commands
	aliases: ["p"],
	minArgs: 1,
	expectedArgs: "<query>",
	slash: "both", // Create both a slash and legacy command

	callback: async ({ message, interaction, args }) => {
		const query = args.join(" ");

		const target = (message ? message : interaction) as any;

		const searchResult = (await player
			.search(query, {
				requestedBy: (message?.author
					? message.author
					: interaction.member) as any,
				searchEngine: QueryType.AUTO,
			})
			.catch(() => {
				console.log("Doesn't found track!");
			})) as any;

		console.log(searchResult);

		//-------------------------------------------------------------------------//
		// TODO : Create Queue
		//-------------------------------------------------------------------------//
		let queue = player.createQueue(target.guild || target.member.guild, {
			metadata: {
				channel: target.channel,
			},
		});

		//-------------------------------------------------------------------------//
		// TODO : verify vc connection
		//-------------------------------------------------------------------------//
		try {
			if (!queue?.connection)
				await queue?.connect((target as any).member.voice.channel);
		} catch {
			queue.destroy();
			return await target.reply({
				content: "Could not join your voice channel!",
				ephemeral: true,
			});
		}

		searchResult.playlist
			? queue.addTracks(searchResult.tracks)
			: queue.addTrack(searchResult.tracks[0]);
		const ebmded = new MessageEmbed()
			.setColor(0xca75eb)
			.setAuthor(
				"[ BOT ] เพิ่มเพลงเข้าคิว",
				queue.tracks[0].requestedBy.displayAvatarURL()
			);
		if (!queue.playing) await queue.play();
		const reply = searchResult.playlist
			? searchResult.tracks
					.map(
						(e: any, idx: number) =>
							"\n" +
							inlineCode((idx + 1).toString()) +
							" " +
							hyperlink(e.title, e.url)
					)
					.join("")
			: hyperlink(
					searchResult.tracks[0].title,
					searchResult.tracks[0].url
			  );

		ebmded.setDescription(reply);

		return ebmded;

		// Alternatively we can just simply return our text
		// WOKCommands will handle the proper way to reply with it
	},
} as ICommand;
