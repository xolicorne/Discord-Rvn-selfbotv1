const { allowedUserIDs } = require('../config.json');

module.exports = {
    name: 'serverlist',
    description: 'Affiche tous les serveurs et leurs IDs sur lesquels le selfbot est présent.',
    async execute(channel, message, client, args, prefix) {
        // Supprime le message de commande
        await message.delete().catch(console.error);

        // Vérifie si l'utilisateur est autorisé à utiliser cette commande
        if (!allowedUserIDs.includes(message.author.id)) {
            return; // Ne fait rien si l'utilisateur n'est pas autorisé
        }

        // Récupère toutes les guildes
        const guilds = client.guilds.cache;

        // Vérifie s'il y a des guildes
        if (guilds.size === 0) {
            return channel.send('Je ne suis dans aucun serveur.');
        }

        // Crée un message avec la liste des guildes formatée
        let guildList = guilds.map(guild => {
            return `- [${guild.name}](https://discord.com/channels/${guild.id}) (ID: ${guild.id})`;
        }).join('\n');

        const header = `# Voici la liste des serveurs où je suis présent:\n`;
        const footer = '```ini\n> [ Développé par Rvn Team ]\n```';
        
        // Vérifie si le contenu dépasse la limite de 4000 caractères
        let fullMessage = header + guildList;
        const maxMessageLength = 4000;

        // Envoie le message en plusieurs parties si nécessaire
        if (fullMessage.length > maxMessageLength) {
            const chunks = [];
            let currentChunk = header; // Commence le premier chunk avec le header
            
            // Divise la liste en morceaux
            for (const line of guildList.split('\n')) {
                if ((currentChunk + line).length > (maxMessageLength)) {
                    chunks.push(currentChunk);
                    currentChunk = ''; // Réinitialise pour le prochain chunk
                }
                currentChunk += line + '\n'; // Ajoute la ligne courante au chunk
            }
            // Ajoute le dernier chunk
            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
            }

            // Envoie chaque chunk séparément
            for (let i = 0; i < chunks.length; i++) {
                // Le footer est ajouté seulement au dernier message
                const messageToSend = i === chunks.length - 1 ? chunks[i] + footer : chunks[i];
                await channel.send(messageToSend).catch(console.error);
            }
        } else {
            // Envoie le message complet si c'est en dessous de la limite
            await channel.send(fullMessage + footer).catch(console.error);
        }
    }
};
