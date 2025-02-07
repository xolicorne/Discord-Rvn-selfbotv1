const { prefix } = require('../config.json');

module.exports = {
    name: 'status',
    description: 'Définit le statut du bot.',
    /**
     * Exécute la commande status.
     * 
     * @param {Channel} channel Le canal où la commande a été exécutée.
     * @param {Message} message L'objet message pour la commande.
     * @param {Client} client L'instance du client ou du bot.
     * @param {String[]} args Les arguments passés avec la commande.
     */
    execute(channel, message, client, args) {
        // Vérifie si l'utilisateur a fourni un type de statut et un message
        if (args.length < 2) {
            return message.channel.send('Veuillez fournir le type de statut et le message. Utilisation : ${prefix}status <type> <message>').catch(console.error);
        }

        const type = args[0].toLowerCase();
        const statusMessage = args.slice(1).join(' ');

        // Définit le statut du bot en fonction du type et du message fournis
        switch (type) {
            case 'playing':
                client.user.setActivity(statusMessage, { type: 'PLAYING' });
                break;
            case 'streaming':
                client.user.setActivity(statusMessage, { type: 'STREAMING', url: 'https://twitch.tv/lucasfr' });
                break;
            case 'listening':
                client.user.setActivity(statusMessage, { type: 'LISTENING' });
                break;
            case 'watching':
                client.user.setActivity(statusMessage, { type: 'WATCHING' });
                break;
            default:
                return message.channel.send('Type de statut invalide. Types disponibles : playing, streaming, listening, watching.').catch(console.error);
        }

        // Envoie un message de confirmation
        message.channel.send(`Statut défini sur "${statusMessage}"`).catch(console.error);
    }
};
