var teachers = localStorage.getItem("teachers");
function login() {
  var userName = document.getElementById("login__username").value;
  var passWord = document.getElementById("login__password").value;

  if (userName == "") {
    document.getElementById("login__username-null").style.display = "block";
  } else {
    document.getElementById("login__username-null").style.display = "none";
  }
  if (passWord == "") {
    document.getElementById("login__password-null").style.display = "block";
  } else {
    document.getElementById("login__password-null").style.display = "none";
  }
  if (userName != "" && passWord != "") {
    document.getElementById("login__username").value = "";
    document.getElementById("login__password").value = "";
    var ckLogin = 0;
    for (var i = 0; i < teachers.length; i++) {
      if (teachers[i].userName != null && teachers[i].passWord != null) {
        if (
          userName == teachers[i].userName &&
          passWord == teachers[i].passWord
        ) {
          localStorage.setItem("now", `${i}`);
          localStorage.setItem("bayGioLa", "Giáo Viên");
          location.href = "./listStudents.html";
          ckLogin = 1;
          break;
        }
        for (var j = 0; j < teachers[i].students.length; j++) {
          if (
            userName == teachers[i].students[j].userName &&
            passWord == teachers[i].students[j].passWord
          ) {
            localStorage.setItem("sinhVienThu", `${j}`);
            localStorage.setItem("now", `${i}`);
            localStorage.setItem("bayGioLa", "Sinh Viên");
            location.href = "./transcript.html";
            ckLogin = 1;
            i = teachers.length;
          }
        }
      }
    }

    for (var i = 0; i < teachers.length; i++) {}
    if (!ckLogin) {
      alert("Tên đăng nhập hoặc mật khẩu sai!");
    }
  }
}
