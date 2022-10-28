if (localStorage.getItem('isClear') == null) {
    localStorage.clear();
    localStorage.setItem('isClear', '1');
}

if (localStorage.getItem('teachers') == null) {
    localStorage.setItem('teachers', '');
    localStorage.setItem('now', '0');
}

if (localStorage.getItem('bayGioLa') == 'Giáo Viên') {
    var teachers = JSON.parse(localStorage.getItem("teachers"));
    var now = JSON.parse(localStorage.getItem('now'));
    var sinhVienThu = JSON.parse(localStorage.getItem('sinhVienThu'));
    document.querySelector('#btn-sign-in').style.display = 'none';
    document.querySelector('#btn-sign-up').style.display = 'none';
    document.querySelector('#hello-user').style.display = 'block';
    document.querySelector('#hello-user').innerText = 'Xin chào: ' + (teachers[now].name ? teachers[now].name : '');
    document.querySelector('#log-out-btn').style.display = 'block';
    document.querySelector('#editScores-teacher').style.display = 'block';
    document.querySelector('#showScores').style.display = 'block';
}
if (localStorage.getItem('bayGioLa') == 'Sinh Viên') {
    var teachers = JSON.parse(localStorage.getItem("teachers"));
    var now = JSON.parse(localStorage.getItem('now'));
    var sinhVienThu = JSON.parse(localStorage.getItem('sinhVienThu'));
    document.querySelector('#btn-sign-in').style.display = 'none';
    document.querySelector('#btn-sign-up').style.display = 'none';
    document.querySelector('#hello-user').style.display = 'block';
    document.querySelector('#hello-user').innerText = 'Xin chào: ' + (teachers[now].students[sinhVienThu].name?teachers[now].students[sinhVienThu].name:'');
    document.querySelector('#log-out-btn').style.display = 'block';
    document.querySelector('#showScores').style.display = 'block';
}
if (localStorage.getItem('bayGioLa') == '') {
    document.querySelector('#btn-sign-in').style.display = 'block';
    document.querySelector('#btn-sign-up').style.display = 'block';
    document.querySelector('#hello-user').style.display = 'none';
    document.querySelector('#log-out-btn').style.display = 'none';
}

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
    document.getElementById(`${name}__username-null`).style.display = 'none';
    document.getElementById(`${name}__password-null`).style.display = 'none';   
    document.getElementById("sign-up__confirm-password-null").style.display = "none";
    document.getElementById("sign-up__confirm-password-false").style.display = "none";
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

var now = localStorage.getItem('now');
var btnSignUp = document.querySelector("#btn-sign-up");
var btnSignIn = document.querySelector("#btn-sign-in");
var btnLogOut = document.querySelector("#log-out-btn");
var helloUser = document.querySelector("#hello-user");
var students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem('students')) : [];



function logOut() {
    localStorage.setItem('bayGioLa', '');
    location.reload();
}

function checkLogin(temp) {
    if (localStorage.getItem('now') === 'null') {
        if (temp) {
            alert("Vui lòng đăng nhập để xem điểm");
        } else {
            alert("Vui lòng đăng nhập để sửa điểm");
        }
    } else {
        if (temp) {
            location.href = "./transcript.html"
        } else {
            location.href = "./inputScores.html"
        }
        
    }
}
