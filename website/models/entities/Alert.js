/*
    different types :
        - warning : lack of vroumCoin, need a connection...
        - input : need to enter text
        - startCircuit : before the start of the race
        - endCircuit : after the end of the race
 */
window.localStorage.setItem("inputField", "");
export class Alert{
    message;
    motBouton;
    lien;
    type;


    constructor(message, motBouton, lien, type) {
        this.message = message;
        this.motBouton = motBouton;
        this.lien = lien;
        this.type = type;
        console.log(this.lien);
    }

    customAlert() {
        //console.log(this.lien);
        console.log(this.type);

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');

        alertCustom.className = 'custom-alert';

        switch(this.type){
            case 'warning':
                this.alertWarning(alertCustom, overlay);
                break;
            case 'input' :
                this.alertInput(alertCustom, overlay);
                break;
            default:
                console.log('Aucun cas ne correspond !');
        }

        alertCustom.style.display = 'block';
        overlay.style.display = 'block';
    }


    alertWarning(alertCustom, overlay){
        // css :
        alertCustom.style.background = '#ff5f5f';
        alertCustom.style.color = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);



        // css :
        closeButton.style.background = '#d83232';
        closeButton.style.color = '#ffffff'

        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#000000';
        });

        closeButton.addEventListener('mouseleave', () => {

            closeButton.style.backgroundColor = '#d83232'; // ou une autre couleur si nécessaire
        });




        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id = 'pMessage';
        alertCustom.appendChild(pMessage);

        const actionbutton = document.createElement('button');
        actionbutton.id = 'buttonAlert';
        actionbutton.innerHTML = this.motBouton;

        // css :
        actionbutton.style.background = '#d93232';
        actionbutton.style.color = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display ='none';
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display ='none';

            console.log(actionbutton.innerText);
            console.log(this.lien);
            if (this.lien != null){
                console.log('changement de page');
                document.location.href = this.lien;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }


    alertInput(alertCustom, overlay){
        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';


        const closeButton = document.createElement('button');
        closeButton.id = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#0048fd';
        closeButton.style.color = '#ffffff';

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id = 'pMessage';
        alertCustom.appendChild(pMessage);

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.className = 'inputField';
        inputField.placeholder = 'Entrez un nom de circuit ici...';
        alertCustom.appendChild(inputField);

        const actionbutton = document.createElement('button');
        actionbutton.id = 'buttonAlert';
        actionbutton.innerHTML = this.motBouton;

        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display ='none';
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display ='none';

            console.log(actionbutton.innerText);
            console.log(this.lien);
            console.log(inputField.value);
            if (this.lien != null){
                console.log(inputField.value);
                console.log('changement de page');
                localStorage.setItem('inputField', inputField.value);
                document.location.href = this.lien;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }


    alertEndCircuit(point, nbTour, result){
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');

        alertCustom.className = 'custom-alert';

        alertCustom.style.backgroundColor = 'rgba(84, 88, 91, 0.7)';
        alertCustom.style.color = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#44464a';
        closeButton.style.color = '#ffffff';


        //alertCustom.innerHTML = this.message+'<br>';
        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        alertCustom.appendChild(pMessage);
        pMessage.style.fontSize = '30px';

        const pPoint = document.createElement('p');
        pPoint.innerText = 'Nombre de points : ' + point;
        alertCustom.appendChild(pPoint);

        const pResultat = document.createElement('p');
        pResultat.innerText = 'Resultat :';
        alertCustom.appendChild(pResultat);

        for (let i = 0;  i<nbTour ; i++){
            const pTemps = document.createElement('p');
            let numTemps = i+1;
            pTemps.innerText = 'Temps n°' + numTemps + ' : ' + result[i];
            alertCustom.appendChild(pTemps);
        }


        const actionbutton = document.createElement('button');
        actionbutton.id = 'buttonAlert';
        actionbutton.innerHTML = this.motBouton;

        // css :
        actionbutton.style.background = '#414141';
        actionbutton.style.color = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display ='none';
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display ='none';

            console.log(closebutton.innerText);
            console.log(this.lien);
            if (this.lien != null){
                console.log('changement de page');
                document.location.href = this.lien;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);

        alertCustom.style.display = 'block';
        overlay.style.display = 'block';
    }

    alertStartCircuit(nbTour){
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');

        alertCustom.className = 'custom-alert';

        alertCustom.style.backgroundColor = 'rgba(84, 88, 91, 0.7)';
        alertCustom.style.color = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#44464a';
        closeButton.style.color = '#ffffff';


        //alertCustom.innerHTML = this.message+'<br>';
        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        alertCustom.appendChild(pMessage);
        pMessage.style.fontSize = '30px';

        const pNbTour = document.createElement('p');
        pNbTour.innerText = 'Nombre de tour : ' + nbTour;
        alertCustom.appendChild(pNbTour);

        const pEncouragement = document.createElement('p');
        pEncouragement.innerText = 'Bonne Chance !';
        alertCustom.appendChild(pEncouragement);


        const actionbutton = document.createElement('button');
        actionbutton.id = 'buttonAlert';
        actionbutton.innerHTML = this.motBouton;

        // css :
        actionbutton.style.background = '#414141';
        actionbutton.style.color = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display ='none';
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display ='none';

            console.log(closebutton.innerText);
            console.log(this.lien);
            if (this.lien != null){
                console.log('changement de page');
                document.location.href = this.lien;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);

        alertCustom.style.display = 'block';
        overlay.style.display = 'block';
    }
}