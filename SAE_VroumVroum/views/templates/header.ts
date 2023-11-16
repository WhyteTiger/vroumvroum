/*
<header>
    <img id="logo-header" src="../assets/logoLong.png" alt="VroumVroum">

    <button type="submit" id="connexion">Connexion</button>
    <button type="submit" id="inscription">S'inscrire</button>

    <script src="templates/header.ts" defer></script>
</header>
 */
// création header principal

// création éléments internes au header
let image = document.createElement('img');
image.setAttribute('src', '../assets/logoLong.png');
image.setAttribute('alt', 'Logo de VroumVroum');

let lienImage = document.createElement('a');
lienImage.setAttribute('href', 'index.html');

lienImage.appendChild(image);






// création et remplissage header
let header = document.createElement('header');
header.appendChild(lienImage);

document.insertBefore(header, document.getElementsByTagName('main')[0]);


