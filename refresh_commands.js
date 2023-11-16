import { GLOBAL_COMMANDS } from './commands/global/global_commands_router.js';
import {PRIVATE_COMMANDS} from "./commands/private/private_commands_router.js";
import "dotenv/config";
import {REST, Routes} from "discord.js";

async function loadCommands(appId, commands) {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  console.log('Refreshing application (/) commands.');

  try {
    await rest.put(Routes.applicationCommands(appId, { body: [commands] }));
    console.log('Refreshed application (/) commands! :)');
  } catch (e) {
    console.error(`Erro ao inicializar comandos globais\nMensagem: ${e}`);
  }
}

await loadCommands(process.env.APP_ID, GLOBAL_COMMANDS);
await loadCommands(process.env.APP_ID, PRIVATE_COMMANDS)
