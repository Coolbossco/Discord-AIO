module.exports = {
	name: 'ban',
	description: 'Ban a user from the server.',
	execute(message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			return message.reply('You do not have permission to ban members.');
		}

		const member = message.mentions.members.first();

		if (!member) {
			return message.reply('You need to mention a member to ban them.');
		}

		if (!member.bannable) {
			return message.reply('I cannot ban this user.');
		}

		return member
			.ban()
			.then(() => message.reply(`${member.user.tag} was banned.`))
			.catch(error => message.reply('An error occurred.'));
	},
};
