export class Alert{
    message;

    constructor(message) {
        this.message = message;
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
        closebutton.innerHTML = 'Fermer !';
        closebutton.addEventListener('click', function(){

            alertCustom.style.display = 'none';
            overlay.style.display ='none';
        });

        alertCustom.appendChild(closebutton);
        document.body.appendChild(alertCustom);


        alertCustom.style.display = 'block';
        overlay.style.display = 'block';
    }
}