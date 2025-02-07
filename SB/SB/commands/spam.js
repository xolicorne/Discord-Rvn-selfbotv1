const { allowedUserIDs } = require('../config.json');

module.exports = {
    name: 'spam',
    description: 'Spamme un message un certain nombre de fois.',
    async execute(channel, message, client, args, prefix) {
        // Supprime le message de commande
        await message.delete().catch(console.error);

        // Vérifie si l'utilisateur est autorisé à utiliser cette commande
        if (!allowedUserIDs.includes(message.author.id)) {
            return; // Ne fait rien si l'utilisateur n'est pas autorisé
        }

        // Vérifie le nombre d'arguments
        if (args.length < 2) {
            return channel.send(`Usage: ${prefix}spam <nombre de fois> <message>\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        // Parse le nombre de fois
        const count = parseInt(args[0], 10);
        if (isNaN(count) || count < 1 || count > 100) {
            return channel.send(`Le nombre de fois doit être un nombre entre 1 et 100.\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        // Récupère le message à spammer
        const spamMessage = args.slice(1).join(' ');
        if (!spamMessage) {
            return channel.send(`Usage: ${prefix}spam <nombre de fois> <message>\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        // Spamme le message
        for (let i = 0; i < count; i++) {
            await channel.send(spamMessage);
        }
    }
};
