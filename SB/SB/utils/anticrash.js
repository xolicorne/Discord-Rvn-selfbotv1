// utils/anticrash.js

module.exports = () => {
    // Capture des erreurs non capturées
    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
        // On peut choisir de fermer le bot après une exception critique si nécessaire
        // process.exit(1); // Décommenter si vous voulez fermer le bot après une exception
    });

    // Capture des promesses non gérées
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // process.exit(1); // Décommenter si vous voulez fermer le bot après une rejection non gérée
    });
    
    // Optionnel : Si vous voulez fermer le bot sur des erreurs non gérées, utilisez cette ligne
    // Si vous ne souhaitez pas que le bot ferme automatiquement, laissez commenté.
};
