const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  author: "Nick",

  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    let data = user.createdAt.toLocaleDateString("pt-br");
    let avatar = user.displayAvatarURL({ dynamic: true });

    let embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name}`, client.user.avatarURL())
      .setThumbnail("https://i.imgur.com/zNE1IMO.png")
      .setColor("#471515")
      .setTimestamp()
      .setFooter(
        `Autor do comando ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setAuthor("Informações sobre mim:", "https://i.imgur.com/kGqw2VH.png")
      .setDescription(
        `\\👥 Olá  **${message.author.tag}**, eu sou o DGzzIN ツ, o seu BOT para o Discord com múltiplas funções úteis para deixar seu servidor divertido!\n\n **Links importantes:**\n[<:Faixa:1214053411218268160> **Servidor DGzzIN ツ**](https://discord.com/invite/5nu3S8Zx6A)\n[<:Faixa:1214053411218268160> **Veja meu site**](https://dgzzinbot.netlify.app/)\n[<:Faixa:1214053411218268160> **Me adicione em seu servidor**](https://discord.com/oauth2/authorize?client_id=844065812355612702&permissions=8&scope=bot)\n\n **Um dos meus objetivos e deixa os moderadores e os membros do seu servidor felizes, trago comandos de Diversão, Moderação, Informações, Utilidades entre muitas outras coisas, me adicione no seu servidor e se divirte-se! **`
      )
      .addFields(
        {
          name: "\\📋 Informações ",
          value: `> <:DGzzIN:1214053375750963221> Meu nome: ${client.user}
                > <:developer:1214053387818110996> Meu desenvolvedor: <@!812911319695097856>
                > <:ping:1214053840362414097> Meu ping: \`${client.ws.ping}ms\`
                > \\⌨️ Meu prefixo: \`d$\``,
          inline: false,
        },
        {
          name: "\\📊 Estatísticas",
          value: `> \\🎮 Estou em \`${client.guilds.cache.size}\` servidores.
                > \\👥 Administro \`${client.users.cache.size}\` usuários.
                > \\⚙️ Tenho \`75\` comandos.`,
          inline: false,
        },
        {
          name: "<:Card:1214053844099792926> Outras Informações",
          value: `> \\🆔 Meu id: \`844065812355612702\`
                > \\📅 Data de criação: \`18/05/2021\`
                > <:JavaScript:1214053408705613834> Fui programado em: \`JavaScript\`
                > <:DiscordJS:1216229350408585216> Utilizei a livraria: \`Discord.js\`
                > \\📲 Estou hospedado na: \`DeGabrielDEV\``,
          inline: false,
        }
      );

    message.reply({ content: `${message.author}`, embeds: [embed] });
  },
};
