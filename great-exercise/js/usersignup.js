var userName;
var passWord;
var headerUserName = document.getElementById('header__user-name');
var students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem('students')) : [];
var now = localStorage.getItem("now");
now = parseInt(now);
var std = students[now];
console.log(std);
var msv = std.msv == "" ? "---" : std.msv;
var name = std.name == "" ? "---" : std.name;
if (msv == '---') {
    headerUserName.innerText = `${std.name}`;
} else {
    headerUserName.innerText = `${std.name} (${std.msv}) `;
    
}


var dqt = document.querySelectorAll('.table2__table tr td:nth-child(11) input');
var thi = document.querySelectorAll('.table2__table tr td:nth-child(12) input');
var kthp = document.querySelectorAll('.table2__table tr td:nth-child(13)');
var all = document.querySelectorAll('.table2__table tr td:nth-child(11) input,.table2__table tr td:nth-child(12) input,.table2__table tr td:nth-child(13)');
for (var i = 0; i < all.length; i++){
    var temp = std.scoresTb2[i] == undefined ? '---' : std.scoresTb2[i];

    all[i].value = `${temp}`;
    all[i].innerText = `${temp}`;
};

function signUp() {
    localStorage.clear();
    userName = document.getElementById('sign-up__username').value;
    passWord = document.getElementById('sign-up__password').value;
    var confirmPassWord = document.getElementById('sign-up__confirm-password').value;
    
    var ck1 = 0, ck2 = 0, ck3 = 0, ck4 = 0;
    if (userName == "") {
        document.getElementById("sign-up__username-null").style.display = 'block';
        ck1 = 1;
    } else {
        ck1 = 0;
        document.getElementById("sign-up__username-null").style.display = 'none';      
    }
    if (passWord == "") {
        ck2 = 1;
        document.getElementById("sign-up__password-null").style.display = "block";
    } else {
        ck2 = 0;
        document.getElementById("sign-up__password-null").style.display = "none";
    }
    if (confirmPassWord == "") {
        ck3 = 1;
        document.getElementById("sign-up__confirm-password-null").style.display = "block";
    } else {
        ck3 = 0;
        document.getElementById("sign-up__confirm-password-null").style.display = "none";
        if (confirmPassWord != passWord && passWord != '') {
            ck4 = 1;
            document.getElementById("sign-up__confirm-password-false").style.display = "block";
        } else {
            ck4 = 0;
            document.getElementById("sign-up__confirm-password-false").style.display = "none";
        }
    }

    if (ck1 == 0 && ck2 == 0 && ck3 == 0 && ck4 == 0) {
        var students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem('students')) : [];
        var ck = 0;
        for (var i = 0; i < students.length; i++){
            if (userName == students[i].userName) {
                alert("Tên đăng nhập đã được sử dụng. Vui lòng dùng tên khác!");
                ck = 1;
            }  
        };
        if (ck == 0) {
            students.push({
                userName: `${userName}`,
                passWord: `${passWord}`,
                name: "",
                msv:'',
                scoresTb1: [],
                scoresTb2: [],
            })
            localStorage.setItem("now", `${students.length - 1}`);
            localStorage.setItem('students', JSON.stringify(students));
            location.href = './inputScores.html';
        }
        document.getElementById('sign-up__username').value = "";
        document.getElementById('sign-up__password').value = "";
        document.getElementById('sign-up__confirm-password').value="";
    }
}


document.getElementById('user-name').value = `${name}`;
document.getElementById('user-msv').value = `${msv}`;

var inputTbtl10n1 = document.querySelectorAll(".input-tbtl10n1");
for (var i = 0; i < inputTbtl10n1.length; i++){
    var temp = std.scoresTb1[i] == undefined ? 'nhập điểm' : std.scoresTb1[i];
    inputTbtl10n1[i].value = `${temp}`;
    if (std.scoresTb1[2] == NaN) {
        changeScoreTb1('tbtl10n1',std.scoresTb1[2]);
    }
    inputTbtl10n1[i].onchange = function () {
        var res = 0;
        for (var i = 0; i < inputTbtl10n1.length; i++){
            std.scoresTb1[i] = parseFloat(inputTbtl10n1[i].value) > 0 && parseFloat(inputTbtl10n1[i].value) <= 10 ? parseFloat(inputTbtl10n1[i].value) : 0;
            res += std.scoresTb1[i];
        };
        res /= inputTbtl10n1.length;
        std.scoresTb1[2] = std.scoresTb1[3] = res;
        students[now] = std;
        localStorage.setItem('students', JSON.stringify(students));
        
        changeScoreTb1('tbtl10n1',res);
    }
};

