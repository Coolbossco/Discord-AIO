module.exports = {
    name: 'role',
    description: 'Add or remove a role from a user.',
    execute(message, args) {
        const member = message.mentions.members.first();
        let role = message.guild.roles.cache.find(role => role.name === args[1]);

        if (args[0] === 'add') {
            member.roles.add(role);
        } else if (args[0] === 'remove') {
            member.roles.remove(role);
        }
    },
};
