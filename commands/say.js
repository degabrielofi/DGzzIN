const Discord = require("discord.js");

module.exports = {
  name: "say",
  run: async (client, message, args) => {
    let degabrielofi = new Discord.MessageEmbed()
      .setAuthor("COMANDO: FALAR", "https://i.imgur.com/0b6Ohrl.png")
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
            "Utilize este comando para mim falar algo no chat. Escreva com `d$say (Mensagem).`",
          inline: true,
        },
        {
          name: "<:Sinonimos:1214053417933340692> Sinônimos:",
          value: "`d$say` `d$falar`",
          inline: true,
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true,
        },
        {
          name: "<:folder:1214053377923616798> Exemplos:",
          value: "`d$say Salve!! `",
          inline: true,
        }
      );
    if (!args[0])
      return message.reply({
        content: `${message.author}`,
        embeds: [degabrielofi],
      });

    message.delete();
    let sayMessage = args.join(" ");
    if (message.content.includes("@everyone")) {
      let degabrielofieveryone = new Discord.MessageEmbed()

        .setDescription(
          `<a:Incorreto:1214051678089777212>**| Você não pode marcar @everyone!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      sayMessage = sayMessage.replace;
      return message
        .reply({ content: `${message.author}`, embeds: [degabrielofieveryone] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    }

    if (message.content.includes("@here")) {
      let degabrielofihere = new Discord.MessageEmbed()
        .setDescription(
          `<a:Incorreto:1214051678089777212>**| Você não pode marcar @here!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      sayMessage = sayMessage.replace;
      return message.channel
        .send({ content: `${message.author}`, embeds: [degabrielofihere] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    }

    message.channel.send(
      `${sayMessage} \n\n ||<:saiu:1214053381979504740> Mensagem enviada por: ${message.author}||`
    );
  },
};
