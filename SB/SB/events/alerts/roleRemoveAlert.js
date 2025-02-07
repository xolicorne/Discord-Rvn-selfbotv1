const { WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const { roleRemoveAlert } = require('../../alerts.json');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        // Vérifie si l'utilisateur est le bot (selfbot)
        if (newMember.id !== newMember.client.user.id) return; // Ne continue que si c'est le bot

        if (!roleRemoveAlert.enabled || !roleRemoveAlert.webhookURL) return;

        // Vérifie si un rôle a été retiré
        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

        if (removedRoles.size > 0) {
            const webhookClient = new WebhookClient({ url: roleRemoveAlert.webhookURL });

            // Créer l'embed d'alerte pour la suppression de rôle
            const embed = new MessageEmbed()
                .setColor('#FF0000') // Couleur rouge pour une suppression
                .setTitle('➖ Rôle retiré du bot')
                .addField('Serveur', newMember.guild.name, true)
                .addField('Rôle retiré', removedRoles.map(role => role.name).join(', '), true)
                .setTimestamp()
                .setFooter('Alerte de suppression de rôle');

            try {
                await webhookClient.send({ embeds: [embed] });
                console.log('Role remove alert sent via webhook.');
            } catch (error) {
                console.error("Erreur lors de l'envoi de l'alerte de suppression de rôle :", error);
            } finally {
                webhookClient.destroy();
            }
        }
    }
};
