import {API} from "../../models/API.js";

function fetchPage(nb, nbPages) {
    while(document.querySelector('#circuits').firstChild) document.querySelector('#circuits').removeChild(document.querySelector('#circuits').firstChild);

    document.querySelector('#page-selector p').textContent = `Page ${nb} / ${nbPages}`;

    // for further classes
    let filter = "";
    if(localStorage.personal === "true") filter = "-2";

    let fetchParams;

    // fetch the circuits
    if(localStorage.personal === "false") {
        fetchParams = {
            personnalCircuitIn: "false",
            pageNumberIn: nb
        };
    } else if(localStorage.personal === "true") {
        fetchParams = {
            personnalCircuitIn: "true",
            playerIdIn: +localStorage.playerId,
            pageNumberIn: nb
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
        console.log('PARTIE 2')
        console.log(dataCircuits)
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

            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            p1.textContent = `${circuits[i].circuitname}`;
            p2.textContent = `par ${circuits[i].creatorusername}`;

            boxList[i].appendChild(p1);
            boxList[i].appendChild(p2);

            boxList[i].addEventListener('click', () => {
                const id = boxList[i].getAttribute("name");

                localStorage.circuitId = id;
                console.log(`le circuitId actuel est ${localStorage.circuitId}`)

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
                    console.log(dataCircuit)

                    document.getElementById("circuit-name" + filter).innerText = dataCircuit.circuitName;

                    if(localStorage.personal === "true") document.getElementById("creator-name").innerText = "Créateur : " + dataCircuit.creatorUsername;
                    
                    document.getElementById("creator-score" + filter).innerText = "Médaille auteur : " + dataCircuit.creatorTime;

                    // to manage the 5 (or less) best scores
                    if(dataCircuit.leaderBoard === null) {
                        document.querySelector("#leaderboard-players" + filter).textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
                    } else {
                        let i = 0;
                        for (let player in document.querySelector('#leaderboard-players' + filter + ' p')) {
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

function fetchCircuits() {

    let fetchParams;

    if(localStorage.personal === "true") {
        fetchParams = {
            personnalCircuitIn: "true",
            playerIdIn: +localStorage.playerId
        };
    } else if(localStorage.personal === "false") {
        fetchParams = {
            personnalCircuitIn: "false"
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
        console.log(dataNb)
        const nbCircuits = dataNb.result.circuitnumber;
        const nbPages = Math.ceil(nbCircuits / 12);
    
        // à décommenter plus tard
        //if(nbPages === 1) document.querySelector('#page-selector').classList.add('invisible');
    
        let currentPage = 1;
    
        fetchPage(1, nbPages);
    
        // eventListeners for the page selector, only if there is more than 1 page
        //if(nbPages > 1) {
            document.querySelector('.fa-backward-step').addEventListener('click', (evt) => {    // go back to the 1st page
                if(currentPage > 1) {
                    currentPage = 1;
                    fetchPage(1, nbPages);
                }
            });
            
            document.querySelector('.fa-backward').addEventListener('click', (evt) => {
                if(currentPage > 1) fetchPage(--currentPage, nbPages);
            });
            
            document.querySelector('.fa-forward').addEventListener('click', (evt) => {
                if(currentPage < nbPages) fetchPage(++currentPage, nbPages);
            });
            
            document.querySelector('.fa-forward-step').addEventListener('click', (evt) => {
                if(currentPage < nbPages) {
                    currentPage = nbPages;
                    fetchPage(nbPages, nbPages);
                }
            });
       // }

    })
    .catch((error) => console.log(`error : circuits : ${error}`));

}

/* MAIN PART OF THE SCRIPT */

// à retirer plus tard
localStorage.personal = "true";

// display the correct elements depending on whether the page is personal or not
if(localStorage.personal === "false") {
    document.querySelectorAll('.true').forEach((elt) => { elt.classList.add('invisible'); });
    document.querySelectorAll('.false').forEach((elt) => { elt.classList.remove('invisible'); });
} else if(localStorage.personal === "true") {
    document.querySelectorAll('.true').forEach((elt) => { elt.classList.remove('invisible'); });
    document.querySelectorAll('.false').forEach((elt) => { elt.classList.add('invisible'); });
}





fetchCircuits();

const filter = document.querySelector('#filter select');
console.log('PARTIE FILTR')
console.log(filter.value)

filter.addEventListener('change', (evt) => {
    console.log(filter.value)

    if(filter.value === "Créateur") {
        console.log('okkk')
    }
})

