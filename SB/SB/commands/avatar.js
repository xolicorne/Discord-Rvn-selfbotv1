module.exports = {
    name: 'avatar',
    description: 'Affiche l\'avatar de l\'utilisateur mentionné.',
    /**
     * Exécute la commande avatar.
     * 
     * @param {Channel} channel Le canal où la commande a été exécutée.
     * @param {Message} message L'objet message pour la commande.
     * @param {Client} client L'instance du client ou du bot.
     * @param {String[]} args Les arguments passés avec la commande.
     */
    execute(channel, message, client, args) {
        // Supprime le message de la commande
        message.delete().catch(console.error);

        // Vérifie si un utilisateur est mentionné
        if (!message.mentions.users.size) {
            return message.channel.send('Veuillez mentionner un utilisateur pour obtenir son avatar.').catch(console.error);
        }

        // Récupère l'utilisateur mentionné
        const mentionedUser = message.mentions.users.first();

        // Récupère l'URL de l'avatar de l'utilisateur mentionné
        const userAvatarURL = mentionedUser.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

        // Envoie l'avatar de l'utilisateur mentionné
        message.channel.send(`${mentionedUser.username} a pour avatar : ${userAvatarURL}`).catch(console.error);
    }
};
