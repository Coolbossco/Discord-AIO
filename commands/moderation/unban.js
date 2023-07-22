module.exports = {
    name: 'unban',
    description: 'Unban a user from the server.',
    execute(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('You do not have permission to unban members.');
        }

        const userId = args[0];

        if (!userId) {
            return message.reply('You need to provide the ID of the user to unban them.');
        }

        message.guild.members.unban(userId)
            .then(user => message.reply(`${user.tag} was unbanned.`))
            .catch(error => message.reply('An error occurred.'));
    },
};
