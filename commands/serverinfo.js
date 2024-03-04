const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = {
  name: "teste",
  aliases: [""],
};

module.exports.run = async (client, message, args) => {
  let cargos = message.guild.roles.cache.size;

  let data = message.guild.createdAt.toLocaleDateString("pt-br");

  let dono = await message.guild.fetchOwner();

  const { guild, author } = message;
  const voiceChannels = message.guild.channels.cache.filter(
    (c) => c.type === "GUILD_VOICE"
  );
  let count = 0;
  let count2 = 0;

  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  for (const [id, voiceChannel] of voiceChannels)
    count2 += voiceChannel.members.filter((m) => m.user.bot).size;

  var very = {
    LOW: "Abaixo",
    NONE: "Nenhum",
    Medium: "Médio",
    HIGH: "Alto",
    HIGHEST: "Mais Alto",
  };

  let degabrielofiembed = new Discord.MessageEmbed()
    .setTitle(
      `<:Discord:1214053845827846144> ${message.guild.name} (\`${message.guild.id}\`)`
    )
    .setFooter(
      `Autor do comando ${message.author.tag}`,
      message.author.displayAvatarURL({ format: "png" })
    )
    .setColor("BLUE")
    .setThumbnail(`${message.guild.iconURL({ dynamic: true, size: 2048 })}`)
    .setTimestamp()
    .addFields(
      {
        name: `\\👑 Dono:`,
        value: `(\`${dono.user.tag}\`) \n (\`${message.guild.ownerId} \`)`,
        inline: true,
      },
      {
        name: `\\👥 Membros:`,
        value: `(\`Total: ${
          message.guild.memberCount
        }\`) \n (\`Em Call: ${count}\`) \n (\`Bots: ${
          message.guild.members.cache.filter((m) => m.user.bot).size
        }\`) \n (\`Bots em call: ${count2}\`)`,
        inline: true,
      },
      {
        name: `\\📦 Canais:`,
        value: `(\`Total: ${message.guild.channels.cache.size}\`) \n (\`Voz: ${
          message.guild.channels.cache.filter((x) => x.type == "GUILD_VOICE")
            .size
        }\`) \n (\`Texto: ${
          message.guild.channels.cache.filter((x) => x.type == "GUILD_TEXT")
            .size
        }\`) \n (\`Categorias: ${
          message.guild.channels.cache.filter((x) => x.type == "GUILD_CATEGORY")
            .size
        }\``,
        inline: true,
      },
      {
        name: `\\📅 Data de criação:`,
        value: `(\`${data}\`)`,
        inline: true,
      },
      {
        name: `\\📜 Cargos totais:`,
        value: `(\`${cargos}\`)`,
        inline: true,
      },
      {
        name: `\\🌎 País:`,
        value: `(\`${message.guild.region}\`)`,
        inline: true,
      },
      {
        name: `\\🔎 Verificação:`,
        value: `(\`${very[message.guild.verificationLevel]}\`)`,
        inline: true,
      },

      {
        name: `\\🌟 Emojis:`,
        value: `(\`${message.guild.emojis.cache.size}\`)`,
        inline: true,
      },
      {
        name: `<a:Boost:1214051673513922640> Boosts:`,
        value: `(\`${
          message.guild.premiumSubscriptionCount || "Não há impulsões"
        }\`)`,
        inline: true,
      }
    );

  message
    .reply({ content: `${message.author}`, embeds: [degabrielofiembed] })
    .then((msg) => {
      msg.react("🆗");
    });
};
