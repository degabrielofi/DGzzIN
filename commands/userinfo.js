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
  switch (baliza_user.presence.status) {
    case "online":
      status = "Online";
      break;
    case "dnd":
      status = "Não Pertubar";
      break;
    case "idle":
      status = "Ausente";
      break;
    case "offline":
      status = "Offline";
      break;
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
        )
          .startOf("Day")
          .toNow()}\``,
        inline: true,
      },
      {
        name: `\\🌟 Entrou em:`,
        value: `\`${moment(Membro.joinedAt).format("DD/MM/YYYY")} ${moment(
          Membro.joinedAt
        )
          .startOf("Day")
          .toNow()}\``,
        inline: true,
      },
      {
        name: "\\👥 Autor do comando:",
        value: `\`${message.author.tag}\``,
        incline: true,
      }
    );

  message
    .reply({ content: `${message.author}`, embeds: [degabrielofiembed] })
    .then((msg) => {
      msg.react("⏪");
      msg.react("⏩");
      let filtro_1 = (r, u) =>
        r.emoji.name === "⏪" && u.id === message.author.id;
      let coletor_1 = msg.createReactionCollector({ filter: filtro_1 });
      let filtro_2 = (r, u) =>
        r.emoji.name === "⏩" && u.id === message.author.id;
      let coletor_2 = msg.createReactionCollector({ filter: filtro_2 });

      coletor_1.on("collect", (degabrielofi) => {
        degabrielofi.users.remove(message.author.id);

        let degabrielofiembed = new Discord.MessageEmbed()
          .setAuthor(
            `${user.username} 🕵️`,
            user.displayAvatarURL({ dynamic: true })
          )
          .setFooter(`Page 1 / 2`)
          .setColor("BLUE")
          .setThumbnail(avatar)
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
              )
                .startOf("Day")
                .toNow()}\``,
              inline: true,
            },
            {
              name: `\\🌟 Entrou em:`,
              value: `\`${moment(Membro.joinedAt).format(
                "DD/MM/YYYY"
              )} ${moment(Membro.joinedAt).startOf("Day").toNow()}\``,
              inline: true,
            },
            {
              name: "\\👥 Autor do comando:",
              value: `\`${message.author.tag}\``,
              incline: true,
            }
          );

        msg.edit({ content: `${message.author}`, embeds: [degabrielofiembed] });
      });

      coletor_2.on("collect", (degabrielofi) => {
        degabrielofi.users.remove(message.author.id);

        const degabrielofiuser2 = new Discord.MessageEmbed()
          .setAuthor(
            `${user.username} 🕵️`,
            user.displayAvatarURL({ dynamic: true })
          )
          .setFooter(`Page 2 / 2`)
          .setColor("BLUE")
          .setThumbnail(avatar)
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
              incline: true,
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

        msg.edit({ content: `${message.author}`, embeds: [degabrielofiuser2] });
      });
    });
};
