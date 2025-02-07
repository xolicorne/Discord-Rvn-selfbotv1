module.exports = {
    name: 'messageDelete',
    execute(message, snipes) {
        if (message.partial || message.author.bot) return;

        // Stocke le message supprimé dans l'objet snipes
        snipes[message.channel.id] = {
            content: message.content,
            author: message.author,
            time: message.createdAt,
            attachments: message.attachments
        };
    }
};
