
const Discord = require("discord.js");
const Commando = require('discord.js-commando');
const settings = require('./../botconfig.json');

module.exports.run = async (bot, message, args) => {

const embed = new Discord.RichEmbed()
.setColor(settings.colors.embedDefault)
.setAuthor(bot.user.username,bot.user.displayAvatarURL)
.setDescription(`I am running on **${bot.ping}** ms.`);

message.channel.send(embed).catch(console.error)

}

module.exports.help = {
	name: "ping"
}
