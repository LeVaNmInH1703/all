
/* ------ Start Global Variables Declaration ------*/
var sampleDataOfStudents = [
    {"id":"1","fullName":"Phạm Hồng Phong","emailAddress":"conan1988@yahoo.com","phoneNumber":"0988.102.888","homeTown":"Hà Nội","gender":"Nam"}, 
    {"id":"2","fullName":"Trần Ngọc Linh","emailAddress":"doitruong23@hotmail.com","phoneNumber":"0912.203.885","homeTown":"Nam Định","gender":"Nữ"}, 
    {"id":"3","fullName":"Trần Minh Vương","emailAddress":"vuongtm_hp@gmail.com","phoneNumber":"0913.993.311","homeTown":"Hải Phòng","gender":"Nữ"}, 
    {"id":"4","fullName":"Nguyễn Trung Thành","emailAddress":"mu_reddelvin124@gmail.com","phoneNumber":"0904.177.324","homeTown":"Thái Nguyên","gender":"Nam"}, 
    {"id":"5","fullName":"Lê Minh Ngọc","emailAddress":"ngoclm.hp@gmail.com","phoneNumber":"0904.637.858","homeTown":"Hải Phòng","gender":"Nữ"}, 
    {"id":"6","fullName":"Trần Bình An","emailAddress":"binhantran@yahoo.com.vn","phoneNumber":"0842.448.799","homeTown":"Bắc Giang","gender":"Nam"}, 
    {"id":"7","fullName":"Vũ Hoàng Yến","emailAddress":"hoangyen.87@gmail.com","phoneNumber":"0983.125.383","homeTown":"Ninh Bình","gender":"Nữ"}, 
    {"id":"8","fullName":"Trương Minh Khôi","emailAddress":"langtumuadong@hotmail.com","phoneNumber":"0987.385.999","homeTown":"Hà Nội","gender":"Nam"}, 
    {"id":"9","fullName":"Nguyễn Ngọc Minh","emailAddress":"minhnn.90@gmail.com","phoneNumber":"0914.833.632","homeTown":"Hà Nam","gender":"Nam"}, 
    {"id":"10","fullName":"Phạm Bích Ngọc","emailAddress":"ngocpham.bio@gmail.com","phoneNumber":"0906.235.827","homeTown":"Thanh Hóa","gender":"Nữ"}, 
    {"id":"11","fullName":"Nguyễn Thành Nam","emailAddress":"namnguyen12894@gmail.com","phoneNumber":"0915.323.884","homeTown":"Bắc Ninh","gender":"Nam"}, 
    {"id":"12","fullName":"Đỗ An Bình","emailAddress":"peace-world.0912@yahoo.com","phoneNumber":"0839.468.681","homeTown":"Lạng Sơn","gender":"Nam"}, 
    {"id":"13","fullName":"Đặng Minh Phương","emailAddress":"peony1208@hotmail.com","phoneNumber":"0912.330.918","homeTown":"Thái Bình","gender":"Nữ"}, 
    {"id":"14","fullName":"Vũ Thuận Yến","emailAddress":"thuanyen.vu.90@gmail.com","phoneNumber":"0916.900.918","homeTown":"Hải Dương","gender":"Nam"}, 
    {"id":"15","fullName":"Đào Thị Thu Nga","emailAddress":"ngadtt.vinh@gmail.com","phoneNumber":"0842.546.813","homeTown":"Nghệ An","gender":"Nữ"}, 
    {"id":"16","fullName":"Nguyễn Tuấn Minh","emailAddress":"onggiaxebus@hotmail.com","phoneNumber":"0917.469.222","homeTown":"Hà Tĩnh","gender":"Nam"}, 
    {"id":"17","fullName":"Phạm Khánh An","emailAddress":"khanhan_tb@gmail.com","phoneNumber":"0983.199.004","homeTown":"Thái Bình","gender":"Nữ"}, 
    {"id":"18","fullName":"Bùi Nam Phương","emailAddress":"namphuong96@gmail.com","phoneNumber":"0842.547.629","homeTown":"Vĩnh Phúc","gender":"Nữ"}, 
    {"id":"19","fullName":"Đặng Nhật Minh","emailAddress":"minhmuoi68@yahoo.com","phoneNumber":"0904.173.922","homeTown":"Điện Biên","gender":"Nam"}, 
    {"id":"20","fullName":"Nguyễn Hoàng Minh","emailAddress":"minhmupmip@gmail.com","phoneNumber":"0914.356.244","homeTown":"Lào Cai","gender":"Nam"}
];

var btnImportSampleData             = document.getElementById('btnImportSampleData');
var divImportSettingBox             = document.querySelector('div.import-setting-box-container div.import-setting-box');
var litImportThreeNewStudents       = document.getElementById('litImportThreeNewStudents');
var litImportFiveNewStudents        = document.getElementById('litImportFiveNewStudents');
var litImportTenNewStudents         = document.getElementById('litImportTenNewStudents');
var litImportFifteenNewStudents     = document.getElementById('litImportFifteenNewStudents');
var litImportTwentyNewStudents      = document.getElementById('litImportTwentyNewStudents');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
btnImportSampleData.onclick         = function() { processImportSettingBox(); }
litImportThreeNewStudents.onclick   = function() { processOnImportSampleData(event, 3); }
litImportFiveNewStudents.onclick    = function() { processOnImportSampleData(event, 5); }
litImportTenNewStudents.onclick     = function() { processOnImportSampleData(event, 10); }
litImportFifteenNewStudents.onclick = function() { processOnImportSampleData(event, 15); }
litImportTwentyNewStudents.onclick  = function() { processOnImportSampleData(event, 20); }

