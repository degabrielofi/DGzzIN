const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "ban",
  aliases: ["banir"],

  run: async (client, message, args) => {
    let degabrielofipermision = new MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você não tem permissão para utilizar este comando!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    let degabrielofiembed = new MessageEmbed()
      .setAuthor("COMANDO: BAN", "https://i.imgur.com/0b6Ohrl.png")
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
            "Utilize este comando para banir um usuário do seu servidor. Escreva com `d$banir (usuário) (motívo).`",
          inline: true,
        },
        {
          name: "<:Sinonimos:1214053417933340692> Sinônimos:",
          value: "`d$banir` `d$ban`",
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
            "`d$banir @YGɑbrielGØDs Divulgação`\n`d$banir 812911319695097856 spam no chat`",
          inline: true,
        }
      );

    if (!args[0])
      return message.reply({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message
        .reply({
          content: `${message.author}`,
          embeds: [degabrielofipermision],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });

    const usu =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    var membro =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    let pessoa =
      message.mentions.users.first() || client.users.cache.get(args[0]);

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sem Motivo";

    let channelID = db.get(`${message.guild.id}_channelID`);
    if (!channelID) return;
    let channel = message.guild.channels.cache.get(channelID);
    if (!channel) return;

    let clearbutton = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("sim")
        .setLabel("Sim")
        .setStyle("SUCCESS"),
      new MessageButton().setCustomId("nao").setLabel("Não").setStyle("DANGER")
    );

    let incomplet = new MessageEmbed()
      .setAuthor("COMANDO: BAN", "https://i.imgur.com/0b6Ohrl.png")
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
            "Utilize este comando para banir um usuário do seu servidor. Escreva com `d$banir (usuário) (motívo).`",
          inline: true,
        },
        {
          name: "<:Sinonimos:1214053417933340692> Sinônimos:",
          value: "`d$banir` `d$ban`",
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
            "`d$banir @YGɑbrielGØDs Divulgação`\n`d$banir 812911319695097856 spam no chat`",
          inline: true,
        }
      );

    if (!args[0])
      return message.channel.send({
        content: `${message.author}`,
        embeds: [incomplet],
      });

    if (!usu)
      return message.channel.send({
        content: `${message.author}`,
        embeds: [incomplet],
      });

    let confirm = new MessageEmbed()
      .setTitle("<a:Sirene:1214051670343028776> CONFIRME O BANIMENTO")
      .setColor("#471515")
      .setThumbnail(message.author.displayAvatarURL({ format: "png" }))
      .setDescription(
        `<:Faixa:1214053411218268160> Você deseja banir ${usu} do servidor?\n<:Faixa:1214053411218268160> ID: \`${usu.id}\`\n<:Faixa:1214053411218268160> Confirme com: \`Sim!\`\n <:Faixa:1214053411218268160> Recuse com: \`Não\``
      )
      .setFooter(
        `Comando requisitado por: ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();

    let enviado = await message.channel.send({
      embeds: [confirm],
      components: [clearbutton],
    });

    const collector = enviado.createMessageComponentCollector({
      componentType: "BUTTON",
    });

    collector.on("collect", async (interaction) => {
      let degabrielofipermision2 = new MessageEmbed()

        .setDescription(
          `<a:Incorreto:940987809299316816>**| Apenas Administradores podem limpar o chat!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      if (!interaction.memberPermissions.has("ADMINISTRATOR"))
        return interaction
          .reply({
            content: `${interaction.user}`,
            embeds: [degabrielofipermision2],
            ephemeral: true,
          })
          .then((msg) => {
            message.delete();
            setTimeout(() => msg.delete(), 10000);
          });
      if (interaction.customId === "sim") {
        let sucess = new MessageEmbed()
          .setTitle(
            `<a:Correto:940987833789870120> **| Banimento realizado com sucesso!**`
          )
          .setColor("GREEN")
          .setFooter(`Comando realizado por: ${message.author.tag}`)
          .setTimestamp();
        enviado.edit({
          content: `${message.author}`,
          embeds: [sucess],
          components: [],
        });

        const embed = new MessageEmbed()
          .setTitle(`<:punido:1214053415244660787> Você foi banido!`)
          .setThumbnail("https://i.gifer.com/7yOa.gif")
          .setDescription(
            `<:Faixa:1214053411218268160> **Servidor:**\` ${message.guild.name}\`\n<:Faixa:1214053411218268160> **Banido por:**\` ${message.author.tag}\`\n<:Faixa:1214053411218268160> **Motivo:**\` ${reason}\``
          )
          .setColor("RED")
          .setTimestamp()
          .setFooter(
            message.guild.name,
            message.guild.iconURL({ dynamic: true })
          );

        const banmsg = new MessageEmbed()
          .setTitle("<:punido:1214053415244660787> Usuário punido!")
          .setColor("RED")
          .setThumbnail(message.author.displayAvatarURL({ format: "png" }))
          .setFooter(
            `Comando requisitado por: ${message.author.tag}`,
            message.author.displayAvatarURL({ format: "png" })
          )
          .setTimestamp()
          .addFields(
            {
              name: "<:Faixa:1214053411218268160> Usuário banido:",
              value: `Nick: ${pessoa}\n ID: \`${membro.id}\``,
              inline: true,
            },
            {
              name: "<:Faixa:1214053411218268160> Banido por:",
              value: `Nick: ${message.author}\n ID: \`${message.author.id}\``,
              inline: true,
            },
            {
              name: "\u200b",
              value: `\u200b`,
              inline: true,
            },
            {
              name: "<:Faixa:1214053411218268160> Motivo do banimento:",
              value: `\`${reason}\``,
              inline: true,
            }
          );
        await usu.send({ embeds: [embed] });
        await usu.ban({
          reason: reason,
        });

        channel.send({ embeds: [banmsg] });
      }

      if (interaction.customId === "nao") {
        let degabrielofinao = new MessageEmbed()

          .setDescription(
            `<a:Incorreto:1214051678089777212>**| Você cancelou a ação de Banimento!**`
          )
          .setFooter(`Requisitado por: ${message.author.tag}`)
          .setColor("RED");

        enviado
          .edit({
            content: "",
            embeds: [degabrielofinao],
            components: [],
          })
          .then((msg) => {
            message.delete();
            setTimeout(() => msg.delete(), 15000);
          });
      }
    });
  },
};
