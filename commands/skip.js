module.exports = {
	name: "skip",
	description: "skip current song",

	async execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guild);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});
		const currentTrack = queue.current;
		const success = queue.skip();
		return void interaction.followUp({
			content: success
				? `✅ | Skipped **${currentTrack}**!`
				: "❌ | Something went wrong!",
		});
	},
};
