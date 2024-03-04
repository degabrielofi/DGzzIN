const Color = "#3498db";
const Discord = require("discord.js");

module.exports = {
  name: "stonks",
  category: "Image",
  
  run: async (client, message, args) => {
    
    let degabrielofiembed = new Discord.MessageEmbed()
    .setAuthor('COMANDO: REPORTAR BUG', 'https://i.imgur.com/0b6Ohrl.png')
    .setThumbnail("https://i.imgur.com/zNE1IMO.png")
    .setTimestamp()
    .setFooter(`Autor do comando DGzzIN ツ#8714`, 'https://i.imgur.com/zNE1IMO.png')
    .setColor('#471516')
    .addFields(
      {
        name: "<:Descricao:933441130886991945> Descrição:",
        value: "Utilize este comando para reportar um bug sobre mim, a o meu desenvolvedor. Escreva com `d$reportarbug (Bug).`",
        inline: true
      },
      {
        name: "<:Sinonimos:933441130551468043> Sinônimos:",
        value: "`d$reportbug` `repbug` `d$reportarbug`",
        inline: true
    },
    {
        name: '\u200b',
        value: `\u200b`,
        inline: true
    },
      {
        name: "<:Exemplos:933441131193180170> Exemplos:",
        value: "`d$reportbug Tal comando está bugado.`",
        inline: true
      }
  )

    message.channel.send({embeds: [degabrielofiembed]});
  }
};


