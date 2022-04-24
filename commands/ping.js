const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const msg = await message.channel.send('ping?');

  msg.edit(`🏓 **| Pong!**\nLatência do Server: **${msg.createdTimestamp -
      message.createdTimestamp}ms.**\nLatência da API: **${Math.round(
      client.ws.ping
    )}ms**`
  );
};