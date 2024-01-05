import {API} from "../../models/API.js";


console.log('aside')
console.log(localStorage.isConnected)

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE SO MANY IF STATEMENTS */

window.onload = () => {
    if(document.querySelector('#savebutton') === null) {    // means we're on the choice page
        console.log(document.querySelector('aside button'))

        const boxes = document.querySelectorAll('.circuit-box');

        boxes.forEach((box) => {
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
                            
                            const circuitName = document.getElementById("circuitName");
                            circuitName.innerText = dataCircuit.circuitName;
                            
                            console.log("circuitScore : " + dataCircuit.circuitScore);
                            
                            const creatorName = document.getElementById("creatorName");
                            creatorName.innerText = "Créateur : " + dataCircuit.creatorUsername;
                            
                            const creatorScore = document.getElementById("creatorScore");
                            creatorScore.innerText = "Médaille auteur : " + dataCircuit.creatorTime;

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
        







    } else {

    }


    if(!localStorage.isConnected) {

    }



    

    
}


