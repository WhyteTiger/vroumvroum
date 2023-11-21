/*
$.get(
    './././php/phpInterfaceAPI.php', // Le fichier à appeler sur serveur.
    'false', // Spécifier à la méthode qu'aucun paramètre n'est envoyé
    findUserNameById, // Le nom de la fonction à appeler pour le callback
    'script' // Format des données retournées par le serveur.
);

export function findUserNameById(result : number){
    console.log(result);
    return result;
}

 */