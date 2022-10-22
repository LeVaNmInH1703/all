
/* ------ Start Global Variables Declaration ------*/
var btnDownloadFile = document.getElementById('btnDownloadFile');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
btnDownloadFile.onclick = function() { downloadDataFile(); }

function downloadDataFile() {
    if (!Array.isArray(students) || students.length === 0) {
        sendAlertNotification(`
            Chức năng này hiện không khả dụng do chưa có dữ liệu sinh viên.<br>
            Bạn vui lòng nhập liệu trước khi Tải file.
        `, 4000);

        return;
    }

    let downloadedStudents = getArrayOfSearchedStudents();

    if (!Array.isArray(downloadedStudents) || downloadedStudents.length === 0) {
        sendAlertNotification(`
            Chức năng này hiện không khả dụng do chưa tìm thấy dữ liệu sinh viên phù hợp.<br>
            Bạn vui lòng nhập và chọn lại các Điều kiện Tìm kiếm/Lọc trước khi Tải file.
        `, 4000);

        return;
    }

    exportDataIntoCsvFile(downloadedStudents);
    divSettingBoxContainer.focus();
}﻿﻿﻿

function exportDataIntoCsvFile(arrayOfStudents) {
    let lastIndex       = arrayOfStudents.length - 1;
    let lineBreak       = '\r\n';

    let csvFileContent  = `\uFEFFNo,Họ và Tên,Địa chỉ Email,Điện thoại,Quê quán,Giới tính${lineBreak}`;
    let csvFileName     = `Student List_${getCurrentDateTime()}.csv`;
﻿
    arrayOfStudents.forEach(function(student, index) {
        csvFileContent += `${index + 1},${student.fullName},${student.emailAddress},${student.phoneNumber},${student.homeTown},${student.gender}`;

        if (index < lastIndex) {
            csvFileContent += lineBreak;
        }
    });

    if (window.navigator.msSaveOrOpenBlob) { // using to download file on Microsoft Edge/IE.
        let blobObject = new Blob([csvFileContent]);
        window.navigator.msSaveOrOpenBlob(blobObject, csvFileName);
    } else { // using to download file on other browsers: Chrome; Firefox; Opera; Safari.
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', 'data:application/csv,' + encodeURIComponent(csvFileContent));
        linkElement.setAttribute('download', csvFileName);

        document.body.appendChild(linkElement);
        linkElement.click();
    }
}
/* ------ End Functions Declaration ------*/