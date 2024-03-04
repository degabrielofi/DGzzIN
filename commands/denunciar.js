const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "denuncia",
  aliases: ["denunciar"],
  run: async (client, message, args) => {
    let degabrielofiembed = new Discord.MessageEmbed()
      .setAuthor("COMANDO: DENUNCIAR", "https://i.imgur.com/0b6Ohrl.png")
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
            "Utilize este comando para denúnciar alguém do servidor. Escreva com `d$denunciar (Denúncia).`",
          inline: true,
        },
        {
          name: "<:Sinonimos:1214053417933340692> Sinônimos:",
          value: "`d$denunciar` `d$denuncia`",
          inline: true,
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true,
        },
        {
          name: "<:folder:1214053377923616798> Exemplos:",
          value: "`d$denunciar O YGɑbrielGØDs#3317 me ofendeu.`",
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
        `<a:Incorreto:1214051678089777212>**| Este servidor não setou nem um canal de denúncias!**`
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
        `<a:Incorreto:1214051678089777212>**| A denúncia não pode passar de 425 caracteres!**`
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
        `${message.author.tag} << Membro que enviou a denúncia!`,
        message.author.displayAvatarURL()
      )
      .setDescription(
        `**<a:chatt:1214051668732285008> Denúncia enviada:** \n \`${denuncia}\``
      )
      .setColor(`GREEN`)
      .setFooter(
        `Autor do comando ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();

    let degabrielofienviada = new Discord.MessageEmbed()

      .setDescription(
        `<a:Correto:1214051675166478377>**| Sua Denúncia foi enviada com sucesso!** \n <:Caze_190:1214053427009814528> **|** **Um Staff verá sua denúncia, e tomará a providência necessária.**`
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
