module.exports = {
    name: 'snipe',
    description: 'Affiche le dernier message supprimé dans le canal.',
    async execute(channel, message, client, args, prefix, snipes) {
        const snipe = snipes[channel.id]; // Récupère le dernier message supprimé pour le canal actuel

        // Supprime le message d'appel
        message.delete().catch(console.error);

        if (!snipe) {
            return channel.send(`Il n'y a aucun message supprimé à snipe.\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``);
        }

        let snipeMessage = `**Auteur**: ${snipe.author.tag}\n**Message supprimé**: ${snipe.content || 'Aucun contenu texte'}\n**Heure**: ${snipe.time.toLocaleString()}\n\`\`\`ini\n> [ Développé par Rvn Team ]\n\`\`\``;

        if (snipe.attachments && snipe.attachments.size > 0) {
            const attachments = snipe.attachments.map(att => att.url);
            return channel.send(snipeMessage, { files: attachments });
        }

        return channel.send(snipeMessage);
    }
};
