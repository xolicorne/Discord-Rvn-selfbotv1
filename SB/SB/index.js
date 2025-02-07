const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const { token, allowedUserIDs } = require('./config.json');

// Charge l'anticrash (gestion des erreurs globales)
require('./utils/anticrash')(); // On appelle le fichier anticrash.js

// Charge le préfixe depuis le fichier de configuration
let { prefix } = require('./config.json');

const client = new Client();
const commands = [];
const snipes = {}; // Déclaration ici pour accéder dans tout le fichier

// Fonction pour charger les événements
function loadEvents() {
    const snipeEventFiles = fs.readdirSync(path.join(__dirname, 'events/snipe')).filter(file => file.endsWith('.js'));
    const alertEventFiles = fs.readdirSync(path.join(__dirname, 'events/alerts')).filter(file => file.endsWith('.js'));

    // Charger les événements de "snipe"
    for (const file of snipeEventFiles) {
        const event = require(`./events/snipe/${file}`);
        client.on(event.name, (...args) => event.execute(...args, snipes));
        console.log(`Loaded event: ${event.name}`);
    }

    // Charger les événements "alert"
    for (const file of alertEventFiles) {
        const event = require(`./events/alerts/${file}`);
        client.on(event.name, (...args) => event.execute(...args, snipes));
        console.log(`Loaded alert event: ${event.name}`);
    }
}

// Fonction pour charger les fichiers utils
function loadUtils() {
    const utilsFiles = fs.readdirSync(path.join(__dirname, 'utils')).filter(file => file.endsWith('.js'));

    // Charger les fichiers utils
    for (const file of utilsFiles) {
        try {
            const util = require(`./utils/${file}`);
            console.log(`Loaded utility file: ${file}`);
        } catch (err) {
            console.error(`Error loading utility file ${file}:`, err);
        }
    }
}

// Lorsque le bot est prêt
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Lorsque le bot reçoit un message
client.on('messageCreate', (message) => {
    if (!message.author || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = commands.find(cmd => cmd.name === commandName);

    if (!command) return;

    // Si l'utilisateur n'est pas dans allowedUserIDs, on arrête l'exécution sans rien envoyer
    if (!allowedUserIDs.includes(message.author.id)) {
        return; // Aucune réponse, simplement quitter la fonction
    }

    // Passe le préfixe et snipes en tant qu'argument
    try {
        command.execute(message.channel, message, client, args, prefix, snipes);
        console.log(`Executed command: ${commandName}`);
    } catch (err) {
        console.error(`Error executing command ${commandName}:`, err);
    }
});

// Charge les événements
loadEvents();

// Charge les fichiers utils
loadUtils();

// Charge les commandes du répertoire ./commands
fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        try {
            const command = require(`./commands/${file}`);
            commands.push(command);
            console.log(`Loaded command: ${command.name}`);
        } catch (err) {
            console.error(`Error loading command ${file}:`, err);
        }
    });

// Connexion au bot
client.login(token).catch(err => {
    console.error('Failed to login:', err);
    process.exit(1);
});
