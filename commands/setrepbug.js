const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setdenuncia",
  aliases: ["setdenunciar"],
  run: async (client, message, args) => {
    let channelMENTIONED =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);

    let degabrielofichannel = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você não inseriu um canal válido!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (!channelMENTIONED)
      return message
        .reply({ content: `${message.author}`, embeds: [degabrielofichannel] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });

    await db.set(
      `channelDENUNCIA_${message.guild.id}`,
      `${channelMENTIONED.id}`
    );

    let degabrielofiset = new Discord.MessageEmbed()

      .setDescription(
        `<a:Correto:1214051675166478377>**| O canal de Reportar de bugs foi setado em ${channelMENTIONED} **`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("GREEN");

    message
      .reply({ content: `${message.author}`, embeds: [degabrielofiset] })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 15000);
      });
  },
};
