// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { API } from "../../models/API.js";
import { Timer } from "../../models/entities/Timer.js";
import { Alert } from "../../models/entities/Alert.js";

console.log(localStorage);

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/hubsMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();


function fetchPage(nb, nbPages) {
    while(document.querySelector('#circuits').firstChild) document.querySelector('#circuits').removeChild(document.querySelector('#circuits').firstChild);

    document.querySelector('#page-selector p').textContent = `Page ${nb} / ${nbPages}`;

    // for further classes
    let filter = localStorage.getItem("personal") === "true" ? "-2" : "";

    // if filters then filter
    let circuitFilterValue = document.getElementById('name-filter').value;
    let creatorFilterValue = document.getElementById('creator-filter').value;
    if(circuitFilterValue === '' || circuitFilterValue === null) circuitFilterValue = undefined;
    if(creatorFilterValue === '' || creatorFilterValue === null) creatorFilterValue = undefined;

    let fetchParams;

    // fetch the circuits
    if (localStorage.getItem("personal") === "false") {
        fetchParams = {
            personnalCircuitIn: "false",
            pageNumberIn:      nb,
            circuitNameIn:     circuitFilterValue,
            creatorUsernameIn: creatorFilterValue
        };
    } else if (localStorage.getItem("personal") === "true") {
        fetchParams = {
            personnalCircuitIn: "true",
            playerIdIn: +localStorage.getItem("playerId"),
            pageNumberIn:      nb,
            circuitNameIn:     circuitFilterValue,
            creatorUsernameIn: creatorFilterValue
        };
    }
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchParams)
    };

    fetch(API.getURLpostCircuits(), params)
    .then((response) => response.json())
    .then((dataCircuits) => {
        const circuits = dataCircuits.result;
        const boxZone = document.querySelector('#circuits');

        // delete the boxes
        while (boxZone.firstChild) boxZone.removeChild(boxZone.firstChild);

        // let's create the boxes
        for (let i = 0; i < circuits.length; i++) {
            const box = document.createElement('div');
            box.classList.add('circuit-box');
            document.querySelector('#circuits').appendChild(box);
        }

        const boxList = document.querySelectorAll('.circuit-box');

        for(let i = 0; i < boxList.length; i++) {
            boxList[i].setAttribute("name", circuits[i].circuitid);

            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            p1.textContent = `${circuits[i].circuitname}`;
            p2.textContent = `par ${circuits[i].creatorusername}`;

            boxList[i].appendChild(p1);
            boxList[i].appendChild(p2);

            boxList[i].addEventListener('click', () => {
                // display player best time

                for(let k = 0 ; k < boxList.length ; k++) {
                    boxList[k].classList.remove('selected');
                }

                boxList[i].classList.add('selected');

                const id = boxList[i].getAttribute("name");

                localStorage.circuitId = id;
                
                document.querySelector('#empty' + filter).classList.add('invisible');
                document.querySelector('#full' + filter).classList.remove('invisible');
                
                fetchParams = {
                    circuitIdIn: id
                };
                const params = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(fetchParams)
                };


                fetch(API.getURLgetCircuitInformation(), params)
                .then((response) => response.json())
                .then((dataCircuit) => {
                    
                    localStorage.setItem("circuitName", dataCircuit.circuitName);
                    localStorage.setItem("circuitLaps", dataCircuit.circuitLaps);

                    document.getElementById("circuit-name" + filter).innerText = dataCircuit.circuitName;
                    document.getElementById("score" + filter).textContent = `Score : ${dataCircuit.circuitScore}`;

                    if(localStorage.getItem("personal") === "false") document.getElementById("creator-name").innerText = "Créateur : " + dataCircuit.creatorUsername;

                    let temp = new Timer().timeToString(dataCircuit.creatorTime);
                    document.getElementById("creator-score" + filter).innerText = "Médaille auteur : " + temp;
                    
                    // to manage the 5 (or less) best scores
                    const leaderBoard = dataCircuit.leaderBoard;
                    if(leaderBoard[0] === null) {
                        document.querySelector("#leaderboard-players" + filter).textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
                    } else {
                        document.querySelector("#leaderboard-players" + filter).textContent = "";
                        for (let i = 0; i < 5; i++) {
                            
                            if (leaderBoard[2*i] !== undefined) {
                                const leaderboardPlayer = document.getElementById("leaderboard-players" + filter);
                                const player = document.createElement("p");
                                let time = new Timer();
                                player.innerText = leaderBoard[2*i] + " : " + time.timeToString(leaderBoard[2*i+1]);
                                leaderboardPlayer.appendChild(player);
                            } else {
                                // to skip end of for loop
                                i = 12;
                            }
                        }
                    }
                })
                .catch((err) => console.error(`error : dataCircuit : ${err}`));
            });
        }
    })
    .catch((error) => console.error(`fetch error : nbCircuits : ${error}`));

}

