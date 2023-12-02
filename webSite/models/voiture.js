var map = new Map("voiture");

window.onload = function(){
    var canvas = document.getElementById('canvasChoix');
    var ctx = canvas.getContext('2d');   // le contexte

    canvas.width = map.getLargeur()*160; // ne pas oublier de remplacer le 32 par 160;
    canvas.height = map.getHauteur()*160;

    map.dessinerMap(ctx);

    var buttonsContainer = document.getElementById('buttonsContainer');
    for (let i = 0; i < map.getLargeur(); i++) {
        var button = document.createElement('button');
        button.id='buttonCar';
        button.innerHTML = 'Choisir';
        button.onclick = function() {
            // Ajoutez ici le code de gestion de la sélection en fonction de l'index
            console.log('Image sélectionnée : ' + i);
        };

        buttonsContainer.appendChild(button);
        // Utilisez la fonction de vérification pour déterminer la visibilité du bouton
        if (map.isImagePresent(i)) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    }
}