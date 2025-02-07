const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'voc',
    description: 'Se connecter à un salon vocal avec l\'ID donné et y rester muet.',
    async execute(channel, message, client, args) {
        // Supprime le message contenant la commande dès le début
        await message.delete().catch(err => console.error('Erreur lors de la suppression du message :', err));

        // Vérifie si un ID de salon vocal a été fourni
        if (!args[0]) {
            return channel.send('Veuillez spécifier un ID de salon vocal.');
        }

        const voiceChannelId = args[0]; // Récupérer l'ID du salon vocal

        // Essayez de récupérer le salon vocal
        const voiceChannel = client.channels.cache.get(voiceChannelId);
        
        if (!voiceChannel || voiceChannel.type !== 'GUILD_VOICE') {
            return channel.send('Veuillez fournir un ID de salon vocal valide.');
        }

        try {
            // Rejoindre le salon vocal
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            console.log(`Connecté au salon vocal : ${voiceChannel.name}`);

            // Mute le bot dans le salon vocal
            connection.on('stateChange', (oldState, newState) => {
                if (newState.status === 'ready') {
                    // Une fois connecté, mute le bot
                    connection.voice.setSelfMute(true);
                    
                    // Envoi un message de confirmation
                    channel.send(`Connecté au salon vocal **${voiceChannel.name}** avec succès !\n\`\`\`ini\n> Développé par LucasFR\n\`\`\``)
                        .then(sentMessage => {
                            // Supprime le message après 5 secondes
                            setTimeout(() => {
                                sentMessage.delete().catch(err => console.error('Erreur lors de la suppression du message :', err));
                            }, 5000);
                        })
                        .catch(error => console.error('Erreur lors de l\'envoi du message de confirmation :', error));
                }
            });

        } catch (error) {
            console.error(`Erreur lors de la connexion au salon vocal : ${error.message}`);
            channel.send(`Erreur lors de la connexion au salon vocal : ${error.message}`);
        }
    }
};
