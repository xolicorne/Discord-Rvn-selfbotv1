const { allowedUserIDs } = require('../config.json');

module.exports = {
    name: 'fuck',
    description: 'Envoie un message en MP à la personne mentionnée avec des emojis.',
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
            return channel.send(`Usage: ${prefix}fuck @mention\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        // Définir les emojis à envoyer
        const emojis = ['😂', '😍', '💖', '🔥', '😘', '😏', '🍆', '🍑']; // Ajoute les emojis que tu souhaites

        // Crée un message avec les emojis
        const emojiMessage = emojis.join(' ');

        // Envoie le message en MP à l'utilisateur mentionné
        try {
            await user.send(`Voici plein d'amour pour toi !\n${emojiMessage}\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du MP:', error);
            channel.send(`Je n'ai pas pu envoyer de message à ${user.tag}. Assurez-vous que leurs messages privés sont ouverts.`);
        }
    }
};
