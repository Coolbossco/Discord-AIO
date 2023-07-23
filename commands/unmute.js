module.exports = {
    name: 'unmute',
    description: 'Unmute a member.',
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('You do not have permission to unmute members.');
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply('You need to mention the member you want to unmute.');
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        member.roles.remove(muteRole.id)
            .then(member => message.reply(`${member.user.tag} was unmuted.`))
            .catch(error => message.reply('An error occurred.'));
    },
};