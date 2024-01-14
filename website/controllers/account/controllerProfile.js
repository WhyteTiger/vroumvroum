import {Alert} from "../../models/entities/Alert.js";

const input = document.getElementById('labelFile');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const form = document.getElementById('formCompte');
const vroumcoin = document.getElementById('vroumcoin');
const pseudo = document.getElementById('pseudo');

pseudo.innerText = window.localStorage.username;
const previewImage = document.getElementById('previewImage');

updateProfileImage(window.localStorage.imgProfilId);
input.addEventListener('click', function() {

    console.log(window.localStorage.imgProfilId);

    const newAlert = new Alert("choisissez une image :", "valider", null, "imgProfile");
    newAlert.customAlert();
    updateProfileImage(window.localStorage.imgProfilId);

})

editButton.addEventListener('click', function(){
    const newAlert = new Alert("Nouveau pseudo :", "Enregistrer", null, "input");
    newAlert.customAlert();

    /*
    const inputs = form.getElementsByTagName('input');
    for (let i = 0; i<inputs.length; i++){
        inputs[i].removeAttribute('readonly');
        inputs[i].style.color = 'black';
    }

    saveButton.style.display = 'block';
    editButton.style.display = 'none';*/
});

/*saveButton.addEventListener('click', function(){
    /*const inputs = form.getElementsByTagName('input');
    for (let i = 0; i<inputs.length; i++){
        inputs[i].setAttribute('readonly', true);
        inputs[i].style.color = 'gray';
    }

    window.localStorage.setItem('username', window.localStorage.inputField);
    pseudo.innerText = localStorage.username;

    /*saveButton.style.display = 'none';
    editButton.style.display = 'block';
})*/

function updateProfileImage(imgProfilId) {
    console.log('img' + imgProfilId);
    const tileset = new Image();
    tileset.src = "../../assets/tilesets/circuit.png";

    tileset.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const tileSize = 160;

        const tileX = imgProfilId * tileSize;
        const tileY = 4*160;

        canvas.width = 150;
        canvas.height = 150;

        ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
        previewImage.src = canvas.toDataURL('image/png');
    };

}
