module.exports = {
    name: 'purge',
    description: 'Delete a specified number of messages.',
    execute(message, args) {
        const amount = args[0];

        message.channel.bulkDelete(amount);
    },
};
