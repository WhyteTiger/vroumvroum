import {API} from "../../models/API.js";

console.log(localStorage)

let nbCircuits;

const circuitId = localStorage.circuitId
const url = API.getURLpostCircuitsNumber();

const dataCircuit = {
    personnalCircuitIn: false,
    circuitIdIn: circuitId
};

const params = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(dataCircuit)
};

fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
        console.log('OKeeeee')
        console.log(data)
        console.log(data.result.circuitnumber)

        nbCircuits = data.result.circuitnumber;

        // let's create the boxes
        for(let i = 0; i < nbCircuits; i++) {
            const box = document.createElement('div');
            box.classList.add('circuit-box');

            document.querySelector('#circuits').appendChild(box);
            console.log('yes')
        }

        console.log(Math.round(55 / 12) + 1)



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