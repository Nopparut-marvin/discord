module.exports = {
	name: "back",
	description: "Plays the previous track",

	async execute(client, interaction) {
		await queue.back();
		return void interaction.followUp({
			content: "✅ | Playing the previous track!",
		});
	},
};
