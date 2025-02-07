const { allowedUserIDs } = require('../config.json');

module.exports = {
    name: 'pedo',
    description: 'Calcule le pourcentage de pédophilie de la personne mentionnée.',
    async execute(channel, message, client, args, prefix) {
        // Supprime le message de commande
        await message.delete().catch(console.error);

        // Vérifie si l'utilisateur est autorisé à utiliser cette commande
        if (!allowedUserIDs.includes(message.author.id)) {
            return; // Ne fait rien si l'utilisateur n'est pas autorisé
        }

        // Vérifie si un utilisateur est mentionné
        const user = message.mentions.users.first();
        if (!user) {
            return channel.send(`Usage: ${prefix}pedo @mention\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        // Génère un pourcentage aléatoire entre 1 et 100
        const percentage = Math.floor(Math.random() * 100) + 1;

        // Envoie le message avec le pourcentage
        return channel.send(`${user} est ${percentage}% pédophile!\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
    }
};
