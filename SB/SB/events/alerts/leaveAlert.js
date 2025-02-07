const { WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const { leaveAlert } = require('../../alerts.json');

module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        if (!leaveAlert.enabled || !leaveAlert.webhookURL) return;

        const webhookClient = new WebhookClient({ url: leaveAlert.webhookURL });

        // Créer l'embed d'alerte pour quitter un serveur
        const embed = new MessageEmbed()
            .setColor('#FF0000') // Couleur rouge pour un leave
            .setTitle('➖ Quitté un Serveur')
            .addField('Nom du Serveur', guild.name, true)
            .addField('ID du Serveur', guild.id, true)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('Alerte de leave');

        try {
            await webhookClient.send({ embeds: [embed] });
            console.log('Leave alert sent via webhook.');
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'alerte de leave :", error);
        } finally {
            webhookClient.destroy();
        }
    }
};
