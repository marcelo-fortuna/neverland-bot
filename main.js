const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Criar um novo objeto
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Defina um novo item na Coleção com a chave como o nome do comando e o valor como o módulo exportado
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] O comando em ${filePath} esta faltando uma requirida "data" ou "execute" propriedade.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`Nenhum comando compativel ${interaction.commandName} foi achado.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Aconteceu um erro ao executar esse comando!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Aconteceu um erro ao executar esse comando!', ephemeral: true });
		}
	}
});

// Logar no Discord com o seu TOKEN
client.login(token);

// 'c' == client
client.once(Events.ClientReady, c => {
	console.log(`Logado como: ${c.user.tag}`);
});