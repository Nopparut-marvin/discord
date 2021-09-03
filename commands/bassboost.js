module.exports = {
	name: "bassboost",
	description: "bassboost toggle",

	async execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guild);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});

		await queue.setFilters({
			bassboost: !queue.getFiltersEnabled().includes("bassboost"),
			normalizer2: !queue.getFiltersEnabled().includes("bassboost"), // because we need to toggle it with bass
		});

		setTimeout(() => {
			return void interaction.followUp({
				content: `🎵 | Bassboost ${
					queue.getFiltersEnabled().includes("bassboost")
						? "Enabled"
						: "Disabled"
				}!`,
			});
		}, queue.options.bufferingTimeout);
	},
};
