const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Pegue todos os arquivos de comando do diretório de comandos que você criou anteriormente
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Pegue todos os arquivos de comando do diretório de comandos que você criou anteriormente
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Obtenha a saída SlashCommandBuilder#toJSON() dos dados de cada comando para implementacao
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] O comando em ${filePath} esta faltando um requerimento "data" ou "execute" propriedade.`);
		}
	}
}

// Construa e prepare um objeto do módulo REST
const rest = new REST().setToken(token);

// envie os comandos
(async () => {
	try {
		console.log(`Começou a atualizar ${commands.length} slash (/) commands.`);

		// O método put é usado para atualizar totalmente todos os comandos da guilda com o conjunto atual
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`${data.length} slash (/) commands foram atualizados com SUCESSO.`);
	} catch (error) {
		// se acontecer algum erro, informe nas logs
		console.error(error);
	}
})();