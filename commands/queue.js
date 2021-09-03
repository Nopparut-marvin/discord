module.exports = {
	name: "queue",
	description: "show queues",

	async execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guild);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});
		console.log(queue);
		const text = queue.tracks
			.map((e, idx) => `**${idx + 1}. ${e.title}**`)
			.join("\n");

		return void interaction.followUp({
			embeds: [
				{
					color: "ORANGE",
					author: { name: "[Message] รายการเพลง" },
					description: text,
				},
			],
		});
	},
};
