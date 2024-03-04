const {
  Client,
  Message,
  MessageEmbed,
  DiscordAPIError,
} = require("discord.js");

module.exports = {
  name: "clear",
  aliases: ["limpar chat"],

  run: async (client, message, args) => {
    let degabrielofipermision = new MessageEmbed()

      .setDescription(
        `<a:Incorreto:940987809299316816>**| Você não tem permissão para utilizar este comando!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message
        .reply({
          content: `${message.author}`,
          embeds: [degabrielofipermision],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });

    try {
      let delamount = args[0];
      let msg_del = parseInt(delamount) + 1;

      let degabrielofi = new MessageEmbed()
        .setAuthor("COMANDO: CLEAR", "https://i.imgur.com/0b6Ohrl.png")
        .setThumbnail("https://i.imgur.com/zNE1IMO.png")
        .setTimestamp()
        .setFooter(
          `Autor do comando ${message.author.tag}`,
          message.author.displayAvatarURL({ format: "png" })
        )
        .setColor("#471516")
        .addFields(
          {
            name: "<:Descricao:1214053842162024508> Descrição:",
            value:
              "Utilize este comando para limpar mensagens no chat. Escreva com `d$clear (número de 1 a 99).`",
            inline: true,
          },
          {
            name: "<:Sinonimos:1214053417933340692> Sinônimos:",
            value: "`d$clear` `d$limpar`",
            inline: true,
          },
          {
            name: "\u200b",
            value: `\u200b`,
            inline: true,
          },
          {
            name: "<:folder:1214053377923616798> Exemplos:",
            value: "`d$clear 50 `",
            inline: true,
          }
        );

      if (isNaN(delamount) || parseInt(delamount <= 0))
        return message.reply({ embeds: [degabrielofi] });

      let degabrielofiembed = new MessageEmbed()

        .setDescription(
          `<a:Incorreto:1214051678089777212>**| Você só pode limpar de 1 a 99 mensagens!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      if (parseInt(delamount) > 99)
        return message
          .reply({ content: `${message.author}`, embeds: [degabrielofiembed] })
          .then((msg) => {
            message.delete();
            setTimeout(() => msg.delete(), 10000);
          });

      await message.channel.bulkDelete(parseInt(delamount) + 1, true);

      let clear = new MessageEmbed()

        .setTitle(
          `<a:Correto:1214051675166478377> **|** Limpeza realizada com sucesso!`
        )
        .setColor("GREEN")
        .setDescription(
          `\\🧹 **| Foi limpa ${delamount} mensagens do chat.**\n<:Card:1214053844099792926> **| Staff que limpou as mensagens: **${message.author}`
        )
        .setFooter(
          `Autor do comando ${message.author.tag}`,
          message.author.displayAvatarURL({ format: "png" })
        )
        .setTimestamp();

      await message.channel
        .send({ content: `${message.author}`, embeds: [clear] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    } catch (e) {
      console.log(e);
    }
  },
};
