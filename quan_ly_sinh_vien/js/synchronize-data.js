
/* ------ Start Global Variables Declaration ------*/
var indexInLocalStorage = MINUS_ONE_NUMBER;
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
function checkDataIntegrityBeforeChange(actionType, studentObject) {
    currentActiveElement = document.activeElement;
    actionType = actionType.toLowerCase().trim();

    if (actionType === ACTION_ADD_STUDENT) {
        return !isDataChangedBeforeAdd(actionType);
    } else if (actionType === ACTION_UPDATE_STUDENT || actionType === ACTION_DELETE_STUDENT) {
        return !isDataChangedBeforeUpdateOrDelete(actionType, studentObject);
    }

    return false;
}

function isDataChangedBeforeAdd(actionType) {
    return (
        isLengthOfStudentInfoListChanged(actionType) || 
        isDataOfStudentInfoListChanged(actionType)
    );
}

function isDataChangedBeforeUpdateOrDelete(actionType, studentObject) {
    return (
        isCurrentStudentIdNotExisted(studentObject) || 
        isLengthOfStudentInfoListChanged(actionType) || 
        isDataOfCurrentStudentChanged(actionType, studentObject) || 
        isDataOfStudentInfoListChanged(actionType)
    );
}

function isLengthOfStudentInfoListChanged(actionType) {
    if (students.length !== getLengthOfListInLocalStorage()) {
        showAlertWhenLengthOfListChanged(actionType);
        return true;
    } else {
        return false;
    }
}

function isDataOfStudentInfoListChanged(actionType) {
    let studentInfoList = localStorage.getItem('students');

    if (studentInfoList && studentInfoList != '[]') {
        let studentsInLocalStorage = JSON.parse(studentInfoList.trim());

        for (let i = 0; i < students.length; i++) {
            if (!isEqualObject(studentsInLocalStorage[i], students[i])) {
                showAlertWhenDataOfListChanged(actionType);
                return true;
            } else {
                continue;
            }
        }
    }

    return false;
}

function isCurrentStudentIdNotExisted(studentObject) {
    let studentInfoList = localStorage.getItem('students');

    if (studentInfoList && studentInfoList != '[]') {
        let studentId = parseInt(studentObject.id);
        let studentsInLocalStorage = JSON.parse(studentInfoList.trim());
        indexInLocalStorage = findIndexOfItemByIdInArray(studentsInLocalStorage, studentId);

        if (indexInLocalStorage === MINUS_ONE_NUMBER) {
            showAlertWhenStudentIdNotExisted(studentObject.fullName);
            return true;
        } else {
            return false;
        }
    } else {
        showAlertWhenStudentIdNotExisted(studentObject.fullName);
        return true;
    }
}

function isDataOfCurrentStudentChanged(actionType, studentObject) {
    let studentInfoList = localStorage.getItem('students');

    if (studentInfoList && studentInfoList != '[]') {
        let studentsInLocalStorage = JSON.parse(studentInfoList.trim());

        if (!isEqualObject(studentsInLocalStorage[indexInLocalStorage], studentObject)) {
            showAlertWhenStudentDataChanged(actionType, studentObject);
            return true;
        } else {
            return false;
        }
    } else {
        showAlertWhenStudentDataChanged(actionType, studentObject);
        return true;
    }
}

function showAlertWhenLengthOfListChanged(actionType) {
    showAlertWhenStudentInfoListChanged(actionType);
}

function showAlertWhenDataOfListChanged(actionType) {
    showAlertWhenStudentInfoListChanged(actionType);
}

function showAlertWhenStudentInfoListChanged(actionType) {
    let textValueOfAction = getTextValueOfAction(actionType);

    alertBeforeChange(
        `Hộp thoại Cảnh báo`, 
        `Danh sách sinh viên hiện chưa được đồng bộ. Chương trình phát hiện đã có sự thay đổi trước đó.<br>
        Bạn vui lòng nhấn nút Đồng bộ trước khi ${textValueOfAction}.`, 
        `Đồng bộ trước khi ${textValueOfAction}`, 
        currentActiveElement, 
        function(isAlertOk) {
            if (isAlertOk) {
                processDisplayBeforeSynchronize();
                synchronizeData(true);
            }
        }
    );
}

function showAlertWhenStudentIdNotExisted(studentFullName) {
    alertBeforeChange(
        `Hộp thoại Cảnh báo`, 
        `Thông tin về sinh viên ${studentFullName} hiện không còn tồn tại do dữ liệu đã bị xóa trước đó.<br>
        Bạn vui lòng nhấn nút Đồng bộ để kiểm tra.`, 
        `Đồng bộ Danh sách sinh viên`, 
        currentActiveElement, 
        function(isAlertOk) {
            if (isAlertOk) {
                processDisplayBeforeSynchronize();
                synchronizeData(false, true);
            }
        }
    );
}

