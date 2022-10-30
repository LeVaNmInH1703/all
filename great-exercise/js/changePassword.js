var changePw = document.getElementById('change-password');
window.onclick = function (event) {
    if (event.target == changePw) {
        Closecpw('change-password')
    }
}
//
function Closecpw(name) {
    var temp = document.querySelectorAll(`.${name}__account input`);
    for (var i = 0; i < temp.length; i++){
        temp[i].value = "";
        labelcpw[i].classList.remove('focus');
    }
    var closePage = document.getElementById(`${name}`);
    closePage.style.display = "none";
    document.getElementById(`${name}__password-null`).style.display = 'none';   
    document.getElementById(`${name}-new__password-null`).style.display = 'none';   
    document.getElementById(`${name}-new__confirm-password-null`).style.display = "none";
    document.getElementById(`${name}-new__confirm-password-false`).style.display = "none";
}

//
var labelcpw = document.querySelectorAll(".change-password__account label");
var inputcpw = document.querySelectorAll(".change-password__account input");
for (let i = 0; i < labelcpw.length; i++){
    inputcpw[i].onblur = function () {
        if (inputcpw[i].value == '') {
            labelcpw[i].classList.remove('focus');
        }     
    }
    inputcpw[i].onfocus = function () {
        labelcpw[i].classList.add('focus');
    }
}

function changePassword() {
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    var now = JSON.parse(localStorage.getItem('now'));
    var sinhVienThu = JSON.parse(localStorage.getItem('sinhVienThu'));
    if (localStorage.getItem('bayGioLa') == 'Sinh Viên') {
        var std = teachers[now].students[sinhVienThu];
    } else{
        var std = teachers[now];
    }
    

    passWord = document.getElementById('change-password__password').value;
    newPassWord = document.getElementById('change-password-new__password').value;

    var confirmNewPassWord = document.getElementById('change-password__confirm-password').value;
    var ck1 = 0, ck2 = 0, ck3 = 0, ck4 = 0;
    if (passWord != std.passWord) {
        ck1 = 1;
        document.getElementById("change-password__password-null").style.display = "block";
    } else {
        ck1 = 0;
        document.getElementById("change-password__password-null").style.display = "none";
    }

    if (newPassWord == "") {
        ck2 = 1;
        document.getElementById("change-password-new__password-null").style.display = "block";
    } else {
        ck2 = 0;
        document.getElementById("change-password-new__password-null").style.display = "none";
    }
    if (confirmNewPassWord == "") {
        ck3 = 1;
        document.getElementById("change-password-new__confirm-password-null").style.display = "block";
    } else {
        ck3 = 0;
        document.getElementById("change-password-new__confirm-password-null").style.display = "none";
        if (confirmNewPassWord != newPassWord && newPassWord != '') {
            ck4 = 1;
            document.getElementById("change-password-new__confirm-password-false").style.display = "block";
        } else {
            ck4 = 0;
            document.getElementById("change-password-new__confirm-password-false").style.display = "none";
        }
    }

    if (ck1 == 0 && ck2 == 0 && ck3 == 0 && ck4 == 0) { 
        std.passWord = newPassWord;
        if (localStorage.getItem('bayGioLa') == 'Sinh Viên') {
            teachers[now].students[sinhVienThu] = std;

        } else{
            teachers[now]=std;
        }
        localStorage.setItem('teachers', JSON.stringify(teachers));
        alert('Đổi mật khẩu thành công');
        Closecpw('change-password');
    }

    
}   

function showPassword() {
    if (inputcpw[0].getAttribute('type') == 'password') {
        document.querySelector("#showPassword").innerText='Ẩn mật khẩu'
        for (var i = 0; i < inputcpw.length;i++){
            inputcpw[i].setAttribute('type', 'text');
       };
    } else {
        document.querySelector("#showPassword").innerText='Hiện mật khẩu'
        for (var i = 0; i < inputcpw.length;i++){
            inputcpw[i].setAttribute('type', 'password');
       };
   }
}