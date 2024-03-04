const Discord = require("discord.js");

module.exports = {
  name: "coinflip",
  aliases: [""],
  run: async (client, message, args) => {
    let lados = ["cara", "coroa"];
    let resposta = lados[Math.floor(Math.random() * lados.length)];

    if (!args[0] || (args[0] !== "cara" && args[0] !== "coroa")) {
      message.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setAuthor(
              "COMANDO: CARA OU COROA",
              "https://i.imgur.com/0b6Ohrl.png"
            )
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
                  "Utilize este comando para jogar cara ou coroa comigo. Escreva com `d$coinflip (cara/coroa).`",
                inline: true,
              },
              {
                name: "<:Sinonimos:1214053417933340692> Sinônimos:",
                value: "`d$coinflip` `d$caraoucoroa`",
                inline: true,
              }
            ),
        ],
      });
    } else {
      message.reply(`\\💱 **Jogando a moeda para o alto...**`).then((msg) => {
        setTimeout(() => {
          if (resposta === "cara") {
            if (args[0] === "cara") {
              msg.edit(
                `\\💱 **Cara**! Parabéns ${message.author}, Você ganhou!`
              );
            } else if (args[0] === "coroa") {
              msg.edit(`\\💱 **Cara**! ${message.author} Eu ganhei dessa vez!`);
            }
          } else if (resposta === "coroa") {
            if (args[0] === "coroa") {
              msg.edit(
                `\\💱 **Coroa**! Parabéns ${message.author}, Você ganhou!`
              );
            } else if (args[0] === "cara") {
              msg.edit(
                `\\💱 **Coroa**! ${message.author} Eu ganhei dessa vez!`
              );
            }
          }
        }, 2000);
      });
    }
  },
};
