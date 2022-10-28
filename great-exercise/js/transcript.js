
var teachers = JSON.parse(localStorage.getItem('teachers'));
var now = JSON.parse(localStorage.getItem('now'));
var sinhVienThu = JSON.parse(localStorage.getItem('sinhVienThu'));
var SV = teachers[now].students[sinhVienThu];

document.getElementById('msv').innerText = sinhVienThu+1;
document.getElementById('name').innerText = SV.name;
document.querySelector('.header__user-name').innerText ='Xin chào: '+ SV.name +' '+ (sinhVienThu + 1)+' ';

var tbtl10 = document.querySelectorAll('.table1__table tr td:nth-child(3)');
var tbtl4 = document.querySelectorAll('.table1__table tr td:nth-child(5)');
var tbc10 = document.querySelectorAll('.table1__table tr td:nth-child(9)');
var tbc4 = document.querySelectorAll('.table1__table tr td:nth-child(11)');

var allScore1 = [...tbtl10, ...tbtl4, ...tbc10, ...tbc4];
for (var i = 0; i < allScore1.length; i++){
    allScore1[i].innerText = SV.scoresTb1[i];
}

var allScore2 = document.querySelectorAll('.table2__table tr td:nth-child(11),.table2__table tr td:nth-child(12),.table2__table tr td:nth-child(13)');
for (var i = 0; i < allScore2.length; i++){
    allScore2[i].innerText = SV.scoresTb2[i];
}

var dat = document.querySelectorAll('.table2__table tr td:nth-child(9)');
for (var i = 0; i < dat.length;i++){
    if (SV.scoresTb2[i * 3 + 2] > 4) {
        dat[i].innerText = 'DAT';
    } else {
        dat[i].innerText = 'NO';
    }
};

var msv = document.querySelectorAll('.table2__table tr td:nth-child(10)');
for (var i = 0; i < msv.length; i++){
    msv[i].innerText = sinhVienThu + 1;
}