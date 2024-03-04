const Discord = require("discord.js");

module.exports = {
  name: "emojiinfo",
  aliases: ["emoji"],

  run: async (client, message, args) => {
    let emoji =
      client.emojis.cache.find(
        (emoji) => `<:${emoji.name}:${emoji.id}>` === args[0]
      ) ||
      client.emojis.cache.find((emoji) => emoji.name === args[0]) ||
      client.emojis.cache.get(args[0]);

    if (!emoji) {
      message
        .reply({
          embeds: [
            new Discord.MessageEmbed()
              .setDescription(
                `<a:Incorreto:1214051678089777212>**| Você tem que determinar o emoji!**`
              )
              .setFooter(`Requisitado por: ${message.author.tag}`)
              .setColor("RED"),
          ],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    } else if (emoji) {
      try {
        if (!emoji.animated) {
          let img = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;
          let botao = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setStyle("LINK")
              .setLabel("Faça o download")
              .setEmoji("<:Link:1214053379664379964>")
              .setURL(img)
          );

          let embed = new Discord.MessageEmbed()
            .setColor("#471516")
            .setTitle("Informações do Emoji \\🕵")
            .setThumbnail(`${img}`)
            .addFields(
              {
                name: `\\📝 Nome do emoji:`,
                value: `\`${emoji.name}\``,
                inline: false,
              },
              {
                name: `\\🆔 ID do emoji:`,
                value: `\`${emoji.id}\``,
                inline: false,
              },
              {
                name: `\\👀 Menção do emoji:`,
                value: `\`${emoji}\``,
                inline: false,
              },
              {
                name: `\\🔎 Tipo do emoji é:`,
                value: `\`Imagem (png/jpg)\``,
                inline: false,
              }
            );

          message.reply({ embeds: [embed], components: [botao] });
        } else if (emoji.animated) {
          let img = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=2048`;
          let botao = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setStyle("LINK")
              .setLabel("Faça o download")
              .setEmoji("<:Link:1214053379664379964>")
              .setURL(`${img}`)
          );

          let embed = new Discord.MessageEmbed()
            .setColor("#471516")
            .setTitle("Informações do Emoji \\🕵")
            .setThumbnail(img)
            .addFields(
              {
                name: `\\📝 Nome do emoji:`,
                value: `\`${emoji.name}\``,
                inline: false,
              },
              {
                name: `\\🆔 ID do emoji:`,
                value: `\`${emoji.id}\``,
                inline: false,
              },
              {
                name: `\\👀 Menção do emoji:`,
                value: `\`${emoji}\``,
                inline: false,
              },
              {
                name: `\\🔎 Tipo do emoji é:`,
                value: `\`Gif\``,
                inline: false,
              }
            );

          message.reply({ embeds: [embed], components: [botao] });
        }
      } catch (e) {
        let degabrielofierro = new Discord.MessageEmbed()
          .setDescription(
            `<a:Incorreto:1214051678089777212>**| Não consegui identificar o emoji.**`
          )
          .setFooter(`Requisitado por: ${message.author.tag}`)
          .setColor("RED");
        message
          .reply({ content: `${message.author}`, embeds: [degabrielofierro] })
          .then((msg) => {
            message.delete();
            setTimeout(() => msg.delete(), 10000);
          });
      }
    }
  },
};
