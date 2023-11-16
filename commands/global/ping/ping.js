import { GatewayIntentBits } from "discord.js";

export const ping_command = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

export async function ping_handler(interaction, client) {
  await interaction.reply("Pong!");
}
