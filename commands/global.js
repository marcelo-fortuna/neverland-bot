import { REST, Routes } from 'discord.js';
import { ping_command } from "./ping/ping.js";
import "dotenv/config";

export const GLOBAL_COMMANDS = [{
    ping_command,
}];

export async function loadCommands(appId, commands) {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    console.log('Refreshing application (/) commands.');

    try {
        await rest.put(Routes.applicationCommands(appId, { body: [commands] }));
        console.log('Refreshed application (/) commands! :)');
    } catch (e) {
        console.error(`Erro ao inicializar comandos globais\nMensagem: ${e}`);
    }
}
