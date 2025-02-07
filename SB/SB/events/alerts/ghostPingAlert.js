const { WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const { ghostPingAlert } = require('../../alerts.json');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (!ghostPingAlert.enabled || !ghostPingAlert.webhookURL) return;

        // Vérifie si le message supprimé mentionnait le selfbot et que l'auteur n'est pas un bot
        if (message.mentions.has(message.client.user) && !message.author.bot) {
            const webhookClient = new WebhookClient({ url: ghostPingAlert.webhookURL });

            // Créer l'embed d'alerte pour le ghost ping
            const embed = new MessageEmbed()
                .setColor('#FF4500') // Couleur orange pour le ghost ping
                .setTitle('👻 Ghost Ping détecté')
                .addField('Auteur', `${message.author.tag} (${message.author.id})`, true)
                .addField('Message', message.content || 'Aucun contenu') // Affiche le message s'il y a du contenu
                .setTimestamp()
                .setFooter('Alerte de ghost ping');

            // Si le message est dans un serveur, ajouter les informations du serveur et du salon
            if (message.guild) {
                embed.addField('Serveur', message.guild.name, true)
                     .addField('Salon', `<#${message.channel.id}>`, true); // Mention cliquable vers le salon
            } else {
                embed.addField('Contexte', 'Message Privé'); // DM context
            }

            try {
                await webhookClient.send({ embeds: [embed] });
                console.log('Ghost ping alert sent via webhook.');
            } catch (error) {
                console.error("Erreur lors de l'envoi de l'alerte de ghost ping :", error);
            } finally {
                webhookClient.destroy();
            }
        }
    }
};
