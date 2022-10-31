function createStudent() {
  var soTinChi = JSON.parse(localStorage.getItem("soTinChi"));
  var now = JSON.parse(localStorage.getItem("now"));
  var teachers = JSON.parse(localStorage.getItem("teachers"));
  var name = document.querySelector("#full-name");
  var userName = document.querySelector("#user-name");
  var passWord = document.querySelector("#password");
  var confirmPassWord = document.querySelector("#confirm-password");

  var ck = 1;
  if (name.length == 0) {
    ck = 0;
    alert("Vui lòng nhập Họ và Tên");
  }
  if (userName.length == 0) {
    ck = 0;
    alert("Vui lòng nhập Tên đăng nhập");
  }
  if (passWord.length == 0) {
    ck = 0;
    alert("Vui lòng nhập Mật khẩu");
  }
  if (confirmPassWord.length == 0) {
    ck = 0;
    alert("Vui lòng nhập lại Mật khẩu");
  }
  if (
    passWord.value != "" &&
    confirmPassWord.value != "" &&
    passWord.value != confirmPassWord.value
  ) {
    ck = 0;
    alert("Nhập lại mật khẩu không đúng");
  }

  if (ck) {
    var ck2 = 1;
    for (var i = 0; i < teachers.length; i++) {
      if (
        userName.value == teachers[i].userName &&
        passWord.value == teachers[i].passWord
      ) {
        alert(
          "Tên đăng nhập và mật khẩu đã được sử dụng. Vui lòng chọn tài khoản khác nhé!"
        );
        ck2 = 0;
        break;
      }
      for (var j = 0; j < teachers[i].students.length; j++) {
        if (
          userName.value == teachers[i].students[j].userName &&
          passWord.value == teachers[i].students[j].passWord
        ) {
          alert(
            "Tên đăng nhập và mật khẩu đã được sử dụng. Vui lòng chọn tài khoản khác nhé!"
          );
          ck2 = 0;
          break;
        }
      }
    }

    if (ck2) {
      var student = {
        name: `${name.value}`,
        passWord: `${passWord.value}`,
        scoresTb1: [],
        scoresTb2: [],
        userName: `${userName.value}`,
      };
      var dqt = document.querySelectorAll(".score tr td:nth-child(2) input");
      var thi = document.querySelectorAll(".score tr td:nth-child(3) input");
      var kthp = [];
      kthp.length = dqt.length;

      for (var i = 0; i < dqt.length; i++) {
        student.scoresTb2.push(parseFloat(dqt[i].value));
        student.scoresTb2.push(parseFloat(thi[i].value));
        kthp[i] = (parseFloat(dqt[i].value) + parseFloat(thi[i].value)) / 2.0;
        student.scoresTb2.push(kthp[i]);
      }

      var diem = 0;
      var diem2 = 0;
      for (var i = 0; i < 8; i++) {
        diem += student.scoresTb2[2 + i * 3] * soTinChi[i];
        diem2 += student.scoresTb2[2 + i * 3];
      }
      diem /= 19.0;
      diem = Math.round(diem * 100) / 100;
      student.scoresTb1[0] = diem;
      diem2 /= 8.0;
      diem2 = Math.round(diem2 * 100) / 100;
      student.scoresTb1[8] = diem2;

      diem = 0;
      diem2 = 0;
      for (var i = 8; i < 18; i++) {
        diem += student.scoresTb2[2 + i * 3] * soTinChi[i];
        diem2 += student.scoresTb2[2 + i * 3];
      }
      diem /= 21.0;
      diem = Math.round(diem * 100) / 100;
      student.scoresTb1[1] = diem;
      diem2 /= 10.0;
      diem2 = Math.round(diem2 * 100) / 100;
      student.scoresTb1[9] = diem2;
      student.scoresTb1[10] = student.scoresTb1[11] =
        Math.round(((student.scoresTb1[8] * 8 + diem2 * 10) / 18) * 100) / 100;
      student.scoresTb1[2] = student.scoresTb1[3] =
        Math.round(((student.scoresTb1[0] * 19 + diem * 21) / 40) * 100) / 100;

      for (var i = 4; i < 8; i++) {
        student.scoresTb1[i + 8] =
          Math.round((student.scoresTb1[i + 8 - 4] / 2.5) * 100) / 100;
        student.scoresTb1[i] =
          Math.round((student.scoresTb1[i - 4] / 2.5) * 100) / 100;
      }
      console.log(teachers[now].students);
      teachers[now].students.push(student);
      localStorage.setItem("teachers", JSON.stringify(teachers));
      location.reload();
    }
  }
}