var inputTbtl4n1 = document.querySelectorAll(".input-tbtl4n1");
for (var i = 0; i < inputTbtl4n1.length; i++){
    var temp = std.scoresTb1[4+i] == undefined ? 'nhập điểm' : std.scoresTb1[i];
    inputTbtl4n1[i].value = `${temp}`;
    if (std.scoresTb1[6] == NaN) {
        changeScoreTb1('tbtl10n1',std.scoresTb1[2]);
    }
    
    inputTbtl4n1[i].onchange = function () {
        var res = 0;
        for (var i = 0; i < inputTbtl4n1.length; i++){
            std.scoresTb1[4 + i] = parseFloat(inputTbtl4n1[i].value) > 0 && parseFloat(inputTbtl4n1[i].value) <= 10 ? parseFloat(inputTbtl4n1[i].value) : 0;
            res += parseFloat(inputTbtl4n1[i].value)>0?parseFloat(inputTbtl4n1[i].value):0;
        };
        res /= inputTbtl4n1.length;
        std.scoresTb1[6] = std.scoresTb1[7] = res;
        students[now] = std;
        localStorage.setItem('students', JSON.stringify(students));
        changeScoreTb1('tbtl4n1',res);
    }
};

var inputTbc10n1 = document.querySelectorAll(".input-tbc10n1");
for (var i = 0; i < inputTbc10n1.length; i++){
    var temp = std.scoresTb1[8+i] == undefined ? 'nhập điểm' : std.scoresTb1[i];
    inputTbc10n1[i].value = `${temp}`;
    if (std.scoresTb1[10] == NaN) {
        changeScoreTb1('tbtl10n1',std.scoresTb1[2]);
    }

    inputTbc10n1[i].onchange = function () {
        var res = 0;
        for (var i = 0; i < inputTbc10n1.length; i++){
            std.scoresTb1[8 + i] = parseFloat(inputTbc10n1[i].value) > 0 && parseFloat(inputTbc10n1[i].value) <= 10 ? parseFloat(inputTbc10n1[i].value) : 0;
            res += parseFloat(inputTbc10n1[i].value)>0?parseFloat(inputTbc10n1[i].value):0;
        };
        res /= inputTbc10n1.length;
        std.scoresTb1[10] = std.scoresTb1[11] = res;
        students[now] = std;
        localStorage.setItem('students', JSON.stringify(students));
       
        changeScoreTb1('tbc10n1',res);
    }
};

var inputTbc4n1 = document.querySelectorAll(".input-tbc4n1");
for (var i = 0; i < inputTbc4n1.length; i++){
    var temp = std.scoresTb1[12+i] == undefined ? 'nhập điểm' : std.scoresTb1[i];
    inputTbc4n1[i].value = `${temp}`;
    if (std.scoresTb1[14] == NaN) {
        changeScoreTb1('tbtl10n1',std.scoresTb1[2]);
    }

    inputTbc4n1[i].onchange = function () {
        var res = 0;
        for (var i = 0; i < inputTbc4n1.length; i++){
            std.scoresTb1[12 + i] = parseFloat(inputTbc4n1[i].value) > 0 && parseFloat(inputTbc4n1[i].value) <= 10 ? parseFloat(inputTbc4n1[i].value) : 0;
            res += parseFloat(inputTbc4n1[i].value)>0?parseFloat(inputTbc4n1[i].value):0;
        };
        res /= inputTbc4n1.length;
        std.scoresTb1[14] = std.scoresTb1[15] = res;
        students[now] = std;
        localStorage.setItem('students', JSON.stringify(students));
        
        changeScoreTb1('tbc4n1',res);
    }
};



