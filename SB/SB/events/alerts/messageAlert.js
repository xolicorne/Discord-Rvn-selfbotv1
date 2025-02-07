const { WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const { mentionAlert } = require('../../alerts.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (!mentionAlert.enabled || !mentionAlert.webhookURL) return;

        // Vérifie si le message mentionne le selfbot et que l'auteur n'est pas un bot
        if (message.mentions.has(message.client.user) && !message.author.bot) {
            const webhookClient = new WebhookClient({ url: mentionAlert.webhookURL });

            // Créer l'embed d'alerte pour la mention
            const embed = new MessageEmbed()
                .setColor('#FF0000') // Couleur rouge pour la mention
                .setTitle('🔔 Mention détectée')
                .addField('Auteur', `${message.author.tag} (${message.author.id})`, true)
                .addField('Message', message.content || 'Aucun contenu') // Affiche le contenu du message
                .setTimestamp()
                .setFooter('Alerte de mention');

            // Si le message est dans un serveur, ajouter les informations du serveur et du salon
            if (message.guild) {
                embed.addField('Serveur', message.guild.name, true)
                     .addField('Salon', `<#${message.channel.id}>`, true); // Mention cliquable vers le salon
            } else {
                embed.addField('Contexte', 'Message Privé'); // DM context
            }

            try {
                await webhookClient.send({ embeds: [embed] });
                console.log('Mention alert sent via webhook.');
            } catch (error) {
                console.error("Erreur lors de l'envoi de l'alerte de mention :", error);
            } finally {
                webhookClient.destroy();
            }
        }
    }
};
