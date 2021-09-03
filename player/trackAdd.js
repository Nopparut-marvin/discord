module.exports = (client, queue, track) => {
	queue.metadata.channel.send({
		embeds: [
			{
				color: "PURPLE",
				author: { name: "[Message] เพิ่มเพลงเข้าคิว" },
				description: ` ${track.title} [ ${track.url} ]`,
			},
		],
	});
};
