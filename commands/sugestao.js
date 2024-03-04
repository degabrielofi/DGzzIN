const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "sugerir",
  aliases: ["sugestao"],
  run: async (client, message, args) => {
    let degabrielofiembed = new Discord.MessageEmbed()
      .setAuthor("COMANDO: SUGERIR", "https://i.imgur.com/0b6Ohrl.png")
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
            "Utilize este comando para sugerir algo para o servidor. Escreva com `d$sugestao (Sugestão).`",
          inline: true,
        },
        {
          name: "<:Sinonimos:1214053417933340692> Sinônimos:",
          value: "`d$sugestao` `d$sugerir`",
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
            "`d$sugestao Sugiro que adicione um bot de musica no servidor.`",
          inline: true,
        }
      );
    if (!args[0])
      return message.reply({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });

    let prefixo = "d$";
    let channelSUGERIR = db.fetch(`channelSUGERIR_${message.guild.id}`);

    let degabrielofisetchannel = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Este servidor não setou nem um canal de sugestões!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (!channelSUGERIR)
      return message
        .reply({
          content: `${message.author}`,
          embeds: [degabrielofisetchannel],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    let sugerirENVIAR = client.channels.cache.get(channelSUGERIR);
    let sugestão = args.slice(0).join(" ");

    if (!sugestão)
      return message.reply({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });

    let degabrielofimax = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| A Sugestão não pode passar de 425 caracteres!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (sugestão.length > 425)
      return message
        .reply({ content: `${message.author}`, embeds: [degabrielofimax] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    let sugerirEMBED = new Discord.MessageEmbed()
      .setTitle(
        `${message.author.tag} << Membro que enviou a sugestão`,
        message.author.displayAvatarURL()
      )
      .setDescription(
        `**<a:Chat:1214082048256380938> Sugestão enviada:** \n \`${sugestão}\``
      )
      .setColor(`GREEN`)
      .setFooter(`👍 - Aceita | 👎 - Discorda`)
      .setTimestamp();

    let degabrielofienviada = new Discord.MessageEmbed()

      .setDescription(
        `<a:Correto:1214051675166478377>**| Sua sugestão foi enviada com sucesso!** \n <a:chatt:1214051668732285008> **|** **Confira em ${sugerirENVIAR} **`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("GREEN");

    message
      .reply({ content: `${message.author}`, embeds: [degabrielofienviada] })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 15000);
      });
    sugerirENVIAR
      .send({ content: `${message.author}`, embeds: [sugerirEMBED] })
      .then((msg) => {
        msg.react("👍");
        msg.react("👎");
      });
  },
};
