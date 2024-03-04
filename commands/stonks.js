const Color = "#3498db";
const Discord = require("discord.js");

module.exports = {
  name: "stonks",
  category: "Image",

  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    const Embed = new Discord.MessageEmbed()
      .setTitle("Stonks demais!")
      .setColor(Color)
      .setImage(
        encodeURI(
          `https://vacefron.nl/api/stonks?user=${Member.user.displayAvatarURL({
            format: "png",
          })}`
        )
      )
      .setFooter(
        `Comando requisitado por: ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();

    message.channel.send({ content: `${message.author}`, embeds: [Embed] });
  },
};
