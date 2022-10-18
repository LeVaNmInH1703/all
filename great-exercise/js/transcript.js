var semester = 'semester0';
var filter = 'filter1';
function changeSemester() {
    var selectSemester = document.getElementById("select-semester");
    semester = selectSemester.value;
    var semester1 = document.querySelectorAll(".table2__semester1");
    var semester2 = document.querySelectorAll(".table2__semester2");
    if (semester == 'semester1') {
        for (var i = 0; i < semester2.length; i++) {
            semester2[i].style.display = 'none';
        }
        for (var i = 0; i < semester1.length; i++) {
            semester1[i].style.display = 'table-row';
        }
        changeDisplay(1);
    } else if (semester == 'semester2') {
        for (var i = 0; i < semester1.length; i++) {
            semester1[i].style.display = 'none';
        }
        for (var i = 0; i < semester2.length; i++) {
            semester2[i].style.display = 'table-row';
        }
        changeDisplay(2);
    } else if (semester == 'semester0') {
        for (var i = 0; i < semester2.length; i++) {
            semester2[i].style.display = 'table-row';
        }
        for (var i = 0; i < semester1.length; i++) {
            semester1[i].style.display = 'table-row';
        }
        changeDisplay(0);
    }
}


function changeDisplay(smt) {
    var stt,table2Row;
    if (smt == 0) {
        stt = document.querySelectorAll(".table2 [class^='table2__semester'] td:first-child")
        console.log(stt.length);
        table2Row = document.querySelectorAll(".table2 [class^='table2__semester']");
        change();
    } else if (smt == 1) {
        stt = document.querySelectorAll(".table2 .table2__semester1 td:first-child")
        console.log(stt.length);
        table2Row = document.querySelectorAll(".table2 .table2__semester1");
        change();
    } else if (smt == 2) {
        stt = document.querySelectorAll(".table2 .table2__semester2 td:first-child")
        console.log(stt.length);
        table2Row = document.querySelectorAll(".table2 .table2__semester2");
        change();
    } 
    function change() {
        for (var i = 0; i < stt.length; i++) {
            stt[i].innerText = i + 1;
            if (i % 2 == 1) {
                table2Row[i].classList.add("table-row-c");
            }else{
                table2Row[i].classList.remove("table-row-c");
            }
        } 
    }
}

changeDisplay(0);

function changeFilter() {
    var selectFilter = document.getElementById("select-filter");
    filter = selectFilter.value;
    console.log(filter);
}