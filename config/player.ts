import { hyperlink } from "@discordjs/builders";
import { Player, Queue } from "discord-player";
import { client } from "../index";
import config from "./bot";
const tempTimeOut: { [key: string]: NodeJS.Timeout } = {};
const discord = new Player(client, {
	autoRegisterExtractor: true,
	ytdlOptions: {
		highWaterMark: 1 << 25,
	},
	connectionTimeout: config.bot.timeout,
});
const clearExitRoom = (queue: Queue<unknown>) => {
	return tempTimeOut[queue.guild.id]
		? clearTimeout(tempTimeOut[queue.guild.id])
		: null;
};
discord.on("queueEnd", (queue) => {
	const exitRoom = setTimeout(() => {
		if (!queue.nowPlaying()) queue.destroy(true);
	}, config.bot.timeout);
	tempTimeOut[queue.guild.id] = exitRoom;
});
discord.on("trackStart", (queue: any, track: any) => {
	clearExitRoom(queue);
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
