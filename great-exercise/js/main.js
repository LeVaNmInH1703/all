var loginPage = document.getElementById('login');
var signUpPage = document.getElementById('sign-up');
window.onclick = function (event) {
    if (event.target == signUpPage) {
        signUpPage.style.display = "none";
    }
    if (event.target == loginPage) {
        loginPage.style.display = "none";
    }
}

//
var label = document.querySelectorAll(".sign-up__account label,.login__account label");
var input = document.querySelectorAll(".sign-up__account input,.login__account input");
for (let i = 0; i < label.length; i++){
    input[i].addEventListener("checked", function () {
        label[i].classList.add("focus")
    })
    input[i].addEventListener("mouseover", function () {
        label[i].classList.add("focus")
    })
    input[i].addEventListener("mouseout", function () {
        if(input[i].value=="")
            label[i].classList.remove("focus");
    })
}
        