function createNStudents(n) {
  var teachers = JSON.parse(localStorage.getItem("teachers"));
  var now = JSON.parse(localStorage.getItem("now"));
  var teacher = teachers[now];
  var isCreateNStudents = confirm(`bạn có chắc muốn tạo mới ${n} sinh viên`);
  if (isCreateNStudents) {
    if (n == 5) {
      var students = [
        {
          name: `Lê Văn Minh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.45, 6.83, 7.12, 7.12, 2.98, 2.73, 2.85, 2.85, 7.63, 6.55, 7.03,
            7.03, 3.05, 2.62, 2.81, 2.81,
          ],
          scoresTb2: [
            9, 8, 8.5, 9, 8, 8.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 5,
            4, 4.5, 7, 8, 7.5, 5, 6, 5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 6,
            5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 5, 5, 8, 9, 8.5,
          ],
          userName: `minhlv`,
        },
        {
          name: `Nguyễn Văn An`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.34, 7.45, 7.4, 7.4, 2.94, 2.98, 2.96, 2.96, 7.44, 7.5, 7.47, 7.47,
            2.98, 3, 2.99, 2.99,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 8, 6.5, 9, 6, 7.5, 5, 9, 7, 7, 8, 7.5, 9,
            8, 8.5, 5, 8, 6.5, 7, 8, 7.5, 9, 6, 7.5, 5, 8, 6.5, 9, 8, 8.5, 7, 8,
            7.5, 9, 8, 8.5, 9, 8, 8.5, 5, 6, 5.5, 9, 8, 8.5, 5, 8, 6.5,
          ],
          userName: `annv`,
        },
        {
          name: `Nguyễn Quỳnh Sơn`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.45, 6.83, 7.12, 7.12, 2.98, 2.73, 2.85, 2.85, 7.63, 6.55, 7.03,
            7.03, 3.05, 2.62, 2.81, 2.81,
          ],
          scoresTb2: [
            9, 8, 8.5, 9, 8, 8.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 5,
            4, 4.5, 7, 8, 7.5, 5, 6, 5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 6,
            5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 5, 5, 8, 9, 8.5,
          ],
          userName: `sonnq`,
        },
        {
          name: `Tạ Hà Khoa`,
          passWord: `123456@utc`,
          scoresTb1: [
            6.97, 7.24, 7.11, 7.11, 2.79, 2.9, 2.84, 2.84, 7.06, 7.25, 7.17,
            7.17, 2.82, 2.9, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 5, 6, 4, 8, 6, 9, 6, 7.5, 5, 8, 6.5, 7, 8, 7.5, 9, 5,
            7, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 8, 6, 9, 5, 7, 6,
            9, 7.5, 8, 7, 7.5, 5, 9, 7, 8, 7, 7.5, 8, 9, 8.5,
          ],
          userName: `khoath`,
        },
        {
          name: `Mai Xuân Tùng`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.03, 7.1, 7.07, 7.07, 2.81, 2.84, 2.83, 2.83, 7.13, 7.25, 7.2, 7.2,
            2.85, 2.9, 2.88, 2.88,
          ],
          scoresTb2: [
            9, 9, 9, 8, 7, 7.5, 5, 4, 4.5, 8, 9, 8.5, 5, 8, 6.5, 7, 4, 5.5, 9,
            8, 8.5, 9, 5, 7, 8, 7, 7.5, 5, 8, 6.5, 7, 8, 7.5, 9, 9, 9, 8, 7,
            7.5, 5, 8, 6.5, 7, 4, 5.5, 8, 7, 7.5, 8, 7, 7.5, 8, 7, 7.5,
          ],
          userName: `tungmx`,
        },
      ];
      teacher.students = students;
      teachers[now] = teacher;
      localStorage.setItem("teachers", JSON.stringify(teachers));
      location.reload();
    } else if (n == 10) {
      var students = [
        {
          name: `Lê Văn Minh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.45, 6.83, 7.12, 7.12, 2.98, 2.73, 2.85, 2.85, 7.63, 6.55, 7.03,
            7.03, 3.05, 2.62, 2.81, 2.81,
          ],
          scoresTb2: [
            9, 8, 8.5, 9, 8, 8.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 5,
            4, 4.5, 7, 8, 7.5, 5, 6, 5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 6,
            5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 5, 5, 8, 9, 8.5,
          ],
          userName: `minhlv`,
        },
        {
          name: `Nguyễn Văn An`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.34, 7.45, 7.4, 7.4, 2.94, 2.98, 2.96, 2.96, 7.44, 7.5, 7.47, 7.47,
            2.98, 3, 2.99, 2.99,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 8, 6.5, 9, 6, 7.5, 5, 9, 7, 7, 8, 7.5, 9,
            8, 8.5, 5, 8, 6.5, 7, 8, 7.5, 9, 6, 7.5, 5, 8, 6.5, 9, 8, 8.5, 7, 8,
            7.5, 9, 8, 8.5, 9, 8, 8.5, 5, 6, 5.5, 9, 8, 8.5, 5, 8, 6.5,
          ],
          userName: `annv`,
        },
        {
          name: `Nguyễn Quỳnh Sơn`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.45, 6.83, 7.12, 7.12, 2.98, 2.73, 2.85, 2.85, 7.63, 6.55, 7.03,
            7.03, 3.05, 2.62, 2.81, 2.81,
          ],
          scoresTb2: [
            9, 8, 8.5, 9, 8, 8.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 5,
            4, 4.5, 7, 8, 7.5, 5, 6, 5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 6,
            5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 5, 5, 8, 9, 8.5,
          ],
          userName: `sonnq`,
        },
        {
          name: `Tạ Hà Khoa`,
          passWord: `123456@utc`,
          scoresTb1: [
            6.97, 7.24, 7.11, 7.11, 2.79, 2.9, 2.84, 2.84, 7.06, 7.25, 7.17,
            7.17, 2.82, 2.9, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 5, 6, 4, 8, 6, 9, 6, 7.5, 5, 8, 6.5, 7, 8, 7.5, 9, 5,
            7, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 8, 6, 9, 5, 7, 6,
            9, 7.5, 8, 7, 7.5, 5, 9, 7, 8, 7, 7.5, 8, 9, 8.5,
          ],
          userName: `khoath`,
        },
        {
          name: `Mai Xuân Tùng`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.03, 7.1, 7.07, 7.07, 2.81, 2.84, 2.83, 2.83, 7.13, 7.25, 7.2, 7.2,
            2.85, 2.9, 2.88, 2.88,
          ],
          scoresTb2: [
            9, 9, 9, 8, 7, 7.5, 5, 4, 4.5, 8, 9, 8.5, 5, 8, 6.5, 7, 4, 5.5, 9,
            8, 8.5, 9, 5, 7, 8, 7, 7.5, 5, 8, 6.5, 7, 8, 7.5, 9, 9, 9, 8, 7,
            7.5, 5, 8, 6.5, 7, 4, 5.5, 8, 7, 7.5, 8, 7, 7.5, 8, 7, 7.5,
          ],
          userName: `tungmx`,
        },
        {
          name: `Nguyễn Văn Minh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.97, 7.69, 7.82, 7.82, 3.19, 3.08, 3.13, 3.13, 8, 7.7, 7.83, 7.83,
            3.2, 3.08, 3.13, 3.13,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 9,
            8, 8.5, 7, 8, 7.5, 8, 9, 8.5, 8, 7, 7.5, 8, 9, 8.5, 8, 7, 7.5, 8, 8,
            8, 9, 8, 8.5, 5, 7, 6, 8, 9, 8.5, 8, 5, 6.5, 7, 8, 7.5,
          ],
          userName: `minhnv`,
        },
        {
          name: `Hồ Anh Minh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.32, 7.43, 7.38, 7.38, 2.93, 2.97, 2.95, 2.95, 7.31, 7.45, 7.39,
            7.39, 2.92, 2.98, 2.96, 2.96,
          ],
          scoresTb2: [
            9, 4, 6.5, 8, 7, 7.5, 5, 8, 6.5, 7, 9, 8, 8, 7, 7.5, 8, 9, 8.5, 5,
            8, 6.5, 7, 8, 7.5, 5, 9, 7, 8, 7, 7.5, 8, 9, 8.5, 8, 7, 7.5, 5, 8,
            6.5, 7, 4, 5.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5,
          ],
          userName: `minhha`,
        },
        {
          name: `Tô Minh Tiến`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.18, 7.6, 7.4, 7.4, 2.87, 3.04, 2.96, 2.96, 7.25, 7.55, 7.42, 7.42,
            2.9, 3.02, 2.97, 2.97,
          ],
          scoresTb2: [
            8, 9, 8.5, 8, 7, 7.5, 5, 8, 6.5, 7, 9, 8, 8, 7, 7.5, 5, 6, 5.5, 9,
            8, 8.5, 7, 5, 6, 6, 9, 7.5, 8, 9, 8.5, 5, 6, 5.5, 9, 8, 8.5, 9, 5,
            7, 6, 9, 7.5, 8, 5, 6.5, 6, 9, 7.5, 9, 8, 8.5, 9, 8, 8.5,
          ],
          userName: `tientm`,
        },
        {
          name: `Nguyễn Anh Tiến`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.61, 7.45, 7.53, 7.53, 3.04, 2.98, 3.01, 3.01, 7.56, 7.35, 7.44,
            7.44, 3.02, 2.94, 2.98, 2.98,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 5, 6, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 9, 8.5, 8,
            7, 7.5, 8, 9, 8.5, 5, 8, 6.5, 7, 8, 7.5, 9, 5, 7, 8, 7, 7.5, 8, 8,
            8, 9, 8, 8.5, 5, 7, 6, 8, 9, 8.5, 8, 5, 6.5, 7, 8, 7.5,
          ],
          userName: `tienna`,
        },
        {
          name: `Trần Lam Liên`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.29, 6.98, 7.13, 7.13, 2.92, 2.79, 2.85, 2.85, 7.5, 6.9, 7.17,
            7.17, 3, 2.76, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 4, 4.5, 8, 7, 7.5, 9, 8, 8.5, 8, 9, 8.5, 8,
            5, 6.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 9,
            8.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 5, 4.5,
          ],
          userName: `lientl`,
        },
      ];
      teacher.students = students;
      teachers[now] = teacher;
      localStorage.setItem("teachers", JSON.stringify(teachers));
      location.reload();
    } else if (n == 15) {
      var students = [
        {
          name: `Lê Văn Minh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.45, 6.83, 7.12, 7.12, 2.98, 2.73, 2.85, 2.85, 7.63, 6.55, 7.03,
            7.03, 3.05, 2.62, 2.81, 2.81,
          ],
          scoresTb2: [
            9, 8, 8.5, 9, 8, 8.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 5,
            4, 4.5, 7, 8, 7.5, 5, 6, 5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 6,
            5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 5, 5, 8, 9, 8.5,
          ],
          userName: `minhlv`,
        },
        {
          name: `Nguyễn Văn An`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.34, 7.45, 7.4, 7.4, 2.94, 2.98, 2.96, 2.96, 7.44, 7.5, 7.47, 7.47,
            2.98, 3, 2.99, 2.99,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 8, 6.5, 9, 6, 7.5, 5, 9, 7, 7, 8, 7.5, 9,
            8, 8.5, 5, 8, 6.5, 7, 8, 7.5, 9, 6, 7.5, 5, 8, 6.5, 9, 8, 8.5, 7, 8,
            7.5, 9, 8, 8.5, 9, 8, 8.5, 5, 6, 5.5, 9, 8, 8.5, 5, 8, 6.5,
          ],
          userName: `annv`,
        },
        {
          name: `Nguyễn Quỳnh Sơn`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.45, 6.83, 7.12, 7.12, 2.98, 2.73, 2.85, 2.85, 7.63, 6.55, 7.03,
            7.03, 3.05, 2.62, 2.81, 2.81,
          ],
          scoresTb2: [
            9, 8, 8.5, 9, 8, 8.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 5,
            4, 4.5, 7, 8, 7.5, 5, 6, 5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 6,
            5.5, 9, 8, 8.5, 5, 4, 4.5, 7, 8, 7.5, 5, 5, 5, 8, 9, 8.5,
          ],
          userName: `sonnq`,
        },
        {
          name: `Tạ Hà Khoa`,
          passWord: `123456@utc`,
          scoresTb1: [
            6.97, 7.24, 7.11, 7.11, 2.79, 2.9, 2.84, 2.84, 7.06, 7.25, 7.17,
            7.17, 2.82, 2.9, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 5, 6, 4, 8, 6, 9, 6, 7.5, 5, 8, 6.5, 7, 8, 7.5, 9, 5,
            7, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 8, 6, 9, 5, 7, 6,
            9, 7.5, 8, 7, 7.5, 5, 9, 7, 8, 7, 7.5, 8, 9, 8.5,
          ],
          userName: `khoath`,
        },
        {
          name: `Mai Xuân Tùng`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.03, 7.1, 7.07, 7.07, 2.81, 2.84, 2.83, 2.83, 7.13, 7.25, 7.2, 7.2,
            2.85, 2.9, 2.88, 2.88,
          ],
          scoresTb2: [
            9, 9, 9, 8, 7, 7.5, 5, 4, 4.5, 8, 9, 8.5, 5, 8, 6.5, 7, 4, 5.5, 9,
            8, 8.5, 9, 5, 7, 8, 7, 7.5, 5, 8, 6.5, 7, 8, 7.5, 9, 9, 9, 8, 7,
            7.5, 5, 8, 6.5, 7, 4, 5.5, 8, 7, 7.5, 8, 7, 7.5, 8, 7, 7.5,
          ],
          userName: `tungmx`,
        },
        {
          name: `Nguyễn Văn Minh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.97, 7.69, 7.82, 7.82, 3.19, 3.08, 3.13, 3.13, 8, 7.7, 7.83, 7.83,
            3.2, 3.08, 3.13, 3.13,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 9,
            8, 8.5, 7, 8, 7.5, 8, 9, 8.5, 8, 7, 7.5, 8, 9, 8.5, 8, 7, 7.5, 8, 8,
            8, 9, 8, 8.5, 5, 7, 6, 8, 9, 8.5, 8, 5, 6.5, 7, 8, 7.5,
          ],
          userName: `minhnv`,
        },
        {
          name: `Hồ Anh Minh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.32, 7.43, 7.38, 7.38, 2.93, 2.97, 2.95, 2.95, 7.31, 7.45, 7.39,
            7.39, 2.92, 2.98, 2.96, 2.96,
          ],
          scoresTb2: [
            9, 4, 6.5, 8, 7, 7.5, 5, 8, 6.5, 7, 9, 8, 8, 7, 7.5, 8, 9, 8.5, 5,
            8, 6.5, 7, 8, 7.5, 5, 9, 7, 8, 7, 7.5, 8, 9, 8.5, 8, 7, 7.5, 5, 8,
            6.5, 7, 4, 5.5, 7, 8, 7.5, 9, 8, 8.5, 7, 8, 7.5, 9, 8, 8.5,
          ],
          userName: `minhha`,
        },
        {
          name: `Tô Minh Tiến`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.18, 7.6, 7.4, 7.4, 2.87, 3.04, 2.96, 2.96, 7.25, 7.55, 7.42, 7.42,
            2.9, 3.02, 2.97, 2.97,
          ],
          scoresTb2: [
            8, 9, 8.5, 8, 7, 7.5, 5, 8, 6.5, 7, 9, 8, 8, 7, 7.5, 5, 6, 5.5, 9,
            8, 8.5, 7, 5, 6, 6, 9, 7.5, 8, 9, 8.5, 5, 6, 5.5, 9, 8, 8.5, 9, 5,
            7, 6, 9, 7.5, 8, 5, 6.5, 6, 9, 7.5, 9, 8, 8.5, 9, 8, 8.5,
          ],
          userName: `tientm`,
        },
        {
          name: `Nguyễn Anh Tiến`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.61, 7.45, 7.53, 7.53, 3.04, 2.98, 3.01, 3.01, 7.56, 7.35, 7.44,
            7.44, 3.02, 2.94, 2.98, 2.98,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 5, 6, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 9, 8.5, 8,
            7, 7.5, 8, 9, 8.5, 5, 8, 6.5, 7, 8, 7.5, 9, 5, 7, 8, 7, 7.5, 8, 8,
            8, 9, 8, 8.5, 5, 7, 6, 8, 9, 8.5, 8, 5, 6.5, 7, 8, 7.5,
          ],
          userName: `tienna`,
        },
        {
          name: `Trần Lam Liên`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.29, 6.98, 7.13, 7.13, 2.92, 2.79, 2.85, 2.85, 7.5, 6.9, 7.17,
            7.17, 3, 2.76, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 4, 4.5, 8, 7, 7.5, 9, 8, 8.5, 8, 9, 8.5, 8,
            5, 6.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 9,
            8.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 5, 4.5,
          ],
          userName: `lientl`,
        },
        {
          name: `Trần Văn Tiến Anh`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.29, 6.98, 7.13, 7.13, 2.92, 2.79, 2.85, 2.85, 7.5, 6.9, 7.17,
            7.17, 3, 2.76, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 4, 4.5, 8, 7, 7.5, 9, 8, 8.5, 8, 9, 8.5, 8,
            5, 6.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 9,
            8.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 5, 4.5,
          ],
          userName: `tienanhtv`,
        },
        {
          name: `Lý Mạnh Hưng`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.24, 6.69, 6.95, 6.95, 2.9, 2.68, 2.78, 2.78, 7.38, 6.85, 7.09,
            7.09, 2.95, 2.74, 2.84, 2.84,
          ],
          scoresTb2: [
            9, 8, 8.5, 5, 8, 6.5, 7, 4, 5.5, 8, 7, 7.5, 8, 9, 8.5, 8, 7, 7.5, 8,
            9, 8.5, 8, 5, 6.5, 8, 9, 8.5, 6, 9, 7.5, 8, 5, 6.5, 8, 7, 7.5, 5, 8,
            6.5, 9, 6, 7.5, 5, 9, 7, 6, 5, 5.5, 8, 7, 7.5, 4, 5, 4.5,
          ],
          userName: `hunglm`,
        },
        {
          name: `Nguyễn Thế Hải`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.29, 6.98, 7.13, 7.13, 2.92, 2.79, 2.85, 2.85, 7.5, 6.9, 7.17,
            7.17, 3, 2.76, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 4, 4.5, 8, 7, 7.5, 9, 8, 8.5, 8, 9, 8.5, 8,
            5, 6.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 9,
            8.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 5, 4.5,
          ],
          userName: `haint`,
        },
        {
          name: `Vũ Văn Hoàn`,
          passWord: `123456@utc`,
          scoresTb1: [
            6.74, 7.4, 7.09, 7.09, 2.7, 2.96, 2.84, 2.84, 6.81, 7.35, 7.11,
            7.11, 2.72, 2.94, 2.84, 2.84,
          ],
          scoresTb2: [
            5, 9, 7, 8, 6, 7, 2, 5, 3.5, 9, 8, 8.5, 7, 8, 7.5, 5, 9, 7, 6, 9,
            7.5, 8, 5, 6.5, 4, 7, 5.5, 8, 9, 8.5, 8, 7, 7.5, 8, 9, 8.5, 5, 8,
            6.5, 9, 6, 7.5, 5, 8, 6.5, 9, 9, 9, 8, 7, 7.5, 8, 5, 6.5,
          ],
          userName: `hoanvv`,
        },
        {
          name: `Phạm Xuân Tích`,
          passWord: `123456@utc`,
          scoresTb1: [
            7.29, 6.98, 7.13, 7.13, 2.92, 2.79, 2.85, 2.85, 7.5, 6.9, 7.17,
            7.17, 3, 2.76, 2.87, 2.87,
          ],
          scoresTb2: [
            9, 8, 8.5, 7, 8, 7.5, 5, 4, 4.5, 8, 7, 7.5, 9, 8, 8.5, 8, 9, 8.5, 8,
            5, 6.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 9,
            8.5, 8, 7, 7.5, 8, 9, 8.5, 6, 5, 5.5, 8, 7, 7.5, 4, 5, 4.5,
          ],
          userName: `tichpx`,
        },
      ];
      teacher.students = students;
      teachers[now] = teacher;
      localStorage.setItem("teachers", JSON.stringify(teachers));
      location.reload();
    }
  }
}
