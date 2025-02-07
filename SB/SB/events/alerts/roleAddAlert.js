const { WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const { roleAddAlert } = require('../../alerts.json');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember) {
        // Vérifie si l'utilisateur est le bot (selfbot)
        if (newMember.id !== newMember.client.user.id) return; // Ne continue que si c'est le bot

        if (!roleAddAlert.enabled || !roleAddAlert.webhookURL) return;

        // Vérifie si un rôle a été ajouté
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

        if (addedRoles.size > 0) {
            const webhookClient = new WebhookClient({ url: roleAddAlert.webhookURL });

            // Créer l'embed d'alerte pour l'ajout de rôle
            const embed = new MessageEmbed()
                .setColor('#00FF00') // Couleur verte pour un ajout
                .setTitle('➕ Rôle ajouté au bot')
                .addField('Serveur', newMember.guild.name, true)
                .addField('Rôle ajouté', addedRoles.map(role => role.name).join(', '), true)
                .setTimestamp()
                .setFooter('Alerte d\'ajout de rôle');

            try {
                await webhookClient.send({ embeds: [embed] });
                console.log('Role add alert sent via webhook.');
            } catch (error) {
                console.error("Erreur lors de l'envoi de l'alerte d'ajout de rôle :", error);
            } finally {
                webhookClient.destroy();
            }
        }
    }
};
