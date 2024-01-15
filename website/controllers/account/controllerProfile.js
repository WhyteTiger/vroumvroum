import { Alert } from "../../models/entities/Alert.js";
import { API }   from "../../models/API.js";

const input        = document.getElementById('labelFile');
const editButton   = document.getElementById('editButton');
const editPassword = document.getElementById('editPassword');
const vroumcoin    = document.getElementById('vroumcoin');
const pseudo       = document.getElementById('pseudo');

pseudo.innerText = localStorage.username;
const previewImage = document.getElementById('previewImage');

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
console.log(params);
fetch(url, params)
   .then((response) => response.json())
   .then((result) => {
       console.log(result);
       
       vroumcoin.innerText = result.vroumCoins;
   });

Alert.updateProfileImage(localStorage.imgProfilId);

input.addEventListener('click', () => {
    console.log(localStorage.imgProfilId);

    const newAlert = new Alert("choisissez une image :", "valider", null, "imgProfile");
    newAlert.customAlert();
    Alert.updateProfileImage(localStorage.imgProfilId);
});

editButton.addEventListener('click', () => {
    const newAlert = new Alert("Nouveau pseudo :", "Enregistrer", null, "input");
    newAlert.customAlert();
    
    const newUsername = localStorage.getItem("inputField");
    
    const url         = API.getURLupdatePlayerUsername();
    const dataUsername = {
        playerIdIn:    playerId,
        newUsernameIn: newUsername
    };
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUsername)
    };
    console.log(params);
    
    fetch(url, params)
       .then((response) => response.json())
       .then((result) => {
           console.log(result);
       });
    
    localStorage.setItem("username", newUsername);
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
    console.log(params);
    
    fetch(url, params)
       .then((response) => response.json())
       .then((result) => {
           console.log(result);
       });
    
    localStorage.setItem("inputField", "");
});
