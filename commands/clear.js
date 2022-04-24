const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`${message.author}, você não tem permissão para utilizar este comando!`);

    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 1 || deleteCount > 99) return message.channel.send("forneça um número de até **99 mensagens** a serem excluídas");

    const fetched = await message.channel.messages.fetch({ limit: deleteCount + 1 });

    message.channel.bulkDelete(fetched);
    message.channel
        .send(`**${args[0]} mensagens limpas nesse chat!**`)
        .then(msg => msg.delete({ timeout: 7000 }))
        .catch(e => console.log(`Não foi possível deletar mensagens devido a: ${e}`));
};