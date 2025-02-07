const { WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const { joinAlert } = require('../../alerts.json');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        if (!joinAlert.enabled || !joinAlert.webhookURL) return;

        const webhookClient = new WebhookClient({ url: joinAlert.webhookURL });

        // Créer l'embed d'alerte pour rejoindre un serveur
        const embed = new MessageEmbed()
            .setColor('#00FF00') // Couleur verte pour un join
            .setTitle('➕ Rejoint un Serveur')
            .addField('Nom du Serveur', guild.name, true)
            .addField('ID du Serveur', guild.id, true)
            .addField('Membres', `${guild.memberCount}`, true)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('Alerte de join');

        try {
            await webhookClient.send({ embeds: [embed] });
            console.log('Join alert sent via webhook.');
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'alerte de join :", error);
        } finally {
            webhookClient.destroy();
        }
    }
};
