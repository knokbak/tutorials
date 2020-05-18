var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('You can\'t use that!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('You didn\'t mention anyone!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('They aren\'t in the server!');
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You cannot kick this person!');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('You need to give a reason!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'potato');

    var log = new Discord.MessageEmbed()
    .setTitle('User Kicked')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were kicked!')
    .setDescription(reason);

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    member.kick(reason);

    msg.channel.send(`**${user}** has been kicked by **${msg.author}**!`);
}