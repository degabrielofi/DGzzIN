const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
 name: "avatar",
 run: async (client, message, args) => {
let user = message.mentions.users.first() || message.author
let embed = new MessageEmbed()
.setTitle(`:frame_photo: DGzzIN ツ User `)
.setDescription(`**[Avatar de ${user.tag}](${user.avatarURL()})**`)
.setColor("RANDOM")
.setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
.setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png" }))
let button = new MessageActionRow()
   
message.reply({  content: `${message.author}`, embeds: [embed]})
 }
} 