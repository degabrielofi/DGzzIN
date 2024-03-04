const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "Antilink",
  author: "ferinha",

  run: async (client, message, args) => {
    let degabrielofipermision = new Discord.MessageEmbed()
      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você não tem permissão para utilizar este comando!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    let degabrielofiembed = new Discord.MessageEmbed()
      .setAuthor("COMANDO: PROIBIR LINKS", "https://i.imgur.com/0b6Ohrl.png")
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
            "Utilize este comando para proibir links em seu servidor. Escreva com `d$antilink on` para ativar ou `d$antilink off` para desativar.",
          inline: true,
        },
        {
          name: "<:Sinonimos:1214053417933340692> Sinônimos:",
          value: "`d$antilink` `d$antilinks`",
          inline: true,
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true,
        },
        {
          name: "<:folder:1214053377923616798> Exemplos:",
          value: "`d$antilink on`\n`d$antilink off`",
          inline: true,
        }
      );

    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message
        .reply({
          content: `${message.author}`,
          embeds: [degabrielofipermision],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });

    if (!args[0] || (args[0] !== "on" && args[0] !== "off"))
      message.reply({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });

    if (args[0] === "on") {
      let degabrielofiativada = new Discord.MessageEmbed()

        .setDescription(
          `<a:Correto:1214051675166478377>**| O sistema foi ativado com sucesso!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("GREEN");

      db.set(`antilink_${message.guild.id}`, "on");
      message.reply({
        content: `${message.author}`,
        embeds: [degabrielofiativada],
      });
    }

    if (args[0] === "off") {
      let degabrielofidesativado = new Discord.MessageEmbed()

        .setDescription(
          `<a:Correto:1214051675166478377>**| O sistema foi desativado com sucesso!** `
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("GREEN");

      db.set(`antilink_${message.guild.id}`, "off");
      message.reply({
        content: `${message.author}`,
        embeds: [degabrielofidesativado],
      });
    }
  },
};
