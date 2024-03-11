const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "ban",
  aliases: ["banir"],

  run: async (client, message, args) => {
    const noPermissionEmbed = new MessageEmbed()
      .setDescription(
        "<a:Incorreto:1214051678089777212>**| Você não tem permissão para utilizar este comando!**"
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    const commandInfoEmbed = new MessageEmbed()
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
        embeds: [commandInfoEmbed],
      });
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      const msg = await message.reply({
        content: `${message.author}`,
        embeds: [noPermissionEmbed],
      });
      message.delete();
      setTimeout(() => msg.delete(), 10000);
      return;
    }

    const userToBan =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!userToBan) {
      const incompleteEmbed = new MessageEmbed()
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
      return message.channel.send({
        content: `${message.author}`,
        embeds: [incompleteEmbed],
      });
    }

    let reason = args.slice(1).join(" ") || "Sem Motivo";

    let degabrielofisetchannel = new MessageEmbed()
      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Este servidor não setou nenhum canal de banimentos!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    const channelID = db.get(`${message.guild.id}_channelID`);
    if (!channelID) {
      return message

        .reply({
          content: `${message.author}`,
          embeds: [degabrielofisetchannel],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    }

    const channel = message.guild.channels.cache.get(channelID);
    if (!channel) {
      return message

        .reply({
          content: `${message.author}`,
          embeds: [degabrielofisetchannel],
        })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    }

    const clearButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("sim")
        .setLabel("Sim")
        .setStyle("SUCCESS"),
      new MessageButton().setCustomId("nao").setLabel("Não").setStyle("DANGER")
    );

    const banConfirmationEmbed = new MessageEmbed()
      .setTitle("<a:Sirene:1214051670343028776> CONFIRME O BANIMENTO")
      .setColor("#471515")
      .setThumbnail(message.author.displayAvatarURL({ format: "png" }))
      .setDescription(
        `<:Faixa:1214053411218268160> Você deseja banir ${userToBan} do servidor?\n<:Faixa:1214053411218268160> ID: \`${userToBan.id}\`\n<:Faixa:1214053411218268160> Confirme com: \`Sim!\`\n <:Faixa:1214053411218268160> Recuse com: \`Não\``
      )
      .setFooter(
        `Comando requisitado por: ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTimestamp();

    const sentMessage = await message.channel.send({
      embeds: [banConfirmationEmbed],
      components: [clearButton],
    });

    const collector = sentMessage.createMessageComponentCollector({
      componentType: "BUTTON",
      time: 30000,
    });

    collector.on("collect", async (interaction) => {
      const noAdminPermissionEmbed = new MessageEmbed()
        .setDescription(
          "<a:Incorreto:1214051678089777212>**| Apenas Administradores podem limpar o chat!**"
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      if (!interaction.memberPermissions.has("ADMINISTRATOR")) {
        const msg = await interaction.reply({
          content: `${interaction.user}`,
          embeds: [noAdminPermissionEmbed],
          ephemeral: true,
        });

        setTimeout(() => msg.delete(), 10000);
        return;
      }

      if (interaction.customId === "sim") {
        const successEmbed = new MessageEmbed()
          .setTitle(
            "<a:Correto:1214051675166478377> **| Banimento realizado com sucesso!**"
          )
          .setColor("GREEN")
          .setFooter(`Comando realizado por: ${message.author.tag}`)
          .setTimestamp();

        try {
          const channel = message.guild.channels.cache.get(channelID);
          if (!channel) {
            const noBanChannelEmbed = new MessageEmbed()
              .setDescription(
                "<a:Incorreto:1214051678089777212>**| O canal de banimentos configurado não existe!**"
              )
              .setFooter(`Requisitado por: ${message.author.tag}`)
              .setColor("RED");

            sentMessage.edit({
              content: `${message.author}`,
              embeds: [noBanChannelEmbed],
              components: [],
            });

            return;
          }

          await userToBan.ban({
            reason: reason,
          });

          const banMsgEmbed = new MessageEmbed()
            .setTitle("<:punido:1214053415244660787> Usuário punido!")
            .setColor("RED")
            .setThumbnail(userToBan.user.displayAvatarURL({ format: "png" }))
            .setFooter(
              `Comando requisitado por: ${message.author.tag}`,
              message.author.displayAvatarURL({ format: "png" })
            )
            .setTimestamp()
            .addFields(
              {
                name: "<:Faixa:1214053411218268160> Usuário banido:",
                value: `Nick: ${userToBan.user.tag}\n ID: \`${userToBan.id}\``,
                inline: true,
              },
              {
                name: "<:Faixa:1214053411218268160> Banido por:",
                value: `Nick: ${message.author.tag}\n ID: \`${message.author.id}\``,
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

          channel.send({ embeds: [banMsgEmbed] });

          sentMessage.edit({
            content: `${message.author}`,
            embeds: [successEmbed],
            components: [],
          });
        } catch (error) {
          const errorEmbed = new MessageEmbed()
            .setDescription(
              "<a:Incorreto:1214051678089777212>**| Ocorreu um erro ao realizar o banimento!**"
            )
            .setFooter(`Requisitado por: ${message.author.tag}`)
            .setColor("RED");

          sentMessage.edit({
            content: `${message.author}`,
            embeds: [errorEmbed],
            components: [],
          });
        }
      } else if (interaction.customId === "nao") {
        const cancelEmbed = new MessageEmbed()
          .setDescription(
            "<a:Incorreto:1214051678089777212>**| Você cancelou a ação de Banimento!**"
          )
          .setFooter(`Requisitado por: ${message.author.tag}`)
          .setColor("RED");

        await interaction.reply({
          content: `${interaction.user}`,
          embeds: [cancelEmbed],
          ephemeral: true,
        });

        setTimeout(() => sentMessage.delete(), 5000);
      }
    });
  },
};
