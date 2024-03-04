const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.MESSAGE_CONTENT,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const config = require("./config.json");
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (
    message.content == `<@${client.user.id}>` ||
    message.content == `<@!${client.user.id}>`
  ) {
    return message.reply(
      `<:DGzzIN:1214053375750963221> **|** Olá ${message.author}, Meu prefixo é \`${config.prefix}\`, veja meus comandos em d$help`
    );
  }

  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase()))
    return;

  const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error("Erro ao executar o comando:", err);

    let degabrielofierr = new Discord.MessageEmbed()
      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Este comando não existe! Veja meus comandos existentes com d$help**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    message
      .reply({ content: `${message.author}`, embeds: [degabrielofierr] })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 10000);
      });
  }
});

client.once("ready", () => {
  console.log("Estou pronto(a) para ser utilizado(a)!");

  let activities = [
    `Use ${config.prefix}help para ver meus comandos!`,
    `💻 | Estou em ${client.guilds.cache.size} servidores!`,
  ];
  let i = 0;

  setInterval(() => {
    client.user.setActivity(`${activities[i++ % activities.length]}`, {
      type: "PLAYING",
    });
  }, 5000);

  client.user.setStatus("online");
  // Restante do código que você deseja executar quando o bot estiver pronto
});

client.login(config.token);

// Comando para ver quando alguem me adiciona em seu servidor!

client.on("guildCreate", async (guild) => {
  let canal = client.guilds.cache
    .get(`937937740018884638`)
    .channels.cache.get(`940288512660500512`); // ID do servidor suporte e ID do chat respectivamente.

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${client.user.username} \🕵️`, client.user.displayAvatarURL())
    .setColor("#471516")
    .setThumbnail("https://i.imgur.com/zNE1IMO.png")
    .setDescription(
      `<a:festa:1214051680774000662> **Fui adicionado em um novo servidor!**`
    )
    .setTimestamp();

  let button = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("1")
      .setEmoji("<:Checklist:1214067201007689818>")
      .setLabel(`Maiores Detalhes`)
      .setStyle("SUCCESS")
  );

  canal.send({ embeds: [embed], components: [button] }).then((msg) => {
    const filter = (i) => {
      return i.isButton() && i.message.id === msg.id;
    };

    const collector = msg
      .createMessageComponentCollector({
        filter: filter,
        time: 60000,
      })
      .on("collect", async (interaction) => {
        switch (interaction.customId) {
          case "1": {
            const embed2 = new Discord.MessageEmbed()
              .setColor("#471516")
              .setAuthor(
                `${client.user.username} \🕵`,
                client.user.displayAvatarURL()
              )
              .setTimestamp()
              .setDescription(`**Detalhes do servidor em que fui adicionado:**`)
              .addFields({
                name: "⠀",
                value: `
                          <:Faixa:1214053411218268160> __Nome:__ \`${
                            guild.name
                          }\`

                          <:Faixa:1214053411218268160> __ID:__ \`${guild.id}\`
                          
                          <:Faixa:1214053411218268160> __Membros:__ \`${
                            guild.members.cache.size
                          }\`
                          
                          <:Faixa:1214053411218268160> __Dono:__ ${await guild.fetchOwner()}
                          
                          <:Faixa:1214053411218268160> __Dono ID:__ \`${
                            guild.ownerId
                          }\``,
              });

            let button_off = new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                .setCustomId("1")
                .setEmoji("<:Checklist:1214067201007689818>")
                .setLabel(`Maiores Detalhes`)
                .setStyle("SUCCESS")
                .setDisabled(true)
            );

            interaction.update({ embeds: [embed2], components: [button_off] });
          }
        }
      });
  });
});

// Comando para ver quando alguem me remove de seu servidor!

client.on("guildDelete", async (guild) => {
  let canal = client.guilds.cache
    .get(`937937740018884638`)
    .channels.cache.get(`940288513444823092`); // ID do servidor suporte e ID do chat respectivamente.

  let embed = new Discord.MessageEmbed()
    .setAuthor(`${client.user.username} \🕵️`, client.user.displayAvatarURL())
    .setColor("#471516")
    .setThumbnail("https://i.imgur.com/zNE1IMO.png")
    .setDescription(
      `<:Caze_190:1214053427009814528> **Fui removido de um servidor!**`
    )
    .setTimestamp();

  let button = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton()
      .setCustomId("1")
      .setEmoji("<:Checklist:1214067201007689818>")
      .setLabel(`Maiores Detalhes`)
      .setStyle("DANGER")
  );

  canal.send({ embeds: [embed], components: [button] }).then((msg) => {
    const filter = (i) => {
      return i.isButton() && i.message.id == msg.id;
    };

    const collector = msg
      .createMessageComponentCollector({
        filter: filter,
        time: 60000,
      })
      .on("collect", async (interaction) => {
        switch (interaction.customId) {
          case "1": {
            const embed2 = new Discord.MessageEmbed()
              .setColor("#471516")
              .setAuthor(
                `${client.user.username} \🕵️`,
                client.user.displayAvatarURL()
              )
              .setDescription(`**Detalhes do servidor no qual fui removido:**`)
              .addFields({
                name: "⠀",
                value: `
                          <:Faixa:1214053411218268160> __Nome:__ \`${
                            guild.name
                          }\`

                          <:Faixa:1214053411218268160> __ID:__ \`${guild.id}\`
                          
                          <:Faixa:1214053411218268160> __Membros:__ \`${
                            guild.members.cache.size
                          }\`
                          
                          <:Faixa:1214053411218268160> __Dono:__ ${await guild.fetchOwner()}
                          
                          <:Faixa:1214053411218268160> __Dono ID:__ \`${
                            guild.ownerId
                          }\``,
              });

            let button_off = new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                .setCustomId("1")
                .setEmoji("<:Checklist:1214067201007689818>")
                .setLabel(`Maiores Detalhes`)
                .setStyle("DANGER")
                .setDisabled(true)
            );

            interaction.update({ embeds: [embed2], components: [button_off] });

            break;
          }
        }
      });
  });
});

