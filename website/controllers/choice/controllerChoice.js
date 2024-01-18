import { API } from "../../models/API.js";

function fetchPage(nb, nbPages) {
    while(document.querySelector('#circuits').firstChild) document.querySelector('#circuits').removeChild(document.querySelector('#circuits').firstChild);

    document.querySelector('#page-selector p').textContent = `Page ${nb} / ${nbPages}`;

    // for further classes
    let filter = "";
    if(localStorage.personal === "true") filter = "-2";

    // if filters then filter
    let circuitFilterValue = document.getElementById('name-filter').value;
    let creatorFilterValue = document.getElementById('creator-filter').value;
    if(circuitFilterValue === '' || circuitFilterValue === null) circuitFilterValue = undefined;
    if(creatorFilterValue === '' || creatorFilterValue === null) creatorFilterValue = undefined;

    let fetchParams;

    // fetch the circuits
    if(localStorage.personal === "false") {
        fetchParams = {
            personnalCircuitIn: "false",
            pageNumberIn:      nb,
            circuitNameIn:     circuitFilterValue,
            creatorUsernameIn: creatorFilterValue
        };
    } else if(localStorage.personal === "true") {
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
        while(boxZone.firstChild) boxZone.removeChild(boxZone.firstChild);

        // let's create the boxes
        for(let i = 0; i < circuits.length; i++) {
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

                    document.getElementById("circuit-name" + filter).innerText = dataCircuit.circuitName;
                    document.getElementById("score").textContent = `Score : ${dataCircuit.circuitScore}`;

                    if(localStorage.personal === "false") document.getElementById("creator-name").innerText = "Créateur : " + dataCircuit.creatorUsername;
                    
                    document.getElementById("creator-score" + filter).innerText = "Médaille auteur : " + dataCircuit.creatorTime;
                    
                    // to manage the 5 (or less) best scores
                    const leaderBoard = dataCircuit.leaderBoard;
                    if(leaderBoard[0] === null) {
                        document.querySelector("#leaderboard-players").textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
                    } else {
                        document.querySelector("#leaderboard-players").textContent = "";
                        for (let i = 0; i < 5; i++) {
                            
                            if (leaderBoard[2*i] !== undefined) {
                                const leaderboardPlayer = document.getElementById("leaderboard-players");
                                const player = document.createElement("p");
                                player.innerText = leaderBoard[2*i] + " : " + leaderBoard[2*i+1];
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
    
        // à décommenter plus tard
        //if(nbPages === 1) document.querySelector('#page-selector').classList.add('invisible');
    
        let currentPage = 1;
    
        fetchPage(1, nbPages);
    
        // eventListeners for the page selector, only if there is more than 1 page
        //if(nbPages > 1) {
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
       // }
       
    })
    .catch((error) => console.error(`error : circuits : ${error}`));

}

/* MAIN PART OF THE SCRIPT */

// à retirer plus tard
localStorage.personal = "false";

// display the correct elements depending on whether the page is personal or not
if(localStorage.personal === "false") {
    document.querySelectorAll('.true' ).forEach((elt) => { elt.classList.add('invisible'); });
    document.querySelectorAll('.false').forEach((elt) => { elt.classList.remove('invisible'); });
} else if(localStorage.personal === "true") {
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

fetchCircuits();

