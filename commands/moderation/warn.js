const fs = require('fs');
let warns;

// Attempt to load the warns.json file
// If it doesn't exist, initialize warns as an empty object
try {
    warns = require('./warns.json');
} catch (err) {
    warns = {};
    fs.writeFileSync('./warns.json', '{}');
}

module.exports = {
    name: 'warn',
    description: 'Warn a user.',
    execute(message, args) {
        const userToWarn = message.mentions.users.first();

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('You do not have permission to warn members.');
        }

        if (!userToWarn) {
            return message.reply('You need to mention the member to warn them.');
        }

        warns[userToWarn.id] = (warns[userToWarn.id] || 0) + 1;

        fs.writeFile('./warns.json', JSON.stringify(warns), err => {
            if (err) {
                console.error(err);
                return message.reply('An error occurred while trying to save the warn count.');
            }

            if (warns[userToWarn.id] >= 3) {
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                const member = message.guild.member(userToWarn);
                member.roles.add(muteRole.id);
                message.reply(`${userToWarn.tag} has been muted due to 3 warns.`);
            } else {
                message.reply(`${userToWarn.tag} has been warned. They now have ${warns[userToWarn.id]} warn(s).`);
            }
        });
    },
};
