const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `BLACK`;

module.exports = {
  name: "addemoji",
  category: "Administrators",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(`MANAGE_EMOJIS`)) {
      let degabrielofipermisionuser = new Discord.MessageEmbed()

        .setDescription(
          `<a:Incorreto:1214051678089777212>**| Você não tem permissão para utilizar este comando!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      return message.channel
        .send({
          content: `${message.author}`,
          embeds: [degabrielofipermisionuser],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    }

    const emoji = args[0];
    if (!emoji) {
      let degabrielofiembed = new Discord.MessageEmbed()
        .setAuthor(
          "COMANDO: ADICIONAR EMOJI",
          "https://i.imgur.com/0b6Ohrl.png"
        )
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
              "Utilize este comando para adicionar um emoji em seu servidor. Escreva com `d$adicionaremoji (emoji).`",
            inline: true,
          },
          {
            name: "<:Sinonimos:1214053417933340692> Sinônimos:",
            value: "`d$adicionaremoji` `d$addemoji`",
            inline: true,
          },
          {
            name: "\u200b",
            value: `\u200b`,
            inline: true,
          },
          {
            name: "<:folder:1214053377923616798> Exemplos:",
            value:
              "`d$adicionaremoji <:ney_caze:935410173462327317>`\n`d$adicionaremoji` <:ney_caze:935410173462327317>",
            inline: true,
          }
        );

      return message.channel.send({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });
    }

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const degabrielofiadd = new MessageEmbed()
        .setTitle(`<a:festa:1214051680774000662> Emoji adicionado com sucesso!`)
        .setColor(`#471515`)
        .setThumbnail("https://i.imgur.com/eRn4jO9.png")
        .setFooter(
          `Autor do comando ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true, size: 2048 })
        )
        .addFields(
          {
            name: "<:Descricao:1214053842162024508> Nome:",
            value: `${name || `${customemoji.name}`}`,
            inline: true,
          },
          {
            name: "\u200b",
            value: `\u200b`,
            inline: true,
          },
          {
            name: "<:Link:1214053379664379964> Link:",
            value: `[Clique aqui](${Link})`,
            inline: true,
          }
        );

      return message.channel.send({ embeds: [degabrielofiadd] });
    } else {
      let degabrielofiinvalido = new Discord.MessageEmbed()

        .setDescription(
          `<a:Incorreto:1214051678089777212>**| Por favor, envie um emoji valido!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      let degabrielofi = new Discord.MessageEmbed()

        .setDescription(
          `<a:Incorreto:1214051678089777212>**| Você pode usar o emoji normal sem adicionar no servidor.**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel
          .send({
            content: `${message.author}`,
            embeds: [degabrielofiinvalido],
          })
          .then((msg) => {
            message.delete();
            setTimeout(() => msg.delete(), 10000);
          });
      message.channel
        .send({ content: `${message.author}`, embeds: [degabrielofi] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    }
  },
};
