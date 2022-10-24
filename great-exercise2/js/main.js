var loginPage = document.getElementById('login');
var signUpPage = document.getElementById('sign-up');
window.onclick = function (event) {
    if (event.target == signUpPage) {
        Close('sign-up')
    }
    if (event.target == loginPage) {
        Close("login")
    }
}
//
function Close(name) {
    var temp = document.querySelectorAll(`.${name}__account input`);
    for (var i = 0; i < temp.length; i++){
        temp[i].value = "";
        label[i].classList.remove('focus');
    }
    var closePage = document.getElementById(`${name}`);
    closePage.style.display = "none";
}

//
var label = document.querySelectorAll(".sign-up__account label,.login__account label");
var input = document.querySelectorAll(".sign-up__account input,.login__account input");
for (let i = 0; i < label.length; i++){
    input[i].onblur = function () {
        if (input[i].value == '') {
            label[i].classList.remove('focus');
        }     
    }
    input[i].onfocus = function () {
        label[i].classList.add('focus');
    }
}