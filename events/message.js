const settings = require('./../botconfig.json');
var prefix = settings.prefix;

module.exports = (bot,message) => {

    if(message.content.toString().toLowerCase() === "prefix") return message.channel.send(`**${settings.prefix}**`)

    if (message.content.startsWith(prefix)){
      if(message.author.bot) return;
      if(message.channel.type === "dm") return;
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);
      var commandfile = bot.commands.get(cmd.slice(prefix.length));
      if (commandfile) commandfile.run(bot,message,args);
    }

  }
