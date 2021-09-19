import { QueryType } from "discord-player";
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
		if (!queue.playing) await queue.play();
		return `⏱ | ผลลัพธ์การค้นหา ${
			searchResult.playlist
				? searchResult.tracks
						.map(
							(e: any, idx: number) =>
								"\n`" +
								(idx + 1).toString() +
								"` " +
								`[${e.title}](${e.url})`
						)
						.join("")
				: `[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})`
		} `;

		// Alternatively we can just simply return our text
		// WOKCommands will handle the proper way to reply with it
	},
} as ICommand;
