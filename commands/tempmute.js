const ms = require('ms');

module.exports = {
    name: 'tempmute',
    description: 'Temporarily mute a member.',
    execute(message, args) {
        const member = message.mentions.members.first();
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('You do not have permission to mute members.');
        }

        if (!member) {
            return message.reply('You need to mention the member you want to mute.');
        }

        let time = args[1];

        if (!time) {
            return message.reply('You need to specify the time for the mute.');
        }

        member.roles.add(muteRole.id)
            .then(() => {
                message.reply(`${member.user.tag} was muted for ${ms(ms(time), { long: true })}.`);

                setTimeout(() => {
                    member.roles.remove(muteRole.id);
                    message.channel.send(`${member.user.tag} was unmuted.`);
                }, ms(time));
            })
            .catch(error => message.reply('An error occurred.'));
    },
};
