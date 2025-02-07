const { allowedUserIDs } = require('../config.json');

module.exports = {
    name: 'say',
    description: 'Fait dire un message à l\'utilisateur.',
    async execute(channel, message, client, args, prefix) {
        // Supprime le message de commande
        await message.delete().catch(console.error);

        // Vérifie si l'utilisateur est autorisé à utiliser cette commande
        if (!allowedUserIDs.includes(message.author.id)) {
            return; // Ne fait rien si l'utilisateur n'est pas autorisé
        }

        // Vérifie si un message a été fourni
        if (args.length < 1) {
            return channel.send(`Usage: ${prefix}say <message>\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        // Récupère le message à dire
        const sayMessage = args.join(' ');
        if (!sayMessage) {
            return channel.send(`Usage: ${prefix}say <message>\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        // Le bot dit le message
        await channel.send(sayMessage);
    }
};