// Comando de Logs de Mensagens Editadas!

client.on("messageUpdate", async (message, oldMessage) => {
  let setlogsmsgenv = db.get(`channelLogseditmsg_${message.guild.id}`);
  if (setlogsmsgenv === null) return;

  if (message.author.bot) return;

  let msgchannel = message.channel;
  let msgantiga = message.content;
  let msgeditada = oldMessage.content;

  let embed = new Discord.MessageEmbed()
    .setTitle(`\\🔎 Uma mensagem foi editada!`)
    .setColor("BLUE")
    .addFields({
      name: `\\👥 Autor da mensagem:`,
      value: `${message.author}`,
      inline: false,
    })

    .addFields({
      name: `\\#️⃣ Canal:`,
      value: `${msgchannel}`,
      inline: false,
    })
    .addFields({
      name: `\\📚 Mensagem antiga:`,
      value: `\`\`\`${msgantiga}\`\`\``,
      inline: false,
    })
    .addFields({
      name: `\\📝 Mensagem editada:`,
      value: `\`\`\`${msgeditada}\`\`\``,
      inline: false,
    })
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setFooter({
      text: `${message.guild.name}`,
      iconURL: message.guild.iconURL({ dynamic: true }),
    });

  message.guild.channels.cache.get(setlogsmsgenv).send({ embeds: [embed] });
});

// Comando de Logs para Mensagens Apagadas!

client.on("messageDelete", async (message) => {
  let channelDellogs = db.get(`channelLogs_${message.guild.id}`);
  if (channelDellogs === null) return;

  if (message.author.bot) return;

  let user1 = message.author;
  let channel2 = message.channel;
  let msgDelete = message.content;

  let embed = new Discord.MessageEmbed()
    .setTitle(`\\🚽 Uma mensagem foi excluída!`)
    .setColor("BLUE")
    .addFields({
      name: `\\👥 Autor da mensagem:`,
      value: `${user1}`,
      inline: false,
    })
    .addFields({
      name: `\\#️⃣ Canal:`,
      value: `${channel2}`,
      inline: false,
    })
    .addFields({
      name: `\\📝 Mensagem apagada:`,
      value: `\`\`\`${msgDelete}\`\`\``,
      inline: false,
    })
    .setTimestamp()
    .setFooter({
      text: `${message.guild.name}`,
      iconURL: message.guild.iconURL({ dynamic: true }),
    })
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

  try {
    message.guild.channels.cache.get(channelDellogs).send({ embeds: [embed] });
  } catch (e) {}
});

// Comando de Antilink!

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  let verificando = db.get(`antilink_${message.guild.id}`);
  if (
    !verificando ||
    verificando === "off" ||
    verificando === null ||
    verificando === false
  )
    return;

  if (verificando === "on") {
    let degabrielofiproibido = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você não pode enviar links aqui!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    if (message.member.permissions.has("MANAGE_GUILD")) return;
    if (message.member.permissions.has("ADMINISTRATOR")) return;

    if (
      message.content.includes(
        "https".toLowerCase() ||
          "http".toLowerCase() ||
          "www".toLowerCase() ||
          ".com".toLowerCase() ||
          ".br".toLowerCase()
      )
    ) {
      message.delete();
      message.channel.send({
        content: `${message.author}`,
        embeds: [degabrielofiproibido],
      });
    }
  }
});

process.on("multipleResolves", (type, reason, promise) => {
  console.log(`\n\n🚫 Um erro foi detectado\n\n` + type, promise, reason);
});
process.on("unhandRejection", (reason, promise) => {
  console.log(`\n\n🚫 Um erro foi detectado:\n\n` + reason, promise);
});
process.on("uncaughtException", (error, origin) => {
  console.log(`\n\n🚫 Um erro foi detectado:\n\n` + error, origin);
});
process.on("uncaughtExceptionMonitor", (error, origin) => {
  console.log(`\n\n🚫 Um erro foi detectado:\n\n` + error, origin);
});
