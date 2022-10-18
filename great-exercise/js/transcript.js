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
changeDisplay(0);


