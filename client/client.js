const Discord = require('discord.js');
const config = require('../config.json');

class Client extends Discord.Client {
    constructor(options = {}) {
        super({
            ...options,
            intents: [
                'Guilds', 
                'GuildMembers', 
                'GuildMessages', 
                'DirectMessages', 
                'GuildPresences'
            ]
        });
    }

    logCommand(message) {
        const logChannel = this.channels.cache.get(config.commandLogChannel);
        logChannel.send(`Command ${message.content} was used by ${message.author.tag} in ${message.guild.name}`);
    }

    logModerationCommand(message) {
        const logChannel = this.channels.cache.get(config.moderationLogChannel);
        logChannel.send(`Moderation command ${message.content} was used by ${message.author.tag} in ${message.guild.name}`);
    }
}

module.exports = Client;
