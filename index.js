const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const Client = require('./client/client.js');
const config = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const loadCommands = (dir) => {
    const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js') || fs.lstatSync(path.join(dir, file)).isDirectory());

    for (const file of commandFiles) {
        const fullPath = path.join(dir, file);
        if(fs.lstatSync(fullPath).isDirectory()) {
            loadCommands(fullPath);
        } else {
            const command = require(fullPath);
            client.commands.set(command.name, command);
            console.log(`👌 Command loaded: ${command.name}`);
        }
    }
};

loadCommands('./commands');

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    // Log the command usage
    client.logCommand(message);

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.login(config.token);
