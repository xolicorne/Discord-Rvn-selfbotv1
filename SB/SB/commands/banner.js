module.exports = {
    name: 'banner',
    description: 'Affiche la bannière de l\'utilisateur.',
    /**
     * Exécute la commande banner.
     * 
     * @param {Channel} channel Le canal où la commande a été exécutée.
     * @param {Message} message L'objet message pour la commande.
     * @param {Client} client L'instance du client ou du bot.
     * @param {String[]} args Les arguments passés avec la commande.
     */
    execute(channel, message, client, args) {
        // Récupère l'URL de l'avatar de l'utilisateur
        const userAvatarURL = message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });

        // Extrait l'URL de la bannière de l'utilisateur à partir de l'URL de l'avatar
        const userBannerURL = userAvatarURL.split('?')[0] + '.png?size=4096';

        // Envoie la bannière de l'utilisateur si disponible
        message.channel.send(userBannerURL ? `Voici votre bannière : ${userBannerURL}` : 'Désolé, impossible de récupérer votre bannière.');
    }
};
