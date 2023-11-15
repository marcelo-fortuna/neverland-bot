export function Logger(message, client) {
    console.log(`Teste ${message}`);
    const server = client.guilds.cache.get('1169671375292731452');
    const channel = server.channels.cache.get('1169671376085454859');

    channel.send(message);
}