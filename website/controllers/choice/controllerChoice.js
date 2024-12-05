// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { Timer }    from "../../models/entities/Timer.js";
import { Circuits } from "../../models/entities/Circuits.js";

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/hubsMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();

function fetchPage(nb, nbPages) {
    while(document.querySelector('#circuits').firstChild) document.querySelector('#circuits').removeChild(document.querySelector('#circuits').firstChild);

    document.querySelector('#pageSelector p').textContent = `Page ${nb} / ${nbPages}`;

    const isPersonalPage = localStorage.getItem("personal");
    
    // for further classes
    let filter = isPersonalPage === "true" ? "Personal" : "";

    // if filters then filter
    let circuitFilterValue = document.getElementById('nameFilter').value;
    let creatorFilterValue = document.getElementById('creatorFilter').value;
    if(circuitFilterValue === '' || circuitFilterValue === null) circuitFilterValue = undefined;
    if(creatorFilterValue === '' || creatorFilterValue === null) creatorFilterValue = undefined;
    
    const circuits = Circuits.getCircuits(circuitFilterValue, creatorFilterValue, nb);
    const boxZone = document.querySelector('#circuits');
    
    // delete the boxes
    while (boxZone.firstChild) boxZone.removeChild(boxZone.firstChild);
    
    // let's create the boxes
    for (let i = 1; i <= circuits.length; i++) {
        const box = document.createElement('div');
        box.classList.add('circuitBox');
        document.querySelector('#circuits').appendChild(box);
    }
    
    const boxList = document.querySelectorAll('.circuitBox');
    
    for(let i = 0; i < boxList.length; i++) {
        boxList[i].setAttribute("name", circuits[i].getCircuitId());
        
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        p1.textContent = `${circuits[i].getCircuitName()}`;
        p2.textContent = `par ${circuits[i].getCreatorName()}`;
        
        boxList[i].appendChild(p1);
        boxList[i].appendChild(p2);
        
        boxList[i].addEventListener('click', () => {
            
            for(let k = 0 ; k < boxList.length ; k++) {
                boxList[k].classList.remove('selected');
            }
            
            boxList[i].classList.add('selected');

            const circuitId = boxList[i].getAttribute("name");
            localStorage.circuitId = circuitId;
            
            document.querySelector('#empty'+ filter).classList.add('invisible');
            document.querySelector('#full'+  filter).classList.remove('invisible');
            
           const circuit = Circuits.get(circuitId);
            
            localStorage.setItem("circuitName", circuit.getCircuitName());
            localStorage.setItem("circuitLaps", circuit.getCircuitLaps());
            
            document.getElementById("circuitName"+ filter).innerText = circuit.getCircuitName();
            document.getElementById("score"+ filter).textContent = `Score : ${circuit.getCircuitScore()}`;
            
            if (isPersonalPage === "false") document.getElementById("creatorName").innerText = "Créateur : "+ circuit.getCreatorName();
            
            let temp = new Timer().timeToString(circuit.getCreatorTime);
            document.getElementById("creatorScore" + filter).innerText = "Médaille auteur : "+ temp;
            
            // to manage the 5 (or less) best scores
            const leaderBoard = circuit.getLeaderBoard();
            if(leaderBoard[0] === null) {
                document.querySelector("#leaderboardPlayers" + filter).textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
            } else {
                document.querySelector("#leaderboardPlayers" + filter).textContent = "";
                for (let i = 0; i < 5; i++) {
                    
                    if (leaderBoard[2*i] !== undefined) {
                        const leaderboardPlayer = document.getElementById("leaderboardPlayers"+ filter);
                        const player = document.createElement("p");
                        let time = new Timer();
                        player.innerText = leaderBoard[2*i] +" : "+ time.timeToString(leaderBoard[2*i+1]);
                        leaderboardPlayer.appendChild(player);
                    } else {
                        // to skip end of for loop
                        i = 12;
                    }
                }
            }
        });
    }
}

function fetchCircuits() {
    
    const nbCircuits = Circuits.getCircuitsNumber();
    if (nbCircuits <= 0) {
        document.querySelector('#pageSelector').classList.add('invisible');
        return;
    }
    
    const nbPages = Math.ceil(nbCircuits / 12);
    if (nbPages <= 1) document.querySelector('#pageSelector').classList.add('invisible');
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
}

/* MAIN PART OF THE SCRIPT */

const isPersonalPage = localStorage.getItem("personal");

// display the correct elements depending on whether the page is personal or not
if (isPersonalPage === "false") {
    document.querySelectorAll('.personalPage' ).forEach((elt) => { elt.classList.add('invisible'); });
    document.querySelectorAll('.universalPage').forEach((elt) => { elt.classList.remove('invisible'); });
    document.querySelectorAll('#createNewCircuit').forEach((elt) => {elt.style.display = 'none'})
} else if (isPersonalPage === "true") {
    document.querySelectorAll('.personalPage' ).forEach((elt) => { elt.classList.remove('invisible'); });
    document.querySelectorAll('.universalPage').forEach((elt) => { elt.classList.add('invisible');});
}

// eventListener for the filters
document.getElementById('nameFilter').addEventListener('keydown', () => {
    fetchCircuits();
});

document.getElementById('creatorFilter').addEventListener('keydown', () => {
    fetchCircuits();
});

// bouton créer nouveau circuit
document.querySelector('#createNewCircuit button').addEventListener('click', () => {
    localStorage.setItem("modify",   "false");
    localStorage.setItem("personal", "true");
    location.href = "createCircuit.html";
});

document.querySelector('#playButton').addEventListener('click', () => {
    localStorage.setItem("verifying", "false");
    localStorage.setItem("personal",  "false");
    location.href = 'playCircuit.html';
});

document.getElementById('modifyButtonPersonal').addEventListener('click', (evt) => {
    localStorage.setItem("modify",   "true");
    localStorage.setItem("personal", "true");
    location.href = 'createCircuit.html';
});
document.querySelector('#playButtonPersonal').addEventListener('click', () => {
    localStorage.setItem("verifying", "false");
    localStorage.setItem("personal",  "true");
    location.href = 'playCircuit.html';
});

document.getElementById('deleteButtonPersonal').addEventListener('click', () => {
    
    const circuitId = localStorage.getItem('circuitId');
    Circuits.remove(circuitId);
    
    localStorage.setItem("modify", "false");
    document.location.href = 'choiceCircuit.html';
});

fetchCircuits();
