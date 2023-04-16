const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('servidor')
		.setDescription('Informa sobre o servidor.'),
	async execute(interaction) {
		// interaction.guild é o objeto representando o servidor que o comando esta sendo executado
		await interaction.reply(`O servidor é **${interaction.guild.name}** e tem ${interaction.guild.memberCount} membros.`);
	},
};