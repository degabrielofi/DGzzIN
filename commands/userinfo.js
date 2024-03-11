const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-br");
const now = moment();

module.exports = {
  name: "userinfo",
  aliases: [""],
};

module.exports.run = (client, message, args) => {
  let baliza_user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;

  let status;
  if (baliza_user) {
    const userPresence = baliza_user.presence;

    if (userPresence && userPresence.status) {
      status = getStatusFromPresence(userPresence) || "Offline";
    } else {
      status = "Desconhecido";
    }
  } else {
    status = "Desconhecido";
  }

  // Função auxiliar para obter o status apropriado
  function getStatusFromPresence(presence) {
    const activities = presence.activities;
    if (activities.length > 0) {
      return activities[0].type === "CUSTOM_STATUS"
        ? activities[0].state
        : activities[0].name;
    } else {
      switch (presence.status) {
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
  const data = user.createdAt.toLocaleDateString("pt-br");
  const avatar = user.displayAvatarURL({ dynamic: true });
  const userFlags = member.user.flags.toArray();

  let degabrielofiembed = new Discord.MessageEmbed()
    .setAuthor(`${user.username} 🕵️`, user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Page 1 / 2`)
    .setThumbnail(avatar)
    .setColor("BLUE")
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
        value: `\`${status}\``,
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

  message
    .reply({ content: `${message.author}`, embeds: [degabrielofiembed] })

    .then(async (msg) => {
      const pages = [
        {
          author: `${user.username} 🕵️`,
          footer: "Page 1 / 2",
          color: "BLUE",
          thumbnail: avatar,
          timestamp: true,
          fields: [
            {
              name: `\\#️⃣ Tag do discord:`,
              value: `\`${user.tag}\``,
              inline: true,
            },
            { name: `\\🆔 ID:`, value: `\`${user.id}\``, inline: true },
            { name: `\\💤 Status:`, value: `\`${status}\``, inline: true },
            { name: "\u200b", value: `\u200b`, inline: true },
            {
              name: `\\📅 Data de criação:`,
              value: `\`${moment(user.createdAt).format("DD/MM/YYYY")} ${moment(
                user.createdAt
              ).fromNow()}\``,
              inline: true,
            },
            {
              name: `\\🌟 Entrou em:`,
              value: `\`${moment(Membro.joinedAt).format(
                "DD/MM/YYYY"
              )} ${moment(Membro.joinedAt).fromNow()}\``,
              inline: true,
            },
            {
              name: "\\👥 Autor do comando:",
              value: `\`${message.author.tag}\``,
              inline: true,
            },
          ],
        },
        {
          author: `${user.username} 🕵️`,
          footer: "Page 2 / 2",
          color: "BLUE",
          thumbnail: avatar,
          timestamp: true,
          fields: [
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
                userFlags.length
                  ? userFlags.map((flag) => flags[flag]).join(", ")
                  : "None"
              }\``,
              inline: true,
            },
            {
              name: `\\🎮 Atividade:`,
              value: `\`(${
                baliza_user.presence.activities[0]
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
            },
          ],
        },
      ];

      let currentPage = 0;

      const updateEmbed = async () => {
        const page = pages[currentPage];
        const embed = new Discord.MessageEmbed()
          .setAuthor(page.author, user.displayAvatarURL({ dynamic: true }))
          .setFooter(page.footer)
          .setColor(page.color)
          .setThumbnail(page.thumbnail)
          .setTimestamp(page.timestamp);

        embed.addFields(...page.fields);

        await msg.edit({ content: `${message.author}`, embeds: [embed] });
      };

      await msg.react("⏪");
      await msg.react("⏩");

      const filter = (reaction, user) => {
        return (
          ["⏪", "⏩"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      const collector = msg.createReactionCollector({
        filter,
        time: 60000, // Tempo limite em milissegundos (60 segundos neste caso)
      });

      collector.on("collect", async (reaction, user) => {
        reaction.users.remove(user.id);

        if (reaction.emoji.name === "⏪") {
          currentPage = (currentPage - 1 + pages.length) % pages.length;
        } else if (reaction.emoji.name === "⏩") {
          currentPage = (currentPage + 1) % pages.length;
        }

        await updateEmbed();
      });

      collector.on("end", () => {
        msg.reactions
          .removeAll()
          .catch((error) => console.error("Failed to clear reactions:", error));
      });

      await updateEmbed();
    });
};
