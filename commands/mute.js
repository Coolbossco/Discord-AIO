module.exports = {
    name: 'mute',
    description: 'Mute a member.',
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('You do not have permission to mute members.');
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply('You need to mention the member you want to mute.');
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        member.roles.add(muteRole.id)
            .then(member => message.reply(`${member.user.tag} was muted.`))
            .catch(error => message.reply('An error occurred.'));
    },
};