import {API} from "../../models/API.js";

function fetchPage(nb) {
    while(document.querySelector('#circuits').firstChild) document.querySelector('#circuits').removeChild(document.querySelector('#circuits').firstChild);

    // fetch the circuits
    fetchParams = {
        personnalCircuitIn: false,
        pageNumberIn: nb
    };
    
    params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchParams)
    };

    fetch(API.getURLpostCircuits(), params)
    .then((response) => response.json())
    .then((dataCircuits) => {
        console.log('PARTIE 2')
        console.log(dataCircuits.result.length)
        const circuits = dataCircuits.result;

        // let's create the boxes
        for(let i = 0; i < circuits.length; i++) {
            const box = document.createElement('div');
            box.classList.add('circuit-box');
            document.querySelector('#circuits').appendChild(box);
        }

        const boxList = document.querySelectorAll('.circuit-box');

        for(let i = 0; i < boxList.length; i++) {
            boxList[i].setAttribute("name", circuits[i].circuitid);

            const p = document.createElement('p');
            p.textContent = circuits[i].circuitname;
            boxList[i].appendChild(p)

            boxList[i].addEventListener('click', (evt) => {
                const id = boxList[i].getAttribute("name");

                localStorage.circuitId = id;
                console.log(`le circuitId actuel est ${localStorage.circuitId}`)

                document.querySelector('#empty').classList.add('invisible');
                document.querySelector('#full').classList.remove('invisible');
                
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
                    console.log(dataCircuit)
                    document.getElementById("circuit-name").innerText = dataCircuit.circuitName;
                    document.getElementById("creator-name").innerText = "Créateur : " + dataCircuit.creatorUsername;
                    document.getElementById("creator-score").innerText = "Médaille auteur : " + dataCircuit.creatorTime;

                    // to manage the 5 (or less) best scores
                    if(dataCircuit.leaderBoard === null) {
                        document.querySelector("#leaderboard-players").textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
                    } else {
                        let i = 0;
                        for (let player in document.querySelector('#leaderboard-players p')) {
                            player.textContent = dataCircuit.leaderBoard[i] + " : " + dataCircuit.leaderBoard[i+1];
                            i += 2;
                        }
                    }
                })
                .catch((err) => console.log(`error : dataCircuit : ${err}`));
            });
        }
    })
    .catch((error) => console.log(`fetch error : nbCircuits : ${error}`));
}


/* MAIN PART OF THE SCRIPT */

let fetchParams = {
    personnalCircuitIn: false
};

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

    fetchPage(1);

    // eventListeners for the page selector, only if there is more than 1 page
    //if(nbPages > 1) {
        document.querySelector('.fa-backward-step').addEventListener('click', (evt) => {    // go back to the 1st page
            fetchPage(1);
        });
        
        document.querySelector('.fa-backward').addEventListener('click', (evt) => {
            if(currentPage > 1) fetchPage(--currentPage);
        });
        
        document.querySelector('.fa-forward').addEventListener('click', (evt) => {
            if(currentPage < nbPages) fetchPage(++currentPage);
        });
        
        document.querySelector('.fa-forward-step').addEventListener('click', (evt) => {
            fetchPage(nbPages);
        });
   // }

        

})
.catch((error) => console.log(`error : circuits : ${error}`));

