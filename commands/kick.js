module.exports = {
	name: 'kick',
	description: 'Kick a user from the server.',
	execute(message, args) {
		if (!message.member.hasPermission('KICK_MEMBERS')) {
			return message.reply('You do not have permission to kick members.');
		}

		const member = message.mentions.members.first();

		if (!member) {
			return message.reply('You need to mention a member to kick them.');
		}

		if (!member.kickable) {
			return message.reply('I cannot kick this user.');
		}

		return member
			.kick()
			.then(() => message.reply(`${member.user.tag} was kicked.`))
			.catch(error => message.reply('An error occurred.'));
	},
};
