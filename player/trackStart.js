module.exports = (client, queue, track) => {
	queue.metadata.channel.send({
		embeds: [
			{
				color: "PURPLE",
				author: { name: "[Message] กำลังเล่นเพลง" },
				description: ` ${track.title} [ ${track.url} ]`,
			},
		],
	});
};
