module.exports = {
	name: "play",
	description: "Plays a song!",
	options: [
		{
			name: "query",
			type: 3,
			description: "The song you want to play",
			required: true,
		},
	],

	async execute(client, interaction) {
		const query = interaction.options.get("query")?.value;
		const queue = client.player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});

		// verify vc connection
		try {
			if (!queue.connection)
				await queue.connect(interaction.member.voice.channel);
		} catch {
			queue.destroy();
			return await interaction.reply({
				content: "Could not join your voice channel!",
				ephemeral: true,
			});
		}

		const track = await client.player
			.search(query, {
				requestedBy: interaction.user,
			})
			.then((x) => x.tracks[0]);
		if (!track)
			return await interaction.followUp({
				content: `❌ | Track **${query}** not found!`,
			});

		await interaction.followUp({
			content: `⏱️ | ผลการค้นหา **${track.title}**!`,
		});
		return queue.play(track);
	},
};
