import {API} from "../../models/API.js";


console.log('aside')
console.log(localStorage)
console.log(localStorage.isConnected)

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE SO MANY IF STATEMENTS */

if(document.querySelector('#savebutton') === null) {    // means we're on the choice page

    // adding an eventListener to all circuit boxes
    document.querySelectorAll('.circuit-box').forEach((box) => {
        box.addEventListener('click', (evt) => {
            const circuitId = box.getAttribute('name');
            console.log(circuitId)
            console.log
            localStorage.circuitId = circuitId;

            document.querySelector('#empty').classList.add('invisible');
            document.querySelector('#full').classList.remove('invisible');

            const url = API.getURLgetCircuitInformation();
            const dataCircuit = {
                circuitIdIn: circuitId
            };
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataCircuit)
            };
            
            console.log(params);
            
            fetch(url, params)
                .then((response) => response.json())
                .then((dataCircuit) => {
                    console.log(dataCircuit);
                    
                    document.getElementById("circuit-name").innerText = dataCircuit.circuitName;
                    document.getElementById("creator-name").innerText = "Créateur : " + dataCircuit.creatorUsername;
                    document.getElementById("creator-score").innerText = "Médaille auteur : " + dataCircuit.creatorTime;

                    // to manage the 5 (or less) best scores
                    if(dataCircuit.leaderBoard == null) {
                        document.querySelector("#leaderboard-players").textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
                    } else {
                        let i = 0;
                        for (let player in document.querySelector('#leaderboard-players p')) {
                            player.textContent = dataCircuit.leaderBoard[i] + " : " + dataCircuit.leaderBoard[i+1];
                            i += 2;
                        }
                    }
                }).catch((error) => console.log(error));
        });
    });
    



} else {    // means we're on the creation page
    console.log(document.querySelector('#savebutton'))
    document.querySelector('#savebutton').addEventListener('click', (evt) => {

        console.log(document.querySelector('aside input').value)
        console.log(localStorage.playerId)

        // TODO API : enregistrer le fichier avec l'id de l'user et matrix (à transformer au passage pour que ça rentre dans la DB)

    });
}








