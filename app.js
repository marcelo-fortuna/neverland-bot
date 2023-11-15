import {
  Client,
  Events,
  GatewayIntentBits
} from 'discord.js';
import 'dotenv/config';
import { Logger } from './logger.js';
//import { checks } from "./checks.js";
import express from 'express';
import { VerifyDiscordRequest } from './utils.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create an express app
const app = express();
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

client.on('ready', () => { });

client.on(Events.InteractionCreate, async interaction => {
  try {
    // Check basic stuff
    //const check_passed = await checks(interaction);
    //if (check_passed === false) return;

    // Handle command
    const user = interaction.user;
    const user_id = user.id;
    const neverbar_server = client.guilds.cache.get('1169671375292731452');
    const bot_channel = neverbar_server.channels.cache.get('1169671376085454859');

    console.log(`User ${user_id} used a command`);

    bot_channel.send("Isso é uma mensagem");

    // Send private message to user
    neverbar_server.channels.cache.get('1169671376085454859').send(`Hey <@${user_id}>! This is the new test zone, so you will be removed from the old test server. Enjoy!`);
    
    await interaction.reply({
      content: 'Migration completed, you will be removed from this server in 5 seconds',
      ephemeral: true
    });

    // Kick user from test server
    setTimeout(() => {
      Logger(`User <@${user_id}> migrated.`, client)
    }, 5000)

  } catch (error) {
    try {
      await interaction.reply({ content: 'Something went wrong, please contact the developer', ephemeral: true });
    } catch (error) {
      console.log(`Interaction Error: ${error} - ${client}`)
    }
    Logger(`Error: ${error}`, client)
  }

});

client.on('error', async error => {
  Logger(`Client Error: ${error}`, client)
})


client.login(process.env.DISCORD_TOKEN).then(() => console.log(`${client.user.tag} Online!`));