function changeScoreTb1(str, res) {
    res = Math.round(res * 100) / 100;
    var temp = document.querySelectorAll(`.${str}`);
    for (var i = 0; i < temp.length; i++){
        temp[i].innerText = res;
    };
    return res;
}

function changeMsv() {
    var res = document.getElementById('user-msv').value;
    res = parseInt(res);
    if (isNaN(res)) {
        alert('Mã sinh viên không hợp lệ');
        document.getElementById('user-msv').value = '';
    } else {
        var temp2 = String(res);
        var end = 9 - temp2.length;
        for (var i = 1; i <= end; i++){
            temp2 = '0' + temp2;
        }
        var temp = document.querySelectorAll('.table2__table tr td:nth-child(10)');
        for (var i = 0; i < temp.length;i++){
            temp[i].innerText = temp2;
        };
        std.msv = temp2;
        students[now] = std;
        var msv = document.getElementById('user-msv').value;
        var name = document.getElementById('user-name').value;
        
        var end = 9 - msv.length;
        for (var i = 1; i <= end; i++){
            msv = '0' + msv;
        }
        headerUserName.innerText = `${name}(${msv})`;
        localStorage.setItem('students', JSON.stringify(students));
    }
    
}

function changeUserName() {
    var msv = document.getElementById('user-msv').value;
    var name = document.getElementById('user-name').value;

    if (name.length < 2) {
        alert("Tên phải lớn hơn 2 kí tự");
        document.getElementById('user-name').value = '';
    } else {
        std.name = name;
        students[now] = std;
        var headerUserName = document.getElementById('header__user-name');
        var end = 9 - msv.length;
        for (var i = 1; i <= end; i++){
            msv = '0' + msv;
        }
        headerUserName.innerText = `${name} (${msv})`;
        localStorage.setItem('students', JSON.stringify(students));
    }
    
}



dqt.forEach(function (i, index) {
    i.onchange = function () {
        changeScoreTb2(index);
    }
});
thi.forEach(function (i, index) {
    i.onchange = function () {
        changeScoreTb2(index);
    }
});
function changeScoreTb2(i) {
    var res = parseFloat(dqt[i].value) > 0 && parseFloat(dqt[i].value) <=10 ? parseFloat(dqt[i].value) : 0;
    res += parseFloat(thi[i].value) > 0 && parseFloat(thi[i].value) <= 10 ? parseFloat(thi[i].value) : 0;
    res /= 2;
    res = Math.round(res * 100) / 100;
    kthp[i].innerText = res;

    var std = students[now];
    std.scoresTb2[i * 3] = parseFloat(dqt[i].value) > 0 ? parseFloat(dqt[i].value) : 0;
    std.scoresTb2[i * 3 + 1] = parseFloat(thi[i].value) > 0 ? parseFloat(thi[i].value) : 0;
    std.scoresTb2[i * 3 + 2] = res;
    students[now] = std;
    localStorage.setItem('students', JSON.stringify(students));
    
}
var isSave;
function resetInput(){
    if (isSave) {
        alert("điểm của bạn đã được lưu lại");
    } else {
        var isReset = confirm("Điểm của bạn chưa được lưu\n bạn có chắc muốn RESET lại không?");
        if (isReset) {
            students[now].scoresTb1 = [];
            students[now].scoresTb2 = [];
            localStorage.setItem('students', JSON.stringify(students));
            
        }
    }
    location.reload();
}
function saveInput() {
    alert("Điểm của bạn đã được lưu lại");
    isSave = true;
    location.href = "./transcript.html";
    showTranscript(students[now]);
    
}

function acceptLeave(){
    var isLeave = confirm("Bạn có chắc muốn rời khỏi?");
    if (!isLeave) {
        if (!isSave) {
            students[now].scoresTb1 = [];
            students[now].scoresTb2 = [];
            localStorage.setItem('students', JSON.stringify(students));
        }
        
    } else {
        location.href = "./../index.html";
    }
}
function showTranscript(stdNow) {
    var msv = stdNow.msv == "" ? "---" : stdNow.msv;
    var name = stdNow.name == "" ? "---" : stdNow.name;
    document.getElementById("msv").innerText = `10430`;
    document.getElementById("name").innerText = `${name}`;
}