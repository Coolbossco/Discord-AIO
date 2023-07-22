const Discord = require('discord.js');

module.exports = {
	name: 'rules',
	description: 'Show the rules of the server.',
	execute(message, args) {
		const embed = new Discord.MessageEmbed()
			.setTitle("Server Rules")
			.setDescription("1. Rule 1\n2. Rule 2\n3. Rule 3\n...")
			.setColor('#0099ff');

		message.channel.send(embed);
	},
};
