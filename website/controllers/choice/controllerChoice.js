import {API} from "../../models/API.js";

console.log(localStorage)

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
    let nbCircuits = dataNb.result.circuitnumber;

    // let's create the boxes
    for(let i = 0; i < nbCircuits; i++) {
        const box = document.createElement('div');
        box.classList.add('circuit-box');
        document.querySelector('#circuits').appendChild(box);
    }

    const nbPages = Math.ceil(nbCircuits / 12)

    // fetch the circuits
    fetchParams = {
        personnalCircuitIn: false,
        pageNumberIn: 1
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
        console.log(dataCircuits.result)
        const circuits = dataCircuits.result;

        const boxList = document.querySelectorAll('.circuit-box');

        for(let i = 0; i < boxList.length; i++) {
            boxList[i].setAttribute("name", circuits[i].circuitid)

            const p = document.createElement('p');
            p.textContent = circuits[i].circuitname
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
    .catch((error) => console.log(`error : circuits : ${error}`));







    // nbCircuits = data.result
})
.catch((error) => console.log(`fetch error : nbCircuits : ${error}`));



document.querySelector('.fa-backward-step').addEventListener('click', (evt) => {
    console.log('revenir a la premiere page')
});

document.querySelector('.fa-backward').addEventListener('click', (evt) => {
    console.log('reculer d une page')
});

document.querySelector('.fa-forward').addEventListener('click', (evt) => {
    console.log('avancer d une page')
});

document.querySelector('.fa-forward-step').addEventListener('click', (evt) => {
    console.log('aller a la derniere page')
});