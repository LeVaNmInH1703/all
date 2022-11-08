var teachers = JSON.parse(localStorage.getItem("teachers"));
var now = JSON.parse(localStorage.getItem("now"));
var sinhVienThu = JSON.parse(localStorage.getItem("sinhVienThu"));
var SV = teachers[now].students[sinhVienThu];
var soTinChi = JSON.parse(localStorage.getItem("soTinChi"));

document.querySelector("#user-msv").innerText = sinhVienThu + 1;
document.querySelector("#user-name").value = SV.name;
document.querySelector("#header__user-name").innerText =
  "Xin chào: " + SV.name + " " + (sinhVienThu + 1) + " ";

var tbtl10 = document.querySelectorAll(".table1__table tr td:nth-child(3)");
var tbtl4 = document.querySelectorAll(".table1__table tr td:nth-child(5)");
var tbc10 = document.querySelectorAll(".table1__table tr td:nth-child(9)");
var tbc4 = document.querySelectorAll(".table1__table tr td:nth-child(11)");

var allScore1 = [...tbtl10, ...tbtl4, ...tbc10, ...tbc4];
for (var i = 0; i < allScore1.length; i++) {
  allScore1[i].innerText = SV.scoresTb1[i];
}
var dqt = document.querySelectorAll(".table2__table tr td:nth-child(11) input");
var thi = document.querySelectorAll(".table2__table tr td:nth-child(12) input");
for (var i = 0; i < dqt.length; i++) {
  dqt[i].value = SV.scoresTb2[i * 3];
  thi[i].value = SV.scoresTb2[i * 3 + 1];
}

var kthp = document.querySelectorAll(".table2__table tr td:nth-child(13)");
for (var i = 0; i < kthp.length; i++) {
  kthp[i].innerText = SV.scoresTb2[i * 3 + 2];
}

var isSave = true;
for (var i = 0; i < dqt.length; i++) {
  dqt[i].onchange = function () {
    isSave = false;
  };
  thi[i].onchange = function () {
    isSave = false;
  };
}

function saveInput() {
  SV.name = document.querySelector("#user-name").value;
  for (var i = 0; i < dqt.length; i++) {
    SV.scoresTb2[i * 3 + 0] = Math.min(
      Math.round(parseFloat(dqt[i].value) * 100) / 100,
      10
    );
    SV.scoresTb2[i * 3 + 1] = Math.min(
      Math.round(parseFloat(thi[i].value) * 100) / 100,
      10
    );
    SV.scoresTb2[i * 3 + 2] =
      Math.round(
        ((SV.scoresTb2[i * 3 + 0] + SV.scoresTb2[i * 3 + 1]) / 2) * 100
      ) / 100;
  }

  var diem = 0;
  var diem2 = 0;
  for (var i = 0; i < 8; i++) {
    diem += SV.scoresTb2[2 + i * 3] * soTinChi[i];
    diem2 += SV.scoresTb2[2 + i * 3];
  }
  diem /= 19.0;
  diem = Math.round(diem * 100) / 100;
  SV.scoresTb1[0] = diem;
  diem2 /= 8.0;
  diem2 = Math.round(diem2 * 100) / 100;
  SV.scoresTb1[8] = diem2;

  diem = 0;
  diem2 = 0;
  for (var i = 8; i < 18; i++) {
    diem += SV.scoresTb2[2 + i * 3] * soTinChi[i];
    diem2 += SV.scoresTb2[2 + i * 3];
  }
  diem /= 21.0;
  diem = Math.round(diem * 100) / 100;
  SV.scoresTb1[1] = diem;
  diem2 /= 10.0;
  diem2 = Math.round(diem2 * 100) / 100;
  SV.scoresTb1[9] = diem2;
  SV.scoresTb1[10] = SV.scoresTb1[11] =
    Math.round(((SV.scoresTb1[8] * 8 + diem2 * 10) / 18) * 100) / 100;
  SV.scoresTb1[2] = SV.scoresTb1[3] =
    Math.round(((SV.scoresTb1[0] * 19 + diem * 21) / 40) * 100) / 100;

  for (var i = 4; i < 8; i++) {
    SV.scoresTb1[i + 8] =
      Math.round((SV.scoresTb1[i + 8 - 4] / 2.5) * 100) / 100;
    SV.scoresTb1[i] = Math.round((SV.scoresTb1[i - 4] / 2.5) * 100) / 100;
  }

  teachers[now].students[sinhVienThu] = SV;
  localStorage.setItem("teachers", JSON.stringify(teachers));
  location.reload();
  alert("Điểm đã được cập nhập");
}

function resetInput() {
  location.reload();
}

function acceptLeave(index) {
  console.log(isSave);
  if (index) {
    var isLv = 1;
    if (!isSave) {
      isLv = confirm("Điểm chưa được cập nhập. Bạn có chắc muốn rời đi không?");
      if (isLv) {
        location.href = "./listStudents.html";
      }
    } else {
      location.href = "./listStudents.html";
    }
  } else {
    var isLv = 1;
    if (!isSave) {
      isLv = confirm("Điểm chưa được cập nhập. Bạn có chắc muốn rời đi không?");
      if (isLv) {
        location.href = "./index.html";
      }
    } else {
      location.href = "./index.html";
    }
  }
}
