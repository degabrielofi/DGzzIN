const Discord = require("discord.js");

module.exports = {
  name: "lock",
  aliases: [""],

  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      let degabrielofipermision = new Discord.MessageEmbed()
        .setDescription(
          `<a:Incorreto:1214051678089777212>**| Você não tem permissão para utilizar este comando!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      message
        .reply({
          content: `${message.author}`,
          embeds: [degabrielofipermision],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    } else {
      let degabrieloficerto = new Discord.MessageEmbed()
        .setDescription(
          `<a:Correto:1214051675166478377>**| Este canal foi trancado com sucesso.**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("GREEN");

      message
        .reply({ content: `${message.author}`, embeds: [degabrieloficerto] })
        .then((msg) => {
          let degabrielofialgoerrado = new Discord.MessageEmbed()
            .setDescription(
              `<a:Incorreto:1214051678089777212>**| Algo deu errado ao tentar trancar este canal**`
            )
            .setFooter(`Requisitado por: ${message.author.tag}`)
            .setColor("RED");

          message.channel.permissionOverwrites
            .edit(message.guild.id, { SEND_MESSAGES: false })
            .catch((e) => {
              console.log(e);
              msg.edit({
                content: `${message.author}`,
                embeds: [degabrielofialgoerrado],
              });
            });
        });
    }
  },
};
