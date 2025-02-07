module.exports = {
    name: 'clean',
    description: 'Supprime tous les messages envoyés par le selfbot.',
    async execute(channel, message, client, args) {

        message.delete().catch(console.error);

        const amount = args.length > 0 ? parseInt(args[0], 10) : 100;

        if (isNaN(amount) || amount <= 0) {
            return message.channel.send("Veuillez fournir un nombre valide de messages à supprimer.").then(msg => msg.delete({ timeout: 5000 }));
        }

        try {
            const fetched = await channel.messages.fetch({ limit: amount });

            const messagesToDelete = fetched.filter(msg => msg.author.id === client.user.id);

            if (messagesToDelete.size === 0) {
                return message.channel.send("Aucun message de l\'utilisateur à supprimer trouvé.").then(msg => msg.delete({ timeout: 5000 }));
            }

            for (const msg of messagesToDelete.values()) {
                try {
                    await msg.delete();
                } catch (error) {
                    if (error.code === 10008) {
                        console.warn(`Message ${msg.id} non trouvé lors de la suppression.`);
                    } else {
                        console.error(`Erreur lors de la suppression du message ${msg.id} :`, error);
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des messages :', error);
        }
    }
};
