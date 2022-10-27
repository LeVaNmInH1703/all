var semester = 'semester0';
changeSemester();
function changeSemester() {
    var selectSemester = document.getElementById("select-semester");
    semester = selectSemester.value;
    var semester1 = document.querySelectorAll(".table2__semester1");
    var semester2 = document.querySelectorAll(".table2__semester2");
    var stt,table2Row;
    if (semester == 'semester1') {
        for (var i = 0; i < semester2.length; i++) {
            semester2[i].style.display = 'none';
        }
        for (var i = 0; i < semester1.length; i++) {
            semester1[i].style.display = 'table-row';
        }
        stt = document.querySelectorAll(".table2 .table2__semester1 td:first-child")
        table2Row = document.querySelectorAll(".table2 .table2__semester1");
        changeRow(stt,table2Row);
    } else if (semester == 'semester2') {
        for (var i = 0; i < semester1.length; i++) {
            semester1[i].style.display = 'none';
        }
        for (var i = 0; i < semester2.length; i++) {
            semester2[i].style.display = 'table-row';
        }
        stt = document.querySelectorAll(".table2 .table2__semester2 td:first-child")
        table2Row = document.querySelectorAll(".table2 .table2__semester2");
        changeRow(stt,table2Row);
    } else if (semester == 'semester0') {
        for (var i = 0; i < semester2.length; i++) {
            semester2[i].style.display = 'table-row';
        }
        for (var i = 0; i < semester1.length; i++) {
            semester1[i].style.display = 'table-row';
        }
        stt = document.querySelectorAll(".table2 [class^='table2__semester'] td:first-child")
        table2Row = document.querySelectorAll(".table2 [class^='table2__semester']");
        changeRow(stt,table2Row);
    }
}
function changeRow(stt,tableRow) {
    for (var i = 0; i < stt.length; i++) {
        stt[i].innerText = i + 1;
        if (i % 2 == 1) {
            tableRow[i].classList.add("table-row-c");
        }else{
            tableRow[i].classList.remove("table-row-c");
        }
    } 
}



function loginSuccess() {
    var students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem('students')) : [];
    var i = localStorage.getItem("now");
    i = parseInt(i);
    var stdNow = students[i];
    var msv = stdNow.msv == "" ? "---" : stdNow.msv;
    var name = stdNow.name == "" ? "---" : stdNow.name;
    document.getElementById("msv").innerText = `${msv}`;
    document.getElementById("name").innerText = `${name}`;
    var tbtl10n1 = document.querySelectorAll(".table1 tr td:nth-child(3)");
    var tbtl4n1 = document.querySelectorAll(".table1 tr td:nth-child(5)");
    var tbc10n1 = document.querySelectorAll(".table1 tr td:nth-child(9)");
    var tbc4n1 = document.querySelectorAll(".table1 tr td:nth-child(11)");
    var scoresTb1 = [...tbtl10n1, ...tbtl4n1, ...tbc10n1, ...tbc4n1];
    for (var i = 0; i < scoresTb1.length; i++){
        var temp = stdNow.scoresTb1[i] == null || stdNow.scoresTb1[i] >= 10 ? 0 : stdNow.scoresTb1[i];
        scoresTb1[i].innerText = `${temp}`;
    }
    var scoresTb2 = document.querySelectorAll(".table2 tr td:nth-child(11),.table2 tr td:nth-child(12),.table2 tr td:nth-child(13)");
    for (var i = 0; i < scoresTb2.length; i++){
        var temp = stdNow.scoresTb2[i]==null || stdNow.scoresTb2[i] >= 10 ? 0 : stdNow.scoresTb2[i];
        scoresTb2[i].innerText = `${temp}`;
    };
    var msv = document.querySelectorAll('.table2 tr td:nth-child(10)');
    for (var i = 0; i < msv.length; i++){
        var temp = stdNow.msv;
        msv[i].innerText = `${temp}`;
    };
    if (stdNow.msv.length > 0) {
         document.getElementById('header__user-name').innerText=`${stdNow.name} (${stdNow.msv})`;
    } else {
        document.getElementById('header__user-name').innerText=`${stdNow.name}`;
    }
   
}

function editScores() {
    location.href = './../inputScores.html';
}