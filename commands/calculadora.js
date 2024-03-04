const Discord = require("discord.js");

module.exports = {
  name: "calculadora",
  aliases: ["cal", "calc"],
  description: "Uma calculadora",

  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const NOW = Date.now();

    const comp = (state) => [
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton({
          customId: "fewkjn",
          style: "SECONDARY",
          label: "឵",
          disabled: true,
        }),
        new Discord.MessageButton({
          customId: "reawvfjb hg",
          style: "SECONDARY",
          label: "឵",
          disabled: true,
        }),
        new Discord.MessageButton({
          customId: "back",
          label: "back",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "del",
          label: "del",
          style: "SECONDARY",
          disabled: state,
        })
      ),
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton({
          customId: "7",
          label: "7",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "8",
          label: "8",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "9",
          label: "9",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "+",
          label: "+",
          style: "PRIMARY",
          disabled: state,
        })
      ),
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton({
          customId: "4",
          label: "4",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "5",
          label: "5",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "6",
          label: "6",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "-",
          label: "-",
          style: "PRIMARY",
          disabled: state,
        })
      ),
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton({
          customId: "1",
          label: "1",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "2",
          label: "2",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "3",
          label: "3",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "*",
          label: "x",
          style: "PRIMARY",
          disabled: state,
        })
      ),
      new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton({
          customId: "0",
          label: "0",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: ".",
          label: ".",
          style: "SECONDARY",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "=",
          label: "=",
          style: "SUCCESS",
          disabled: state,
        }),
        new Discord.MessageButton({
          customId: "/",
          label: "/",
          style: "PRIMARY",
          disabled: state,
        })
      ),
    ];

    let string;

    const emb = new Discord.MessageEmbed({
      color: "BLUE",
      title: "__Calculadora__" + "‎ ".repeat(106),
      timestamp: NOW,
      footer: {
        icon_url: client.user.avatarURL(),
        text: client.user.username,
      },
    });

    const msg = await message.reply({
      content: `<@!${message.author.id}>`,
      components: comp(false),
      embeds: [emb.setDescription(`\`\`\`‎ \`\`\``)],
    });

    const col = (await msg).createMessageComponentCollector({
      componentType: "BUTTON",
      time: 240000,
    });

    col.on("collect", async (c) => {
      c.deferUpdate();

      if (c.user.id !== message.author.id)
        return c.followUp({
          content:
            client.e +
            "  **-**  apenas <@!" +
            message.author.id +
            "> pode usar esses botões!",
          ephemeral: true,
        });

      if (c.customId === "1") {
        if (string == null) {
          string = `1`;
        } else {
          string = `${string + "1"}`;
        }
      } else if (c.customId === "2") {
        if (string == null) {
          string = `2`;
        } else {
          string = `${string + "2"}`;
        }
      } else if (c.customId === "3") {
        if (string == null) {
          string = "3";
        } else {
          string = `${string + "3"}`;
        }
      } else if (c.customId === "4") {
        if (string == null) {
          string = "4";
        } else {
          string = `${string + "4"}`;
        }
      } else if (c.customId === "5") {
        if (string == null) {
          string = "5";
        } else {
          string = `${string + "5"}`;
        }
      } else if (c.customId === "6") {
        if (string == null) {
          string = "6";
        } else {
          string = `${string + "6"}`;
        }
      } else if (c.customId === "7") {
        if (string == null) {
          string = "7";
        } else {
          string = `${string + "7"}`;
        }
      } else if (c.customId === "8") {
        if (string == null) {
          string = "8";
        } else {
          string = `${string + "8"}`;
        }
      } else if (c.customId === "9") {
        if (string == null) {
          string = "9";
        } else {
          string = `${string + "9"}`;
        }
      } else if (c.customId === "0") {
        if (string == null) {
          string = "0";
        } else {
          string = `${string + "0"}`;
        }
      } else if (c.customId === "+") {
        if (string == null) {
          string = " + ";
        } else {
          string = `${string + " + "}`;
        }
      } else if (c.customId === "-") {
        if (string == null) {
          string = " - ";
        } else {
          string = `${string + " - "}`;
        }
      } else if (c.customId === "*") {
        if (string == null) {
          string = " * ";
        } else {
          string = `${string + " * "}`;
        }
      } else if (c.customId === "/") {
        if (string == null) {
          string = " / ";
        } else {
          string = `${string + " / "}`;
        }
      } else if (c.customId === "del") {
        string = "‎ ";
      } else if (c.customId === "back") {
        if (string.endsWith(" ")) {
          string = string.slice(0, -3);
        } else {
          string = string.slice(0, -1);
        }
      } else if (c.customId === "=") {
        if (string) {
          try {
            const result = await eval(string);

            let output = result;

            if (typeof result === "string") {
              output = require("util").inspect(result);
            }

            string = `${string.toString()} = ${output}`;
          } catch (e) {
            string = string;
          }
        }
      }

      msg.edit({
        embeds: [emb.setDescription(`\`\`\`${string}\`\`\``)],
      });
    });

    col.on("end", async () => {
      msg.edit({
        components: comp(true),
        embeds: [
          emb
            .setDescription(`\`\`\`O tempo acabou!\`\`\``)
            .setTimestamp(Date.now()),
        ],
      });
    });
  },
};
