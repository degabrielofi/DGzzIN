const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addcargo",
  aliases: [],
};

module.exports.run = async (client, message, args) => {
  if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
    let degabrielofipermisionbot = new MessageEmbed()
      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Não tenho permissão!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    const msgBot = await message.channel.send({
      embeds: [degabrielofipermisionbot],
    });
    setTimeout(() => msgBot.delete(), 10000);
    return;
  }

  if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    let degabrielofipermision = new MessageEmbed()
      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você não tem permissão de executar este comando!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    const msgPerm = await message.channel.send({
      content: `${message.author}`,
      embeds: [degabrielofipermision],
    });
    setTimeout(() => msgPerm.delete(), 10000);
    return;
  }

  const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  const role =
    message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

  const degabrielofi = new MessageEmbed()
    .setAuthor("COMANDO: ADICIONAR CARGO", "https://i.imgur.com/0b6Ohrl.png")
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
          "Utilize este comando para adicionar um cargo em um usuário do servidor. Escreva com `d$addcargo (usuário) (cargo).`",
        inline: true,
      },
      {
        name: "<:Sinonimos:1214053417933340692> Sinônimos:",
        value: "`d$addcargo` `d$adicionarcargo`",
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
          "`d$addcargo @YGɑbrielGØDs @❰⭐❱❱❱ Parceiro ✫✫✫ `\n`d$addcargo 812911319695097856 @❰⭐❱❱❱ Parceiro ✫✫✫ `",
        inline: true,
      }
    );

  if (!args[0])
    return message.channel.send({
      content: `${message.author}`,
      embeds: [degabrielofi],
    });

  if (!role)
    return message.channel.send({
      content: `${message.author}`,
      embeds: [degabrielofi],
    });

  const member =
    message.guild.members.cache.get(args[0]) ||
    message.mentions.members.first();

  const degabrielofiaddcargo = new MessageEmbed()
    .setTitle(`<a:Correto:1214051675166478377> **|** Cargo adicionado! `)
    .addField(
      `<:Members:1214053421955424358> Usuário que recebeu o cargo:`,
      `${member.user}`
    )
    .addField(`<:Checklist:1214067201007689818> Cargo:`, `${role}`)
    .addField(
      `<:Card:1214053844099792926> Staff que adicionou o cargo:`,
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
