module.exports = {
	name: "info",
	description: "get discord info",

	async execute(client, interaction) {
		return void interaction.followUp({
			embeds: [
				{
					color: "GREEN",
					author: { name: "[Message] Channel Information" },
					description: `
				**Guild Id :** ${interaction.guild.id}
		**Channel Member Id :** ${interaction.member.voice.channel.id}
		**Text Channel Id :** ${interaction.channel.id}
				`,
				},
			],
		});
	},
};
