const Discord = require("discord.js");

module.exports = {
  name: "addcargo",
  aliases: [""],
};
module.exports.run = (client, message, args) => {
  const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  const role =
    message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

  let degabrielofipermisionbot = new Discord.MessageEmbed()

    .setDescription(
      `<a:Incorreto:1214051678089777212>**| Não tenho permissão!**`
    )
    .setFooter(`Requisitado por: ${message.author.tag}`)
    .setColor("RED");

  let degabrielofipermision = new Discord.MessageEmbed()

    .setDescription(
      `<a:Incorreto:1214051678089777212>**| Você não tem permissão de executar este comando!**`
    )
    .setFooter(`Requisitado por: ${message.author.tag}`)
    .setColor("RED");

  if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
    return message.channel
      .send({
        content: `${message.author}`,
        embeds: [degabrielofipermisionbot],
      })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 10000);
      });
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel
      .send({ content: `${message.author}`, embeds: [degabrielofipermision] })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 10000);
      });
  const Member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  const degabrielofi = new Discord.MessageEmbed()

    .setAuthor("COMANDO: REMOVER CARGO", "https://i.imgur.com/0b6Ohrl.png")
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
          "Utilize este comando para remover um cargo em um usuário do servidor. Escreva com `d$remcargo (usuário) (cargo).`",
        inline: true,
      },
      {
        name: "<:Sinonimos:1214053417933340692> Sinônimos:",
        value: "`d$remcargo` `d$removecargo` `d$removercargo`",
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
          "`d$remcargo @YGɑbrielGØDs @❰⭐❱❱❱ Parceiro ✫✫✫ `\n`d$remcargo 812911319695097856 @❰⭐❱❱❱ Parceiro ✫✫✫ `",
        inline: true,
      }
    );

  if (!args[0])
    return message.channel.send({
      content: `${message.author}`,
      embeds: [degabrielofi],
    });
  let msg = args.join(" ");

  const degabrielofi2 = new Discord.MessageEmbed()

    .setAuthor("COMANDO: REMOVER CARGO", "https://i.imgur.com/0b6Ohrl.png")
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
          "Utilize este comando para remover um cargo em um usuário do servidor. Escreva com `d$remcargo (usuário) (cargo).`",
        inline: true,
      },
      {
        name: "<:Sinonimos:1214053417933340692> Sinônimos:",
        value: "`d$remcargo` `d$removecargo` `d$removercargo`",
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
          "`d$remcargo @YGɑbrielGØDs @❰⭐❱❱❱ Parceiro ✫✫✫ `\n`d$remcargo 812911319695097856 @❰⭐❱❱❱ Parceiro ✫✫✫ `",
        inline: true,
      }
    );

  if (!role)
    return message.channel.send({
      content: `${message.author}`,
      embeds: [degabrielofi2],
    });

  const member =
    message.guild.members.cache.get(args[0]) ||
    message.mentions.members.first();
  const degabrielofiaddcargo = new Discord.MessageEmbed()

    .setTitle(`<a:Correto:1214051675166478377> **|** Cargo removido! `)
    .addField(
      `<:Members:1214053421955424358> Usuário que o cargo foi removido:`,
      `${member.user}`
    )
    .addField(`<:Checklist:1214067201007689818> Cargo:`, `${role}`)
    .addField(
      `<:Card:1214053844099792926> Staff que removeu o cargo:`,
      `${message.author}`
    )
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(
      `Autor do comando ${message.author.tag}`,
      message.author.displayAvatarURL({ format: "png" })
    )
    .setTimestamp()
    .setColor("GREEN");

  user.roles.add(role);

  message.reply({ embeds: [degabrielofiaddcargo] });
};
