const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setban",

  run: async (client, message, args) => {
    let degabrielofipermision = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você não tem permissão para utilizar este comando!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    let degabrielofierr = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você tem que determinar um canal!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.reply({
        content: `${message.author}`,
        embeds: [degabrielofipermision],
      });

    if (!args[0])
      return message
        .reply({ content: `${message.author}`, embeds: [degabrielofierr] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel)
      return message
        .reply({ content: `${message.author}`, embeds: [degabrielofierr] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    let id = channel.id;

    let sucess = new Discord.MessageEmbed()
      .setDescription(
        `<a:Correto:1214051675166478377>**| O canal de banimentos foi setado em ${channel} **`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("GREEN");

    message.reply({ embeds: [sucess] }).then((msg) => {
      message.delete();
      setTimeout(() => msg.delete(), 15000);
    });

    db.set(`${message.guild.id}_channelID`, id);
  },
};
