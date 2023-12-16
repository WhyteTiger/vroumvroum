function change(v) {
    const content = document.querySelector('#tile-selector');
    while(content.firstChild) content.removeChild(content.firstChild);

    let p = document.createElement('p');

    switch(v) {
        case 1 :
            p.textContent = 'les tuiles !';
            break;
        case 2 :
            p.textContent = 'les départs et arrivées !';
            break;
        case 3 :
            p.textContent = 'les checkpoints !';
            break;
    }

    content.appendChild(p);
}

document.querySelector('#buttons-info').addEventListener('click', (evt) => {
    const buttons = document.querySelectorAll('.chooser');
    
    for(let i = 0 ; i < buttons.length ; i++) {
        // to modify the class
        if(buttons[i] === evt.target) {

            buttons[i].classList.add('selected');
            switch(buttons[i].id) {
                case 'b1' :
                    change(1);
                    break;
                case 'b2' :
                    change(2);
                    break;
                case 'b3' :
                    change(3);
            }
        }
        else buttons[i].classList.remove('selected');
    }
});