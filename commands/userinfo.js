const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("pt-br");

module.exports = {
  name: "userinfo",
  aliases: [""],
};

module.exports.run = async (client, message, args) => {
  const baliza_user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;

  function getStatusFromPresence(presence) {
    const activities = presence?.activities || [];
    if (activities.length > 0) {
      return activities[0].type === "CUSTOM_STATUS"
        ? activities[0].state
        : activities[0].name || "Online";
    } else {
      switch (presence?.status) {
        case "online":
          return "Online";
        case "dnd":
          return "Não Perturbar";
        case "idle":
          return "Ausente";
        case "offline":
          return "Offline";
        default:
          return "Desconhecido";
      }
    }
  }

  const getStatus = (user) => {
    const userPresence = user.presence;
    return userPresence ? getStatusFromPresence(userPresence) : "Desconhecido";
  };

  const flags = {
    DISCORD_EMPLOYEE: "Empregado do Discord",
    DISCORD_PARTNER: "Parceiro do Discord",
    BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
    BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
    HYPESQUAD_EVENTS: "Eventos HypeSquad",
    HOUSE_BRAVERY: "Bravery HypeSquad",
    HOUSE_BRILLIANCE: "Brilliance HypeSquad",
    HOUSE_BALANCE: "Balance HypeSquad",
    EARLY_SUPPORTER: "Apoiante Inicial",
    TEAM_USER: "Usuário da Equipe",
    SYSTEM: "Sistema",
    VERIFIED_BOT: "Bot Verificado",
    VERIFIED_DEVELOPER: "Desenvolvedor de Bot Verificado",
  };

  const user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.author;
  const Membro = message.guild.members.cache.get(user.id);
  const member = message.mentions.members.last() || message.member;
  const avatar = user.displayAvatarURL({ dynamic: true });

  const degabrielofiembed = new MessageEmbed()
    .setAuthor(`${user.username} 🕵️`, avatar)
    .setFooter(`Page 1 / 2`)
    .setThumbnail(avatar)
    .setColor("#3498db")
    .setTimestamp()
    .addFields(
      {
        name: `\\#️⃣ Tag do discord:`,
        value: `\`${user.tag}\``,
        inline: true,
      },
      {
        name: `\\🆔 ID:`,
        value: `\`${user.id}\``,
        inline: true,
      },
      {
        name: `\\💤 Status:`,
        value: `\`${getStatus(baliza_user)}\``,
        inline: true,
      },
      {
        name: "\u200b",
        value: `\u200b`,
        inline: true,
      },
      {
        name: `\\📅 Data de criação:`,
        value: `\`${moment(user.createdAt).format("DD/MM/YYYY")} ${moment(
          user.createdAt
        ).fromNow()}\``,
        inline: true,
      },
      {
        name: `\\🌟 Entrou em:`,
        value: `\`${moment(Membro.joinedAt).format("DD/MM/YYYY")} ${moment(
          Membro.joinedAt
        ).fromNow()}\``,
        inline: true,
      },
      {
        name: "\\👥 Autor do comando:",
        value: `\`${message.author.tag}\``,
        inline: true,
      }
    );

  const degabrielofiembed2 = new MessageEmbed()
    .setAuthor(`${user.username} 🕵️`, avatar)
    .setFooter(`Page 2 / 2`)
    .setThumbnail(avatar)
    .setColor("#3498db")
    .setTimestamp()
    .addFields(
      {
        name: `\\📸 Avatar:`,
        value: `**[Clique aqui](${member.user.displayAvatarURL({
          dynamic: true,
        })})**`,
        inline: true,
      },
      {
        name: `\\🛡️ Emblema:`,
        value: `\`${
          member.user.flags.toArray().length
            ? member.user.flags
                .toArray()
                .map((flag) => flags[flag])
                .join(", ")
            : "None"
        }\``,
        inline: true,
      },
      {
        name: `\\🎮 Atividade:`,
        value: `\`(${
          baliza_user.presence?.activities[0]
            ? baliza_user.presence.activities[0].name
            : `O usuário não está fazendo nada no momento!`
        })\``,
        inline: true,
      },
      {
        name: "\\👥 Autor do comando:",
        value: `\`${message.author.tag}\``,
        inline: true,
      },
      {
        name: `\\💼 Cargos:`,
        value: `${Membro.roles.cache
          .map((r) => `${r}`)
          .join(" ")
          .replace("@everyone", " ")}`,
        inline: true,
      }
    );

  const pages = [degabrielofiembed, degabrielofiembed2];
  let currentPage = 0;

  const msg = await message.reply({
    content: `${message.author}`,
    embeds: [pages[currentPage]],
    components: [getPageButtons()],
  });

  const collector = msg.createMessageComponentCollector({
    componentType: "BUTTON",
    time: 60000,
  });

  collector.on("collect", async (interaction) => {
    if (interaction.customId === "previous") {
      currentPage = (currentPage - 1 + pages.length) % pages.length;
    } else if (interaction.customId === "next") {
      currentPage = (currentPage + 1) % pages.length;
    }

    await interaction.update({
      embeds: [pages[currentPage]],
      components: [getPageButtons()],
    });
  });

  function getPageButtons() {
    return new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("previous")
        .setLabel("Página Anterior")
        .setStyle("PRIMARY")
        .setDisabled(currentPage === 0),
      new MessageButton()
        .setCustomId("next")
        .setLabel("Próxima Página")
        .setStyle("PRIMARY")
        .setDisabled(currentPage === pages.length - 1)
    );
  }
};
