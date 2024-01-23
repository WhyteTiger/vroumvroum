// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { Alert } from "../../models/entities/Alert.js";
import { API }   from "../../models/API.js";

const input        = document.getElementById('labelFile');
const editButton   = document.getElementById('editButton');
const editPassword = document.getElementById('editPassword');
const vroumcoin    = document.getElementById('vroumcoin');
const pseudo       = document.getElementById('pseudo');

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/accountMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();


pseudo.innerText = localStorage.username;

const playerId = localStorage.getItem("playerId");

const url = API.getURLgetKartsAndCoinsByPlayerId();
const dataVroumCoins = {
    playerIdIn: playerId
};
const params = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(dataVroumCoins)
};

fetch(url, params)
   .then((response) => response.json())
   .then((result) => {
       vroumcoin.innerText = result.vroumCoins;
   });

Alert.updateProfileImage(localStorage.imgProfilId);

input.addEventListener('click', () => {
    const newAlert = new Alert("Choisissez une image :", "Valider", null, "imgProfile");
    newAlert.customAlert();
    Alert.updateProfileImage(localStorage.imgProfilId);
});

editButton.addEventListener('click', () => {
    const newAlert = new Alert("Nouveau pseudo :", "Enregistrer", null, "input");
    newAlert.customAlert();
});

editPassword.addEventListener('click', () => {
    const newAlert = new Alert("Nouveau mot de passe :", "Enregistrer", null, "input");
    newAlert.customAlert();
    
    const newPwd = localStorage.getItem("inputField");
    
    const url = API.getURLupdatePasswordOfPlayerId();
    const dataPwd = {
        playerIdIn: playerId,
        newPwdIn:   newPwd
    };
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPwd)
    };
    
    fetch(url, params)
       .then((response) => response.json())
       .then((result) => {})
       .catch((err) => console.error(err));
    
    localStorage.setItem("inputField", "");
});

document.querySelector('#Formulaire a').addEventListener('click', (evt) => {
    console.log(localStorage.getItem('playerId'));
    localStorage.setItem('delete', 'false');

    const newAlert = new Alert("Souhaitez-vous supprimer votre compte ?", "Supprimer", "home.html", "delete");
    newAlert.customAlert();

    if(localStorage.getItem('delete') === 'true') {
        const dataPwd = {
            playerIdIn: playerId
        };
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPwd)
        };
        
        fetch(API.getURLDeleteAccount(), params)
           .then((response) => response.json())
           .then((result) => {
            console.log(result)
            
           })
           .catch((err) => console.error(err));


           setTimeout(() => {
            document.location.href = "home.html";           }, 5000);
        

    }


});
