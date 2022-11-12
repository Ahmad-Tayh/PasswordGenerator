const options = document.querySelectorAll('.option input');
const chooseLength = document.querySelector('.strength input');
const showedPassLenght = document.querySelector('.strength .detailes .Length');
const genratedPass = document.querySelector('.input-field input');
const GenrateBtn = document.querySelector('.generate-btn');
const passIndecator = document.querySelector('.pass-indicator');
const copyIcon = document.querySelector('.input-field .material-symbols-rounded');

let optionsNb=1;
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const init = function () {
    chooseLength.value = 15;
    showedPassLenght.value = 15;
    let password = "";
    for (let i = 0; i < chooseLength.value; i++) {
        password += characters.lowercase[Math.floor(Math.random() * 26)];
    }

    genratedPass.value = password;
    //changeIndecatorOfStrength();
}
init();

const genratePassword = function () {
    let password = "";
    let duplicate = true;
    let genratedPassword = "";
    optionsNb=1;
    options.forEach(Option => {
        if (Option.checked) {
            optionsNb++;
            if (Option.id === 'spaces') {
                password += "   ";
            }
            else if (Option.id === 'exc-duplicate') {
                duplicate = false;
            }
            else {
                password += characters[Option.id];
            }
        }
    })

    j = 0;
    while (genratedPassword.length < password.length && j < chooseLength.value) {
        inPass = false;
        let char = password[Math.floor(Math.random() * password.length)];

        if (!duplicate) {
            for (let i = 0; i < genratedPassword.length; i++) {
                if (char === genratedPassword[i]) {
                    inPass = true;
                    break;
                }
            }
        }
        if (!inPass) {
            genratedPassword += char;
            j++;
        }
    }

    genratedPass.value = genratedPassword;
}

const changeIndecatorOfStrength = function(chooseLength){
    if(chooseLength<=8) passIndecator.id = 'weak';
    if(chooseLength>8 && chooseLength<=16) passIndecator.id = 'medium';
    if(chooseLength>16) passIndecator.id = 'strong';
}

const copyPass = function(){
    navigator.clipboard.writeText(genratedPass.value);
    copyIcon.innerText = 'Done';
    copyIcon.style.color = '#4285F4';
    setTimeout(() => { 
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1000);
}

const upadatePassSize = function () {
    showedPassLenght.innerText = chooseLength.value;
    genratePassword();
    changeIndecatorOfStrength(chooseLength.value);
}

chooseLength.addEventListener('input', upadatePassSize);
GenrateBtn.addEventListener('click', genratePassword);
copyIcon.addEventListener('click', copyPass);