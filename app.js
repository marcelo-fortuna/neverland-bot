import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { Logger } from "./logger.js";
import { ping_handler } from "./commands/global/ping/ping.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await ping_handler(interaction, client);
    return;
  }

  if (interaction.commandName === "something") {
    //   handler fuction
    interaction.reply("Something");
    // always return, just in case

  }
});

// Error handling
client.on("error", async (error) => {
  Logger(`Client Error: ${error}`, client);
});

// Start the bot
client
  .login(process.env.DISCORD_TOKEN)
  .then(() => console.log(`${client.user.tag} Online!`));
