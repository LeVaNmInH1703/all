var students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem('students')) : [];
function login() {
    

    var userName = document.getElementById("login__username").value;
    var passWord = document.getElementById("login__password").value;

    if (userName == "") {
        document.getElementById('login__username-null').style.display = 'block';
    } else {
        document.getElementById('login__username-null').style.display = 'none';
    }
    if (passWord == "") {
        document.getElementById('login__password-null').style.display = 'block';
    } else {
        document.getElementById('login__password-null').style.display = 'none';      
    }
    if (userName != '' && passWord != ''){
        document.getElementById("login__username").value = "";
        document.getElementById("login__password").value = "";
        var ckLogin = 0;
        for (var i = 0; i < students.length; i++){
            if (userName == students[i].userName && passWord == students[i].passWord) {
                localStorage.setItem("now", `${i}`);
                location.href = "./transcript.html";
                ckLogin = 1;
                 break;
            }
        }
        if (!ckLogin) {
            alert("Tên đăng nhập hoặc mật khẩu sai!");
        }
    }
}
