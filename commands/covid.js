const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "corona",
  category: "extra",
  run: async (client, message, args) => {
    const baseUrl = "https://disease.sh/v3/covid-19";

    let url, response, corona;

    try {
      url = args[0] ? `${baseUrl}/countries/${args[0]}` : `${baseUrl}/all`;
      response = await axios.get(url);
      corona = response.data;
    } catch (error) {
      let degabrielofierr = new MessageEmbed()
        .setDescription(
          `<a:Incorreto:940987809299316816>**| Este País não existe ou os dados não estão sendo coletados!**`
        )
        .setFooter(`Requisitado por: ${message.author.tag}`)
        .setColor("RED");

      return message
        .reply({ content: `${message.author}`, embeds: [degabrielofierr] })
        .then((msg) => {
          message.delete();
          setTimeout(() => msg.delete(), 10000);
        });
    }

    const embed = new MessageEmbed()
      .setTitle(
        args[0]
          ? `<:Covid19:935652863097589811> COVID-19 NO ${args[0].toUpperCase()}`
          : " <:Covid19:935652863097589811> TOTAL DE CASOS DE COVID-19 NO MUNDO"
      )
      .setColor("#471516")
      .setThumbnail(
        args[0]
          ? corona.countryInfo.flag
          : "https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif"
      )
      .setTimestamp()
      .setFooter(
        `Autor do comando ${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png" })
      )
      .addFields(
        {
          name: "<:Vermelho:935650659980677160> Total De Casos:",
          value: `\`(${corona.cases.toLocaleString()})\``,
          inline: true,
        },
        {
          name: "<:Vermelho:935650659980677160> Total De Mortes:",
          value: `\`(${corona.deaths.toLocaleString()})\``,
          inline: true,
        },
        {
          name: "<:Disponivel:935650640129048637> Total De Recuperações:",
          value: `\`(${corona.recovered.toLocaleString()})\``,
          inline: true,
        },
        {
          name: "<:Vermelho:935650659980677160> Casos Ativos:",
          value: `\`(${corona.active.toLocaleString()})\``,
          inline: true,
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true,
        },
        {
          name: "<:Vermelho:935650659980677160> Casos Críticos:",
          value: `\`(${corona.critical.toLocaleString()})\``,
          inline: true,
        },
        {
          name: "<:Disponivel:935650640129048637> Recuperações De Hoje:",
          value: `\`(${corona.todayRecovered
            .toLocaleString()
            .replace("-", "")})\``,
          inline: true,
        },
        {
          name: "<:Vermelho:935650659980677160> Mortes De hoje:",
          value: `\`(${corona.todayDeaths.toLocaleString()})\``,
          inline: true,
        }
      );

    message.channel.send({ content: `${message.author}`, embeds: [embed] });
  },
};
