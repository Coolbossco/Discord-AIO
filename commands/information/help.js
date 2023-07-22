module.exports = {
	name: 'help',
	description: 'List all available commands, or info about a specific command.',
	execute(message, args) {
		const { commands } = message.client;
		const Discord = require('discord.js');

		if (!args.length) {
			const helpEmbed = new Discord.MessageEmbed()
				.setTitle('Available commands')
				.setDescription(commands.map(command => command.name).join(', '))
				.setColor('#0099ff');

			return message.channel.send(helpEmbed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name);

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		const commandEmbed = new Discord.MessageEmbed()
			.setTitle(`Command name: ${command.name}`)
			.addField('Description', command.description || 'No description available')
			.setColor('#0099ff');

		message.channel.send(commandEmbed);
	},
};
 