function showAlertWhenStudentDataChanged(actionType, studentObject) {
    let textValueOfAction = getTextValueOfAction(actionType);

    alertBeforeChange(
        `Hộp thoại Cảnh báo`, 
        `Dữ liệu về sinh viên ${studentObject.fullName} hiện chưa được đồng bộ do thông tin đã bị thay đổi trước đó.<br>
        Bạn vui lòng nhấn nút Đồng bộ trước khi ${textValueOfAction}.`, 
        `Đồng bộ trước khi ${textValueOfAction}`, 
        currentActiveElement, 
        function(isAlertOk) {
            if (isAlertOk) {
                processDisplayBeforeSynchronize();
                synchronizeData(false, false, studentObject);
            }
        }
    );
}

function processDisplayBeforeSynchronize() {
    setTimeout(function() {
        showProcessWindow(
            `Bạn vui lòng chờ trong giây lát.<br>
            Chương trình đang đồng bộ dữ liệu...`
        );
    }, 300);

    setTimeout(function() { hideProcessWindow(); }, 3000);
}

function synchronizeData(isLengthOfListChanged, isStudentIdNotExisted = false, studentObject = null) {
    if (isLengthOfListChanged || isStudentIdNotExisted) {
        setTimeout(function() {
            displayStudentInfoList();

            if (findIndexOfItemByIdInArray(students, currentStudentId) === MINUS_ONE_NUMBER) {
                btnSaveStudentInfo.value     = ACTION_ADD_STUDENT;
                btnSaveStudentInfo.innerText = 'Thêm mới';
            }
        }, 3200);

        setTimeout(function() {
            sendAlertNotification(
                `Chương trình đã <font color='#ffff00'>đồng bộ xong</font> dữ liệu Danh sách sinh viên !`, 
                3500, '#104463'
            );
        }, 4000);
    } else {
        setTimeout(function() { displayStudentInfoListAfterSynchronize(parseInt(studentObject.id)); }, 3200);
        setTimeout(function() { scrollBackToFocusedTableRow(); }, 3600);

        setTimeout(function() {
            sendAlertNotification(
                `Chương trình đã <font color='#ffff00'>đồng bộ xong</font> dữ liệu về sinh viên <font color='#ffff00'>${studentObject.fullName}</font> !`, 
                3500, '#104463'
            );
        }, 4200);
    }
}

function displayStudentInfoListAfterSynchronize(synchronizedStudentId) {
    let studentInfoList = localStorage.getItem('students');

    if (studentInfoList && studentInfoList != '[]') {
        students                = JSON.parse(studentInfoList.trim());
        foundStudents           = getArrayOfSearchedStudents();
        let synchronizedStudent = getStudentById(foundStudents, synchronizedStudentId);

        if (synchronizedStudent) {
            tblStudentInfoList.innerHTML = renderStudentDataTable(foundStudents);
            currentTableRowIndex = findIndexOfItemByIdInArray(foundStudents, synchronizedStudentId);
        } else {
            resetFilterSearchForm();
            txtKeywordSearch.blur();

            tblStudentInfoList.innerHTML = renderStudentDataTable(students);
            currentTableRowIndex = findIndexOfItemByIdInArray(students, synchronizedStudentId);
        }

        if (currentTableRowIndex >= 0) {
            setBgColorOfCurrentTableRow(currentTableRowIndex, ACTION_UPDATE_STUDENT);
            currentLocationFromTop = getLocationFromTopOfTableRow(currentTableRowIndex);
        }
    } else {
        tblStudentInfoList.innerHTML = renderStudentDataTable([]);
    }
}

function getLengthOfListInLocalStorage() {
    let studentInfoList = localStorage.getItem('students');

    if (studentInfoList && studentInfoList != '[]') {
        return JSON.parse(studentInfoList.trim()).length;
    } else {
        return 0;
    }
}

function getTextValueOfAction(actionType) {
    if (actionType === ACTION_ADD_STUDENT) {
        return 'Thêm mới';
    } else if (actionType === ACTION_UPDATE_STUDENT) {
        return 'Cập nhật';
    } else if (actionType === ACTION_DELETE_STUDENT) {
        return 'Xóa';
    }

    return `Thao tác người dùng chưa xác định.<br>Chức năng đã có lỗi xảy ra !!!`;
}

function isEqualObject(jsonObject_1, jsonObject_2) {
    if (Object.keys(jsonObject_1).length === Object.keys(jsonObject_2).length) {
        for (key in jsonObject_1) {
            if (jsonObject_1[key] === jsonObject_2[key]) {
                continue;
            } else {
                return false;
            }
        }

        return true;
    } else {
        return false;
    }
}
/* ------ End Functions Declaration ------*/