function fetchCircuits() {

    let fetchParams;

    // if filters then filter
    let circuitFilterValue = document.getElementById('name-filter').value;
    let creatorFilterValue = document.getElementById('creator-filter').value;

    if(circuitFilterValue === '' || circuitFilterValue === null) circuitFilterValue = undefined;
    if(creatorFilterValue === '' || creatorFilterValue === null) creatorFilterValue = undefined;

    // fetch the number of circuits
    if(localStorage.getItem("personal") === "true") {
        fetchParams = {
            personnalCircuitIn: "true",
            playerIdIn: +localStorage.getItem("playerId"),
            circuitNameIn: circuitFilterValue,
            creatorUsernameIn: creatorFilterValue
        };
    } else if(localStorage.getItem("personal") === "false") {
        fetchParams = {
            personnalCircuitIn: "false",
            circuitNameIn: circuitFilterValue,
            creatorUsernameIn: creatorFilterValue
        };
    }
    
    let params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchParams)
    };
    
    fetch(API.getURLpostCircuitsNumber(), params)
    .then((response) => response.json())
    .then((dataNb) => {
        const nbCircuits = dataNb.result.circuitnumber;
        const nbPages = Math.ceil(nbCircuits / 12);

        console.log(nbPages)
    
        if (nbPages <= 1) document.querySelector('#page-selector').classList.add('invisible');
    
        let currentPage = 1;
    
        fetchPage(1, nbPages);
    
        // eventListeners for the page selector, only if there is more than 1 page
        if(nbPages > 1) {
            document.querySelector('.fa-backward-step').addEventListener('click', () => {    // go back to the 1st page
                if(currentPage > 1) {
                    currentPage = 1;
                    fetchPage(1, nbPages);
                }
            });
            document.querySelector('.fa-backward').addEventListener('click', () => {
                if(currentPage > 1) fetchPage(--currentPage, nbPages);
            });
            document.querySelector('.fa-forward').addEventListener('click', () => {
                if(currentPage < nbPages) fetchPage(++currentPage, nbPages);
            });
            document.querySelector('.fa-forward-step').addEventListener('click', () => {
                if(currentPage < nbPages) {
                    currentPage = nbPages;
                    fetchPage(nbPages, nbPages);
                }
            });
       }
       
    })
    .catch((error) => console.error(`error : circuits : ${error}`));

}

/* MAIN PART OF THE SCRIPT */

// display the correct elements depending on whether the page is personal or not
if (localStorage.getItem("personal") === "false") {
    document.querySelectorAll('.true' ).forEach((elt) => { elt.classList.add('invisible'); });
    document.querySelectorAll('.false').forEach((elt) => { elt.classList.remove('invisible'); });
} else if (localStorage.getItem("personal") === "true") {
    document.querySelectorAll('.true' ).forEach((elt) => { elt.classList.remove('invisible'); });
    document.querySelectorAll('.false').forEach((elt) => { elt.classList.add('invisible'); });
}

// eventListener for the filters
document.getElementById('name-filter').addEventListener('keydown', () => {
    fetchCircuits();
});

document.getElementById('creator-filter').addEventListener('keydown', () => {
    fetchCircuits();
});

// boutton créer nouveau circuit
document.querySelector('#true button').addEventListener('click', () => {
    localStorage.setItem("modify", "false");
    location.href = "createCircuit.html";
});

document.querySelector('#playbutton').addEventListener('click', () => {
    localStorage.setItem("play", "true");
    localStorage.setItem("personal", "false");
    location.href = 'playCircuit.html';
});

document.getElementById('modify-button').addEventListener('click', (evt) => {
    console.log("modify-button clicked");
    localStorage.setItem("modify", "true");
    location.href = 'createCircuit.html';
});
document.querySelector('#play-button').addEventListener('click', () => {
    localStorage.setItem("play", "false");
    localStorage.setItem("personal", "false");
    location.href = 'playCircuit.html';
});

document.getElementById('delete-button').addEventListener('click', () => {
    console.log("delete-button clicked");
    
    const fetchParams = {
        circuitIdIn: localStorage.getItem('circuitId')
    };
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchParams)
    };
    
    fetch(API.getURLDeleteCircuit(), params)
       .then((response) => response.json())
       .then((dataDelete) => {
           if (dataDelete.success === "true") {
               localStorage.setItem("modify", "false");
               document.location.href = 'choiceCircuit.html';
           } else {
               console.error("deletion error");
           }
       });
});

fetchCircuits();
