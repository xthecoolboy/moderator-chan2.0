const Discord = require("discord.js");
const settings = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {
let role = message.content.split(/\s+/g).slice(1).join(" ");
let colorRoles = settings.roles.colors;
let colorChannel = message.guild.channels.find(c=> settings.colorChannels.includes(c.name))
let confirmChannel = message.guild.channels.find(c=> settings.confirmChannels.includes(c.name))
let thisBot = message.guild.me

let embed = new Discord.RichEmbed().setTimestamp()

if (!role) {
  embed.setDescription(`❌ Missing Parameters: Please specify the role name. You can check the available roles by typing ${"`"+settings.prefix+"availablecolors`"}`).setColor(settings.colors.red)
  message.channel.send(embed).catch(console.error);
  if (message) message.delete()
  return;
}
if (!colorChannel) {
  embed.setDescription(`❌ No Dedicated Color Channels Found!\n\nPlease create a channel under the following names: \n\n${"`"+settings.colorChannels.join('`, `')+"`"}`).setColor(settings.colors.embedDefault)
  message.channel.send(embed).catch(console.error);
  if (message) message.delete()
  return;
}

if (!confirmChannel) {
  embed.setDescription(`❌ No Dedicated Confirm Channels Found!\n\nPlease create a channel under the following names: \n\n${"`"+settings.confirmChannels.join('`, `')+"`"}`).setColor(settings.colors.embedDefault)
  message.channel.send(embed).catch(console.error);
  if (message) message.delete()
  return;
}

if (!(message.channel.id === colorChannel.id)) {
    message.channel.send(`❌ ${message.author}, please go to ${confirmChannel} to continue using this command. `).catch(console.error)
    if (message) message.delete()
    return;
}


var i;
for (i = 0; i < colorRoles.length; i++){
    if (role.toLowerCase().toString() === (colorRoles[i].toLowerCase().toString())){
      if (message.member.guild.roles.find(r => r.name === colorRoles[i])){
        let memberRole = message.member.guild.roles.find(r => r.name === colorRoles[i]);
        if (thisBot.highestRole.position < memberRole.position) {
          embed.setTitle(`Bot has Insuffecient Permission`).setDescription(`${message.author.username}, The bot cannot perform the color acquisition since it is below the role its trying to add on the role hierarchy. \n\n*(If you're a **moderator**, please move this bot's role above all the color roles.)*`).setColor(settings.colors.red)
          message.channel.send(embed).catch(console.error)
          if (message) message.delete()
          return;
        }
        if (message.member.roles.some(r => colorRoles.includes(r.name))){
          message.member.removeRole(message.member.roles.find(r => colorRoles.includes(r.name))).catch(console.error)
        }
        message.member.addRole(memberRole).catch(console.error);
        embed.setTitle(`**${message.member.displayName}** successfully acquired ${colorRoles[i]} role!`).setColor(settings.colors.green)
        confirmChannel.send(embed).catch(console.error)
        if (message) message.delete()
        return;
    } else {
      embed.setDescription(`No color role found for **${role}**! Please try again`).setColor(settings.colors.red)
      return message.channel.send(embed).catch(console.error);
    }
  }
}

embed.setDescription(`No color role found for **${role}**! Please try again`).setColor(settings.colors.red)
return message.channel.send(embed).catch(console.error);


}


module.exports.help = {
  name: "sc"
  }
