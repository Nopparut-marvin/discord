import { hyperlink } from "@discordjs/builders";
import { Player } from "discord-player";
import { client } from "../index";
import config from "./bot";
const discord = new Player(client, {
	autoRegisterExtractor: true,
	ytdlOptions: {
		highWaterMark: 1 << 25,
	},
	connectionTimeout: config.bot.timeout,
});
discord.on("queueEnd", (queue) => {
	setTimeout(() => {
		if (!queue.nowPlaying()) queue.destroy(true);
	}, config.bot.timeout);
});
discord.on("trackStart", (queue: any, track: any) => {
	return queue.metadata.channel.send({
		embeds: [
			{
				color: "PURPLE",
				author: {
					name: "[ BOT ] กำลังเล่นเพลง",
					icon_url:
						"https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-2/254000/91-512.png",
				},
				description: hyperlink(track.title, track.url),
				thumbnail: {
					url: track.thumbnail,
				},
			},
		],
	});
});
export default discord;
