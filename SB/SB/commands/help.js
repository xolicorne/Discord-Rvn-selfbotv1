const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    description: 'Affiche une liste des commandes disponibles avec leurs descriptions.',
    execute(channel, message, client, args, prefix) {
        // Récupère la liste des fichiers de commande dans le répertoire 'commands'
        const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));
        let helpMessage = '# Commandes Disponibles\n\n';

        // Vérifie si le préfixe est défini et le place correctement
        const commandPrefix = prefix || '';

        // Parcoure chaque fichier de commande
        commandFiles.forEach(file => {
            try {
                const command = require(`../commands/${file}`);
                helpMessage += `- **${commandPrefix}${command.name}**: ${command.description}\n`;
            } catch (error) {
                console.error(`Échec du chargement du fichier de commande : ${file}`, error);
            }
        });

        helpMessage += '```ini\n> [ Développé par Rvn Team ]\n```';

        // Envoie le message d'aide à l'utilisateur
        channel.send(helpMessage)
            .catch(error => console.error('Erreur lors de l\'envoi du message d\'aide :', error));
    }
};
