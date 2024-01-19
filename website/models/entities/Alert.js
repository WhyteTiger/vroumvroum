/*
    different types :
        - warning      : lack of vroumCoin, need a connection...
        - input        : need to enter text
        - startCircuit : before the start of the race
        - endCircuit   : after the end of the race
        - save         : to save circuit
        - imgProfile   : choice the image of profile
 */

import { API } from "../API.js";

window.localStorage.setItem("inputField", "");
export class Alert{
    message;
    labelButton;
    link;
    type;

    constructor(message, labelButton, link, type) {
        this.message     = message;
        this.labelButton = labelButton;
        this.link        = link;
        this.type        = type;
        this.buttonClick = 0;
        console.log(this.link);
    }
    getIsButtonClicked(){
        return this.buttonClick;
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
            case 'imgProfile' :
                this.alertImgProfile(alertCustom, overlay);
                break;
            case 'save' :
                this.alertSave(alertCustom, overlay);
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
        actionbutton.innerHTML = this.labelButton;

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
            console.log(this.link);
            if (this.link != null){
                console.log('changement de page');
                document.location.href = this.link;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }


    alertInput(alertCustom, overlay){
        console.log("alertInput start");

        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color      = '#ffffff';
        alertCustom.style.border     = '1px solid #d9323';


        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);

        // css :
        closeButton.style.background = '#0048fd';
        closeButton.style.color      = '#ffffff';

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        const inputField = document.createElement('input');
        inputField.type        = 'text';
        inputField.className   = 'inputField';
        inputField.placeholder = 'Entrez du texte...';
        alertCustom.appendChild(inputField);

        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
        });

        actionbutton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';

            localStorage.setItem('inputField', inputField.value);

            console.log("actionbutton.innerText : "+ actionbutton.innerText);
            console.log("this.link : "+ this.link);
            console.log("inputField.value : "+ inputField.value);
            if (this.link != null){
                console.log("inputField.value : "+ inputField.value);
                console.log('changement de page');
                document.location.href = this.link;
            }
        });
        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);

        console.log("alertInput start");
    }


    alertEndCircuit(point, temps){
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
        pPoint.innerText = 'VroumCoin gagné : ' + point;
        alertCustom.appendChild(pPoint);

        
        const pTemps = document.createElement('p');
        pTemps.innerText = "Temps : " + temps;
        alertCustom.appendChild(pTemps);


        const actionbutton = document.createElement('button');
        actionbutton.id = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#414141';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            document.location.href = "choiceCircuit.html";
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            if (this.link != null){
                console.log('changement de page');
                document.location.href = this.link;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);

        alertCustom.style.display = 'block';
        overlay.style.display = 'block';
    }

    alertStartCircuit(creator, temps){
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');

        alertCustom.className = 'custom-alert';

        alertCustom.style.backgroundColor = 'rgba(84, 88, 91, 0.7)';
        alertCustom.style.color  = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#44464a';
        closeButton.style.color      = '#ffffff';


        //alertCustom.innerHTML = this.message+'<br>';
        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        alertCustom.appendChild(pMessage);
        pMessage.style.fontSize = '30px';

        const pCreateur = document.createElement('p');
        pCreateur.innerText = "Créateur : " + creator;
        alertCustom.appendChild(pCreateur);

        const pTemps = document.createElement('p');
        pTemps.innerText = "Temps à battre : " + temps;
        alertCustom.appendChild(pTemps);

        const pEncouragement = document.createElement('p');
        pEncouragement.innerText = 'Bonne Chance !';
        alertCustom.appendChild(pEncouragement);


        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#414141';
        actionbutton.style.color = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            document.location.href = this.link;
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display ='none';
            this.buttonClick = 1;
            
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);

        alertCustom.style.display = 'block';
        overlay.style.display     = 'block';
    }

    alertImgProfile(alertCustom, overlay){
        console.log("alertImgProfile start");
        // css :
        alertCustom.style.background = '#5fdaff';
        alertCustom.style.color      = '#000000';
        alertCustom.style.border     = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);

        // css :
        closeButton.style.background = '#2299b9';
        closeButton.style.color      = '#ffffff';

        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#000000';
        });

        closeButton.addEventListener('mouseleave', () => {

            closeButton.style.backgroundColor = '#2299b9'; // ou une autre couleur si nécessaire
        });

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        let selectedCanvas = null;

        console.log("tileSet");
        const tileset = new Image();
        tileset.src = "../../../assets/tilesets/circuit.png";
        console.log("tileset.src : "+ tileset.src);

        console.log("tileset.onload sans onload start");

        for (let i = 0; i < 12; i++) {
            const canvas = document.createElement('canvas');
            canvas.width  = 60;
            canvas.height = 60;
            canvas.style.marginRight = '10px';

            const ctx = canvas.getContext('2d');

            canvas.id = i;
            const tileSize = 160;
            const rotation = 0;

            const tileX = i * tileSize;
            const tileY = 4 * 160;

            ctx.save();
            ctx.translate(0, 0);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
            ctx.restore();

            canvas.addEventListener('click', (event) => {
                const canvasId = canvas.id;
                console.log('Canvas cliqué, ID:', canvasId);

                if (selectedCanvas) {
                    selectedCanvas.style.border = 'none';
                }
                selectedCanvas = canvas;
                canvas.style.border = '1px solid #000';

                localStorage.setItem("imgProfilId", canvasId);

                Alert.updateProfileImage(localStorage.imgProfilId);
            });

            alertCustom.appendChild(canvas);


        }
        setTimeout(() => {
            const actionbutton = document.createElement('button');
            actionbutton.id        = 'buttonAlert';
            actionbutton.innerText = this.labelButton;

            // css :
            actionbutton.style.background = '#2299b9';
            actionbutton.style.color      = '#ffffff';

            closeButton.addEventListener('click', () => {
                alertCustom.style.display = 'none';
                overlay.style.display     = 'none';
                Alert.updateProfileImage(localStorage.imgProfilId);
            });

            actionbutton.addEventListener('click', () => {

                alertCustom.style.display = 'none';
                overlay.style.display     = 'none';

                console.log(actionbutton.innerText);
                console.log(this.link);
                if (this.link != null) {
                    console.log('changement de page');
                    document.location.href = this.link;
                }
                Alert.updateProfileImage(localStorage.imgProfilId);
            });

            alertCustom.appendChild(actionbutton);
            document.body.appendChild(alertCustom);

            console.log("tileset.onload sans onload end");
        },200);



        //LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa
        /*
        tileset.onload = () => {
            console.log("tileset.onload start");

            for (let i = 0; i < 12; i++) {
                const canvas = document.createElement('canvas');
                canvas.width  = 60;
                canvas.height = 60;
                canvas.style.marginRight = '10px';

                const ctx = canvas.getContext('2d');

                canvas.id = i;
                const tileSize = 160;
                const rotation = 0;

                const tileX = i * tileSize;
                const tileY = 4 * 160;

                ctx.save();
                ctx.translate(0, 0);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
                ctx.restore();

                canvas.addEventListener('click', (event) => {
                    const canvasId = canvas.id;
                    console.log('Canvas cliqué, ID:', canvasId);

                    if (selectedCanvas) {
                        selectedCanvas.style.border = 'none';
                    }
                    selectedCanvas = canvas;
                    canvas.style.border = '1px solid #000';

                    window.localStorage.setItem("imgProfilId", canvasId);

                    updateProfileImage(window.localStorage.imgProfilId);
                });
                alertCustom.appendChild(canvas);
            }

            const actionbutton = document.createElement('button');
            actionbutton.id        = 'buttonAlert';
            actionbutton.innerText = this.labelButton;

            // css :
            actionbutton.style.background = '#2299b9';
            actionbutton.style.color      = '#ffffff';

            closeButton.addEventListener('click', () => {
                alertCustom.style.display = 'none';
                overlay.style.display     = 'none';
                updateProfileImage(window.localStorage.imgProfilId);
            });

            actionbutton.addEventListener('click', () => {

                alertCustom.style.display = 'none';
                overlay.style.display     = 'none';

                console.log(actionbutton.innerText);
                console.log(this.link);
                if (this.link != null) {
                    console.log('changement de page');
                    document.location.href = this.link;
                }
                updateProfileImage(window.localStorage.imgProfilId);
            });

            alertCustom.appendChild(actionbutton);
            document.body.appendChild(alertCustom);

            console.log("tileset.onload end");
        }

         */

        console.log("alertImgProfile end");
    };

    static updateProfileImage(imgProfilId) {
        console.log('img : ' + imgProfilId);
        const tileset = new Image();
        tileset.src = "../../assets/tilesets/circuit.png";

        tileset.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const tileSize = 160;

            const tileX = imgProfilId * tileSize;
            const tileY = 4 * 160;

            canvas.width  = 150;
            canvas.height = 150;

            ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
            previewImage.src = canvas.toDataURL('image/png');
        };

        const playerId = localStorage.getItem("playerId");

        const url      = API.getURLupdatePPIdOfPlayerId();
        const dataPP = {
            playerIdIn: playerId,
            newPPIdIn:  imgProfilId
        };
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPP)
        };
        console.log(params);

        fetch(url, params)
           .then((response) => response.json())
           .then((result) => {
               console.log(result);
           });
    }

    alertSave(alertCustom, overlay){
        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';


        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#0048fd';
        closeButton.style.color = '#ffffff';

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        const circuitNameInput = document.createElement('input');
        circuitNameInput.type        = 'text';
        circuitNameInput.className   = 'inputField';
        circuitNameInput.placeholder = 'Nom du circuit...';
        alertCustom.appendChild(circuitNameInput);

        const circuitLapsInput = document.createElement('input');
        circuitLapsInput.type        = 'text';
        circuitLapsInput.className   = 'inputField';
        circuitLapsInput.placeholder = 'Nombre de tours...';
        alertCustom.appendChild(circuitLapsInput);

        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';

            console.log(actionbutton.innerText);
            console.log(this.link);
            console.log("circuitNameInput.value : "+ circuitNameInput.value);
            console.log("circuitLapsInput.value : "+ circuitLapsInput.value);
            if (circuitNameInput.value === "" || !circuitLapsInput.value.match(/^[0-9]$/)) {
                const errorAlert = new Alert("Veuillez remplir la première entrée et \nmettre un chiffre dans la deuxième", "OK", "", "warning");
                errorAlert.customAlert();
            } else {
                if (this.link != null){
                    localStorage.setItem('circuitName', circuitNameInput.value);
                    localStorage.setItem('circuitLaps', circuitLapsInput.value);
                    console.log('changement de page');
                    document.location.href = this.link;
                }
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }
}

/*
function updateProfileImage(imgProfilId) {
    console.log('img' + imgProfilId);
    const tileset = new Image();
    tileset.src = "../../assets/tilesets/circuit.png";

    tileset.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const tileSize = 160;

        const tileX = imgProfilId * tileSize;
        const tileY = 4 * 160;

        canvas.width  = 150;
        canvas.height = 150;

        ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
        previewImage.src = canvas.toDataURL('image/png');
    };
}

 */