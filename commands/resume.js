module.exports = {
	name: "resume",
	description: "resume current song!",

	async execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guild);
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: "❌ | No music is being played!",
			});
		const currentTrack = queue.current;
		const success = queue.setPaused(false);
		return void interaction.followUp({
			content: success
				? `✅ | Resumed **${currentTrack}**!`
				: "❌ | Something went wrong!",
		});
	},
};
