const Discord = require("discord.js");
const settings = require("./../botconfig.json");
const errors = require("./../errors.json")
const errorHandler = require("./../functions/handleError.js")

module.exports.run = async (bot, message, args) => {
if (!message.guild.me.hasPermission("SEND_MESSAGES")) return errorHandler(errors.permission.sendMessages)
let colorChannel = message.guild.channels.find(c=> settings.colorChannels.includes(c.name))
const embed = new Discord.RichEmbed().setTimestamp().setColor(settings.colors.embedDefault)

if (!colorChannel) {
    embed.setDescription(`❌ No Dedicated Color Channels Found!\n\nPlease create a channel under the following names: \n\n${"`"+settings.colorChannels.join('`, `')+"`"}`)
    return message.channel.send(embed).catch(console.error)
}
if (!(message.channel.id === colorChannel.id)) {
    return message.channel.send(`❌ ${message.author}, please go to ${colorChannel} to continue using this command. `).catch(console.error)
}

var i;
var roles =[];
for (i = 0; i < settings.roles.colors.length; i++){
  if (message.member.guild.roles.find(r => r.name === settings.roles.colors[i])){
    roles.push(message.member.guild.roles.find(r => r.name === settings.roles.colors[i]))
  }
}

if (roles.length<1){
  return message.channel.send(`❌ There are no color roles found in this server.`)
}

embed.setDescription(`The following are the available colors for this command:\n\n${roles.join(` • `)}`).setFooter(`Available Colors: ${roles.length}`)
return message.channel.send(embed).catch(console.error)

if (message) {
  message.delete()
}

return;

}



module.exports.help = {
  name: "ac"
  }