function processImportSettingBox() {
    if (divImportSettingBox.className.toLowerCase().indexOf('hidden') !== -1) {
        showImportSettingBox();

        if (divHelpSettingIcon.className.toLowerCase() === 'focused-menu') {
            hideHelpSettingBox();
        }        
    } else {
        hideImportSettingBox();
    }
}

function showImportSettingBox() {
    divImportSettingBox.classList.remove('hidden-import-setting-box-1');
    divImportSettingBox.classList.remove('hidden-import-setting-box-2');
    divImportSettingBox.classList.toggle('visible-import-setting-box');
}

function hideImportSettingBox() {
    divImportSettingBox.classList.remove('visible-import-setting-box');
    divImportSettingBox.classList.toggle('hidden-import-setting-box-1');

    setTimeout(function() {
        divImportSettingBox.classList.toggle('hidden-import-setting-box-2');
        btnImportSampleData.blur();
        resetBgColorOfAllListItems();
    }, 500);
}

function processOnImportSampleData(event, numberOfStudents) {
    try {
        resetBgColorOfAllListItems();
        setBgColorOfFocusedListItem(event);
        importSampleData(numberOfStudents);
    } catch(exception) {
        btnImportSampleData.blur();

        if (typeof(exception.messageForAlertNotification) === 'undefined') {
            handleUndefinedException(false);
        } else {
            sendAlertNotification(`${exception.messageForAlertNotification}`, 8000);
        }
    }
}

function resetBgColorOfAllListItems() {
    let listItems = document.querySelectorAll('div.import-setting-box-container div.import-setting-box ul li');

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].removeAttribute('style');
    }
}

function setBgColorOfFocusedListItem(event) {
    currentActiveElement = event.target;
    let parentElement = currentActiveElement.parentNode;

    if (currentActiveElement.tagName.toUpperCase() === 'LI') {
        currentActiveElement.setAttribute('style', 'background-color: #f0f0f0;');
    } else if (currentActiveElement.tagName.toUpperCase() === 'A' && parentElement.tagName.toUpperCase() === 'LI') {
        parentElement.setAttribute('style', 'background-color: #f0f0f0;');
    }
}

function importSampleData(numberOfStudents) {
    handleExceptionsForPage();

    confirmBeforeChange(
        'Hộp thoại xác nhận Cài đặt', 
        `Bạn chắc chắn muốn Tạo danh sách ${setStringForNumberValue(numberOfStudents)} sinh viên ?<br>
        <b>Lưu ý: </b>Trước khi Tạo danh sách mới, chương trình sẽ <b>xóa toàn bộ</b> dữ liệu đang có hiện tại.`, 
        currentActiveElement, 
        function(isConfirmationOk) {
            if (isConfirmationOk) {
                processDisplayBeforeImport();
                importDataIntoStudentInfoList(numberOfStudents);
                processDisplayAfterImport(numberOfStudents);
            }
        }, 'import-students' //set the current JS File Name that calls confirmBeforeChange() function
    );
}

function processDisplayBeforeImport() {
    hideImportSettingBox();
    resetFilterSearchForm();
    resetStudentForm(false);

    setTimeout(function() {
        showProcessWindow(
            `Bạn vui lòng chờ trong giây lát.<br>
            Chương trình đang cài đặt dữ liệu...`
        );
    }, 800);
}

function importDataIntoStudentInfoList(numberOfStudents) {
    students = [];

    for (let i = 0; i < numberOfStudents; i++) {
        students.unshift(sampleDataOfStudents[i]);
    }

    localStorage.setItem('students', JSON.stringify(students));
    initializeGlobalStudentId();
}

function processDisplayAfterImport(numberOfStudents) {
    let processingTime = getProcessingTime(numberOfStudents);

    setTimeout(function() { hideProcessWindow(); }, processingTime + 600);
    setTimeout(function() { displayStudentInfoList(); }, processingTime + 800);

    setTimeout(function() {
        sendAlertNotification(
            `<font color='#ffff00'>Cài đặt thành công</font> Danh sách <font color='#ffff00'>${setStringForNumberValue(numberOfStudents)}</font> sinh viên mới !`, 
            3500, '#104463'
        );
    }, processingTime + 1600);
}

function getProcessingTime(numberOfStudents) {
    if (numberOfStudents > 0 && numberOfStudents <= 3) {
        return 2500;
    } else if (numberOfStudents > 3 && numberOfStudents <= 5) {
        return 3000;
    } else if (numberOfStudents > 5 && numberOfStudents <= 10) {
        return 3500;
    } else if (numberOfStudents > 10 && numberOfStudents <= 15) {
        return 4000;
    } else if (numberOfStudents > 15 && numberOfStudents <= 20) {
        return 4000;
    }

    return null;
}
/* ------ End Functions Declaration ------*/