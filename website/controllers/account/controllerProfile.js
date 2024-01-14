const input = document.getElementById('compteImg');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const form = document.getElementById('formCompte');
const inputs = form.getElementsByTagName('input');
const pseudo = document.getElementById('pseudo');

pseudo.value = window.localStorage.username;


input.addEventListener('change', function() {
    const preview = document.getElementById('previewImage');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e){
            preview.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
})


editButton.addEventListener('click', function(){

    for (let i = 0; i<inputs.length; i++){
        inputs[i].removeAttribute('readonly');
        inputs[i].style.color = 'black';
    }

    saveButton.style.display = 'block';
    editButton.style.display = 'none';
});

saveButton.addEventListener('click', function(){
    for (let i = 0; i<inputs.length; i++){
        inputs[i].setAttribute('readonly', true);
        inputs[i].style.color = 'gray';
    }

    window.localStorage.setItem('username', pseudo.value);

    saveButton.style.display = 'none';
    editButton.style.display = 'block';
})