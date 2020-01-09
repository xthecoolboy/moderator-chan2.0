const Discord = require("discord.js");
const Commando = require('discord.js-commando');
const settings = require('./../botconfig.json');
const AFK = require('./../models/afk.js');

module.exports =
  function setAfk(username,userID,userTag,avatar,avatarName,message){
    if (message===''){
      message = 'I\'m AFK at the moment.'
    }
    AFK.findOne({
      user: username,
      id: userID
    }, async (err,afk) => {
      if (!afk){
        const newAFK = new AFK({
          user: username,
          id: userID,
          tag: userTag,
          data: {
            avatar : avatar,
            name: avatarName,
            message: message
        }
        })
        return newAFK.save()
      } else if (afk.data.message===null){
        afk.data.message=message
      } else {
        afk.data.message=null
      }
      return afk.save().catch(console.error)
      })
  }
