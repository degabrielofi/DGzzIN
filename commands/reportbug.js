const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "denuncia",
  aliases: ["denunciar"],
  run: async (client, message, args) => {
    let degabrielofiembed = new Discord.MessageEmbed()
      .setAuthor("COMANDO: REPORTAR BUG", "https://i.imgur.com/0b6Ohrl.png")
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
            "Utilize este comando para reportar um bug sobre alguma coisa no servidor. Escreva com `d$reportbug (Bug).`",
          inline: true,
        },
        {
          name: "<:Sinonimos:1214053417933340692> Sinônimos:",
          value: "`d$reportbug` `repbug` `d$reportarbug`",
          inline: true,
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true,
        },
        {
          name: "<:folder:1214053377923616798> Exemplos:",
          value: "`d$reportbug Tal comando está bugado.`",
          inline: true,
        }
      );
    if (!args[0])
      return message.reply({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });

    let prefixo = "d$";
    let channelDENUNCIA = db.fetch(`channelDENUNCIA_${message.guild.id}`);

    let degabrielofisetchannel = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Este servidor não setou nem um canal de reportar bug!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (!channelDENUNCIA)
      return message
        .reply({
          content: `${message.author}`,
          embeds: [degabrielofisetchannel],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    let denunciaENVIAR = client.channels.cache.get(channelDENUNCIA);
    let denuncia = args.slice(0).join(" ");

    if (!denuncia)
      return message.reply({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });

    let degabrielofimax = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| O Reporte não pode passar de 425 caracteres!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (denuncia.length > 425)
      return message
        .reply({ content: `${message.author}`, embeds: [degabrielofimax] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    let denunciaEMBED = new Discord.MessageEmbed()
      .setTitle(
        `${message.author.tag} << Membro que enviou o reporte do bug!`,
        message.author.displayAvatarURL()
      )
      .setDescription(
        `**<a:chatt:1214051668732285008> Bug reportado:** \n \`${denuncia}\``
      )
      .setColor(`GREEN`)
      .setFooter(
        `Autor do comando ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();

    let degabrielofienviada = new Discord.MessageEmbed()

      .setDescription(
        `<a:Correto:1214051675166478377>**| Seu reporte foi enviado com sucesso!** \n <a:Sirene:1214051670343028776> **|** ** Obrigado por reportar um bug, um Desenvolvedor verá seu reporte, e tomará a providência necessária.**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("GREEN");

    message
      .reply({ content: `${message.author}`, embeds: [degabrielofienviada] })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 15000);
      });
    denunciaENVIAR
      .send({ content: `${message.author}`, embeds: [denunciaEMBED] })
      .then((msg) => {
        msg.react("<a:Correto:1214051675166478377>");
        msg.react("<a:Incorreto:1214051678089777212>");
      });
  },
};
