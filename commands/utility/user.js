const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('usuario')
		.setDescription('Informa sobre você mesmo.'),
	async execute(interaction) {
		// interaction.user representa o Usuario que usou o comando
		// interaction.member representa o GuildMember object, que representa o usuario em um servidor especifico
		await interaction.reply({ content: `**${interaction.user.username}**, entrou em: \`${interaction.member.joinedAt}.\``, ephemeral: true });
	},
};