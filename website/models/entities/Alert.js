export class Alert{
    message;
    motBouton;

    constructor(message, motBouton) {
        this.message = message;
        this.motBouton = motBouton;
    }

    customAlert() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');
        alertCustom.className = 'custom-alert';
        alertCustom.innerHTML = this.message;

        const closebutton = document.createElement('button');
        closebutton.id = 'buttonAlert';
        closebutton.innerHTML = this.motBouton;
        closebutton.addEventListener('click', function(){

            alertCustom.style.display = 'none';
            overlay.style.display ='none';

            console.log(closebutton.innerText);
            if (closebutton.innerText === "Se Connecter"){
                console.log('cahngemetn de page');
                document.location.href = "connection.html";
            }
        });

        alertCustom.appendChild(closebutton);
        document.body.appendChild(alertCustom);


        alertCustom.style.display = 'block';
        overlay.style.display = 'block';
    }
}