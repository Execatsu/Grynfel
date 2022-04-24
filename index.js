const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
const config = require("./config.json")

client.on("messageCreate", message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
    const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, command);
    } catch (err) {
        console.error(`Erro: ${err}`)
    }
});

client.on("ready", () => {
    let activities = [
        `${config.prefix}help for help`,
        `${client.guilds.cache.size} servers!`,
        `${client.channels.cache.size} channels!`,
        `${client.users.cache.size} users!`
    ],
    i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING" //WATCHING, LISTENING, PLAYING, STREAMING
    }), 1000 * 20); 
    console.log("The bot was started!");
});

require('dotenv/config');
client.login(process.env.TOKEN);