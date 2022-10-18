var modal1 = document.getElementById('login');
var modal2 = document.getElementById('sign-up');
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == modal1) {
        modal1.style.display = "none";
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
        