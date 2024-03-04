const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  author: "degabrielofi",
};

module.exports.run = (client, message, args) => {
  let embed = new MessageEmbed()
    .setAuthor("Painel De Ajuda", "https://i.imgur.com/kGqw2VH.png")
    .setImage("https://i.imgur.com/zNE1IMO.png")
    .setDescription(
      `\\👥 Olá  **${message.author.tag}**, eu sou o DGzzIN ツ, o seu BOT para o Discord com múltiplas funções úteis para deixar seu servidor divertido!\n\n **Links importantes:**\n<:Faixa:1214053411218268160> [**Servidor DGzzIN ツ**](https://discord.gg/V6tUW4CE7D)\n<:Faixa:1214053411218268160> [**Veja meu site**](https://dgzzinbot.netlify.app/)\n<:Faixa:1214053411218268160> [**Me adicione em seu servidor**](https://discord.com/oauth2/authorize?client_id=844065812355612702&permissions=8&scope=bot)\n\n **Um dos meus objetivos e deixa os moderadores e os membros do seu servidor felizes, trago comandos de Diversão, Moderação, Informações, Utilidades entre muitas outras coisas, me adicione no seu servidor e se divirte-se! **`
    )
    .setFooter(
      `Comando requisitado por: ${message.author.tag}`,
      message.author.displayAvatarURL({ format: "png" })
    )
    .setColor("#471515")
    .setTimestamp();

  message.reply({ embeds: [embed] });
};
