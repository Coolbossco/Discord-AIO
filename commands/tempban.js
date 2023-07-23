module.exports = {
    name: 'tempban',
    description: 'Temporarily ban a user.',
    execute(message, args) {
        const userToBan = message.mentions.users.first();
        let time = args[1];

        if (message.member.hasPermission('BAN_MEMBERS')) {
            message.guild.members.ban(userToBan);

            setTimeout(() => {
                message.guild.members.unban(userToBan.id);
            }, ms(time));
        }
    },
};
