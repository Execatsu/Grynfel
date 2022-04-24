const Discord = require("discord.js");
const config  = require("../config.json");

module.exports.run = async (client, message, args, command) => {
    message.delete().catch(error => console.log(error));
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`${message.author}, você não tem permissão para utilizar este comando!`);
    if (args.length == 0) {
        message.channel.send(`Como ultilizar este comando:\n**Escolha um Canal** ${config.prefix + command} #nomedocanal mensagem\n**No canal onde está** ${config.prefix + command} mensagem`);
        
        // await message.channel.send(
        //     new Discord.MessageEmbed()
        //     .setTitle("Como utilizar este comando")
        //     .setDescription(`*${config.prefix + command} #nomedocanal mensagem*\n\nou apenas:\n*${config.prefix + command} mensagem*\n\npara enviar a mensagem no canal onde está sendo executado o comando.`)
        // );
        
        return;
    }
    
    let channel = findChannel(message, args);
    
    const sayMessage = args.join(" ");
    await channel.send(sayMessage);
    // await message.channel.send(`${message.author} o aviso foi enviado com sucesso!`);
};

function findChannel(message, args) {
    let channelId = args[0].slice(2, args[0].length - 1);
    let channel = message.guild.channels.cache.find(ch => ch.id === channelId);
    
    if (!channel) { channel = message.channel }
    else { args.shift() };
    
    return channel;
}