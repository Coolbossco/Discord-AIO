module.exports = {
    name: 'nickname',
    description: 'Change a user\'s nickname.',
    execute(message, args) {
        const member = message.mentions.members.first();
        let newNickname = args.slice(1).join(' ');

        member.setNickname(newNickname);
    },
};
