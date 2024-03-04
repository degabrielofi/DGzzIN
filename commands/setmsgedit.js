const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setmsgedit",
  aliases: ["sme"],

  run: async (client, message, args) => {
    let canallogsedit =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      message
        .reply({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                `<a:Incorreto:1214051678089777212>**| Você não tem permissão para utilizar este comando!**`
              )
              .setFooter(`Requisitado por: ${message.author.tag}`)
              .setColor("RED"),
          ],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    } else if (!canallogsedit) {
      message
        .reply({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                `<a:Incorreto:1214051678089777212>**| Você tem que determinar um canal!**`
              )
              .setFooter(`Requisitado por: ${message.author.tag}`)
              .setColor("RED"),
          ],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    } else {
      db.set(`channelLogseditmsg_${message.guild.id}`, canallogsedit.id);

      message
        .reply({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                `<a:Correto:1214051675166478377>**| O canal de mensagem editadas foi setado em ${canallogsedit} **`
              )
              .setFooter(`Requisitado por: ${message.author.tag}`)
              .setColor("GREEN"),
          ],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 15000);
        });
    }
  },
};
