module.exports = {
	name: "back",
	description: "Plays the previous track",

	async execute(client, interaction) {
		const queue = client.player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});
		await queue.back();
		return void interaction.followUp({
			content: "✅ | Playing the previous track!",
		});
	},
};
