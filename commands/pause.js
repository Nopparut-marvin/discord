module.exports = {
	name: "pause",
	description: "pause current song!",

	async execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guild);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});
		const currentTrack = queue.current;
		const success = queue.setPaused(true);
		return void interaction.followUp({
			content: success
				? `✅ | Paused **${currentTrack}**!`
				: "❌ | Something went wrong!",
		});
	},
};
