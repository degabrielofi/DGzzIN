const weather = require("weather-js");
const Discord = require("discord.js");
exports.run = (client, message, args) => {
  if (args.length < 1) {
    let degabrielofilocal = new Discord.MessageEmbed()

      .setDescription(
        `<a:Incorreto:1214051678089777212>**| Você precisa digitar o local!**`
      )
      .setFooter(`Requisitado por: ${message.author.tag}`)
      .setColor("RED");

    message.channel
      .send({ content: `${message.author}`, embeds: [degabrielofilocal] })
      .then((msg) => {
        message.delete();
        setTimeout(() => msg.delete(), 10000);
      });
    return 0;
  }
  weather.find(
    { search: args.join(" "), degreeType: "C", lang: "pt-BR" },
    (err, result) => {
      if (err) throw err;
      result = result[0];
      if (!result) {
        let degabrielofinome = new Discord.MessageEmbed()

          .setDescription(
            `<a:Incorreto:1214051678089777212>**| Fale um local existente, ou coloque o nome corretamente!**`
          )
          .setFooter(`Requisitado por: ${message.author.tag}`)
          .setColor("RED");

        message.channel
          .send({ content: `${message.author}`, embeds: [degabrielofinome] })
          .then((msg) => {
            message.delete();
            setTimeout(() => msg.delete(), 10000);
          });
        return;
      }
      var current = result.current;
      var location = result.location;
      const degabrielofiembed = new Discord.MessageEmbed()
        .setThumbnail("https://i.imgur.com/AWmIYx8.png")
        .setTitle(`Tempo para: ${location.name}.`)
        .setDescription(
          `<:Tempo:1214053614318919750> **Clima:** \`${current.skytext}\``
        )
        .addField(
          "<:Fuso_Horario:1214053403240431656> Fuso horário:",
          `\`UTC${location.timezone >= 0 ? "+" : ""}${location.timezone}\``,
          true
        )
        .addField(
          "<:Tipo_de_grau:1214053404997984326> Tipo de grau:",
          `\`${location.degreetype}\``,
          true
        )
        .addField(
          "<:Temperatura:1214053398744145990> Temperatura:",
          `\`${current.temperature}° C\``,
          true
        )
        .addField(
          "<:sensacao_termica:1214053397129334824> Sensação térmica:",
          `\`${current.feelslike}° C\``,
          true
        )
        .addField(
          "<:Ventos:1214053395477045258> Ventos:",
          `\`${current.winddisplay}\``,
          true
        )
        .addField(
          "<:Umidade:1214053389776720003> Umidade:",
          `\`${current.humidity}%\``,
          true
        )
        .setColor("#3498db")
        .setFooter(
          `Autor do comando ${message.author.tag}`,
          message.author.displayAvatarURL({ format: "png" })
        )
        .setTimestamp();
      message.channel.send({
        content: `${message.author}`,
        embeds: [degabrielofiembed],
      });
    }
  );
};
exports.help = {
  name: ["clima"],
};
