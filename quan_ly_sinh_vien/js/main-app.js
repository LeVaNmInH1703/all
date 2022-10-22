
/* ------ Start Constants Declaration ------*/
const EMPTY_STRING          = '';
const ACTION_ADD_STUDENT    = 'add';
const ACTION_UPDATE_STUDENT = 'update';
const ACTION_DELETE_STUDENT = 'delete';
const ACTION_UNDEFINED      = 'undefined';
const MINUS_ONE_NUMBER      = -1;
/* ------ End Constants Declaration ------*/

/* ------ Start Global Variables Declaration ------*/
var txtFullName             = document.getElementById('txtFullName');
var txtEmailAddress         = document.getElementById('txtEmailAddress');
var txtPhoneNumber          = document.getElementById('txtPhoneNumber');
var txtHomeTown             = document.getElementById('txtHomeTown');
var radMale                 = document.getElementById('male');
var radFemale               = document.getElementById('female');
var btnSaveStudentInfo      = document.getElementById('btnSaveStudentInfo');
var divResetStudentInfo     = document.getElementById('divResetStudentInfo');
var tblStudentInfoList      = document.getElementById('tblStudentInfoList');

var currentStudentId        = MINUS_ONE_NUMBER;
var currentTableRowIndex    = MINUS_ONE_NUMBER;

var students                = [];
var foundStudents           = [];

var errorDetails;
var currentActiveElement;
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
window.onload               = function() { processOnLoadPage(); }

txtFullName.onkeypress      = function() { processOnKeyPress(event); }
txtEmailAddress.onkeypress  = function() { processOnKeyPress(event); }
txtPhoneNumber.onkeypress   = function() { processOnKeyPress(event); }
txtHomeTown.onkeypress      = function() { processOnKeyPress(event); }
radMale.onkeypress          = function() { processOnKeyPress(event); }
radFemale.onkeypress        = function() { processOnKeyPress(event); }

btnSaveStudentInfo.onclick  = function() { processOnSaveStudentInfo(); }
divResetStudentInfo.onclick = function() { resetStudentForm(); }

function processOnLoadPage() {
    try {
        loadPage();
    } catch(exception) {
        resetFilterSearchForm();
        resetStudentForm(false);

        if (typeof(exception.messageForAlertNotification) === 'undefined' || 
            typeof(exception.messageForStudentDataTable) === 'undefined') {
            handleUndefinedException();
        } else {
            initializeSettingsWhenException(exception.messageForAlertNotification);
            renderTableForErrorInfo(exception.messageForStudentDataTable);
        }
    }
}

function loadPage() {
    handleExceptionsForPage();

    let isOpeningIntroRunBefore = localStorage.getItem('isOpeningIntroRunBefore');

    if (isOpeningIntroRunBefore) {
        if (isOpeningIntroRunBefore === '0') {
            chkOpeningIntroRun.checked = true;
            loadPageWithOpeningIntro();
        } else {
            if (isOpeningIntroRunBefore !== '1') {
                localStorage.setItem('isOpeningIntroRunBefore', '1');
            }

            chkOpeningIntroRun.checked = false;
            loadPageNormally();
        }
    } else {
        localStorage.setItem('isOpeningIntroRunBefore', '1');
        chkOpeningIntroRun.checked = false;
        loadPageWithOpeningIntro();
    }
}

function loadPageWithOpeningIntro() {
    showOpeningIntro();
    setTimeout(function() { hideOpeningIntro(); }, 6500);
    setTimeout(function() { loadPageNormally(); }, 9500);
}

function loadPageNormally() {
    resetFilterSearchForm();
    initializeAllNotificationSettings();
    initializeGlobalStudentId();

    resetStudentForm(false);
    displayStudentInfoList(true);
}

function processOnKeyPress(event) {
    // Handle when end-user press Enter key on the keyboard.
    if (event.keyCode === 13) {
        event.preventDefault();
        processOnSaveStudentInfo();
    }
}

function processOnSaveStudentInfo() {
    try {
        saveStudentInfo();
    } catch(exception) {
        btnSaveStudentInfo.blur();

        if (typeof(exception.messageForAlertNotification) === 'undefined') {
            handleUndefinedException(false);
        } else {
            sendAlertNotification(`${exception.messageForAlertNotification}`, 8000);
        }
    }
}

function saveStudentInfo() {
    handleExceptionsForPage();

    let fullName        = txtFullName.value.trim();
    let emailAddress    = txtEmailAddress.value.trim();
    let phoneNumber     = txtPhoneNumber.value.trim();
    let homeTown        = txtHomeTown.value.trim();
    let gender          = radMale.checked ? getGenderText(radMale.value) : 
                          (radFemale.checked ? getGenderText(radFemale.value) : EMPTY_STRING);

    let student = {
        id              : currentStudentId.toString(), 
        fullName        : fullName, 
        emailAddress    : emailAddress, 
        phoneNumber     : phoneNumber, 
        homeTown        : homeTown, 
        gender          : gender
    };

    validateStudentInfo(student);

    let actionType = btnSaveStudentInfo.value.toLowerCase().trim();

    if (actionType === ACTION_ADD_STUDENT) {
        student.id = getGlobalStudentId();
        addStudent(student);
    } else if (actionType === ACTION_UPDATE_STUDENT) {
        updateStudent(student);
    } else {
        sendAlertNotification(`Thao tác người dùng chưa xác định.<br>Chức năng đã có lỗi xảy ra !!!`);
    }
}

function validateStudentInfo(student) {
    errorDetails = [];

    let isValidFullName     = checkFullName(student.fullName);
    let isValidEmailAddress = checkEmailAddress(student.emailAddress);
    let isValidPhoneNumber  = checkPhoneNumber(student.phoneNumber);
    let isValidHomeTown     = checkHomeTown(student.homeTown);
    let isValidGender       = checkGender(student.gender);

    displayErrorInfo(errorDetails);

    let isValidStudent = {
        isValidFullName     : isValidFullName, 
        isValidEmailAddress : isValidEmailAddress, 
        isValidPhoneNumber  : isValidPhoneNumber, 
        isValidHomeTown     : isValidHomeTown, 
        isValidGender       : isValidGender
    };

    setFocusForStudentForm(isValidStudent);

    setEffectForStudentForm(isValidStudent);
}

function setFocusForStudentForm(isValidStudent) {
    if (!isValidStudent.isValidFullName) {
        txtFullName.focus();
        return;
    }

    if (!isValidStudent.isValidEmailAddress) {
        txtEmailAddress.focus();
        return;
    }

    if (!isValidStudent.isValidPhoneNumber) {
        txtPhoneNumber.focus();
        return;
    }

    if (!isValidStudent.isValidHomeTown) {
        txtHomeTown.focus();
        return;
    }

    if (!isValidStudent.isValidGender) {
        radMale.focus();
        return;
    }
}

function setEffectForStudentForm(isValidStudent) {
    setEffectForTextInput(isValidStudent.isValidFullName, txtFullName);
    setEffectForTextInput(isValidStudent.isValidEmailAddress, txtEmailAddress);
    setEffectForTextInput(isValidStudent.isValidPhoneNumber, txtPhoneNumber);
    setEffectForTextInput(isValidStudent.isValidHomeTown, txtHomeTown);

    setEffectForRadioButton(isValidStudent.isValidGender, radMale, false);
    setEffectForRadioButton(isValidStudent.isValidGender, radFemale);
}

function addStudent(student) {
    if (student && errorDetails.length === 0) {
        if (checkDataIntegrityBeforeChange(ACTION_ADD_STUDENT, student)) {
            currentActiveElement = document.activeElement;

            confirmBeforeChange(
                'Hộp thoại xác nhận Thêm', 
                `Bạn chắc chắn muốn thêm sinh viên<br>${student.fullName} vào Danh sách ?`, 
                currentActiveElement, 
                function(isConfirmationOk) {
                    if (isConfirmationOk) {
                        let newPhoneNumber = standardizePhoneNumber(student.phoneNumber);
                        txtPhoneNumber.value = newPhoneNumber;
                        student.phoneNumber = newPhoneNumber;

                        students.unshift(student);
                        localStorage.setItem('students', JSON.stringify(students));

                        setGlobalStudentId((parseInt(student.id) + 1).toString());
                        displayStudentInfoListAfterSaving(student.id, ACTION_ADD_STUDENT);

                        let addingTableRow = document.querySelector('div.list-student table tr:not(#first-row)');
                        setTimeout(function() { addingTableRow.classList.add('added-row'); }, 10);

                        if (chkNotificationAdd.checked === true) {
                            setTimeout(function() { sendNotification(ACTION_ADD_STUDENT, student.fullName); }, 700);
                        }
                    }
                }
            );
        }
    } else {
        return;
    }
}

function updateStudent(student) {
    if (student && errorDetails.length === 0 && currentStudentId !== MINUS_ONE_NUMBER) {
        let index = findIndexOfItemByIdInArray(students, currentStudentId);

        if (checkDataIntegrityBeforeChange(ACTION_UPDATE_STUDENT, students[index])) {
            currentActiveElement = document.activeElement;

            confirmBeforeChange(
                'Hộp thoại xác nhận Sửa', 
                `Bạn chắc chắn muốn cập nhật Thông tin sinh viên<br>${student.fullName} trong Danh sách ?`, 
                currentActiveElement, 
                function(isConfirmationOk) {
                    if (isConfirmationOk) {
                        let newPhoneNumber = standardizePhoneNumber(student.phoneNumber);

                        txtPhoneNumber.value = newPhoneNumber;
                        student.phoneNumber = newPhoneNumber;

                        students[index] = student;
                        localStorage.setItem('students', JSON.stringify(students));

                        displayStudentInfoListAfterSaving(currentStudentId, ACTION_UPDATE_STUDENT);

                        if (currentTableRowIndex >= 0) {
                            setBgColorOfCurrentTableRow(currentTableRowIndex, ACTION_UPDATE_STUDENT);
                            currentLocationFromTop = getLocationFromTopOfTableRow(currentTableRowIndex);
                        }

                        setTimeout(function() { scrollBackToFocusedTableRow(); }, 400);

                        if (chkNotificationUpdate.checked === true) {
                            setTimeout(function() { sendNotification(ACTION_UPDATE_STUDENT, student.fullName); }, 1000);
                        }
                    }
                }
            );
        }
    } else {
        return;
    }
}

function deleteStudent(studentId, sourceElementObject, sourceElementType) {
    let index    = findIndexOfItemByIdInArray(students, studentId);
    let fullName = students[index].fullName;

    if (checkDataIntegrityBeforeChange(ACTION_DELETE_STUDENT, students[index])) {
        currentActiveElement = document.activeElement;

        confirmBeforeChange(
            'Hộp thoại xác nhận Xóa', 
            `Bạn chắc chắn muốn xóa sinh viên<br>${fullName} khỏi Danh sách ?`, 
            currentActiveElement, 
            function(isConfirmationOk) {
                if (isConfirmationOk) {
                    students.splice(index, 1);
                    localStorage.setItem('students', JSON.stringify(students));

                    sourceElementType = sourceElementType.toLowerCase().trim();
                    let deletingTableRow;

                    if (sourceElementType === 'table-row' || sourceElementType === 'row') {
                        deletingTableRow = sourceElementObject;
                    } else if (sourceElementType === 'link-tag' || sourceElementType === 'link') {
                        deletingTableRow = sourceElementObject.parentNode.parentNode.parentNode;
                    } else {
                        return;
                    }

                    if (deletingTableRow) {
                        deletingTableRow.classList.remove('added-row');
                        deletingTableRow.classList.add('deleted-row');

                        if (chkNotificationDelete.checked === true) {
                            setTimeout(function() { sendNotification(ACTION_DELETE_STUDENT, fullName); }, 450);
                        }

                        setTimeout(function() {
                            displayStudentInfoList();

                            if (studentId === currentStudentId) {
                                resetStudentForm(false);
                            } else {
                                if (studentId > currentStudentId) {
                                    currentTableRowIndex--;
                                }

                                if (currentTableRowIndex >= 0) {
                                    setBgColorOfCurrentTableRow(currentTableRowIndex);
                                }
                            }
                        }, 500);
                    }
                }
            }
        );
    }
}

function getStudentById(arrayOfStudents, studentId) {
    let index = findIndexOfItemByIdInArray(arrayOfStudents, studentId);

    if (index !== MINUS_ONE_NUMBER) {
        return arrayOfStudents[index];
    } else {
        return null;
    }
}

function displayStudentInfoList(isFirstFunctionCallOnLoadPage = false) {
    let studentInfoList = localStorage.getItem('students');

    if (studentInfoList && studentInfoList != '[]') {
        students = JSON.parse(studentInfoList.trim());

        if (isFirstFunctionCallOnLoadPage) {
            tblStudentInfoList.innerHTML = renderStudentDataTable(students);
        } else {
            foundStudents = getArrayOfSearchedStudents();
            displayStudentInfoListAfterSearching();
        }
    } else {
        tblStudentInfoList.innerHTML = renderStudentDataTable([]);
    }
}

function displayStudentInfoListAfterSearching() {
    if (foundStudents.length === 0) {
        tblStudentInfoList.innerHTML = renderStudentDataTable([]);
    } else {
        tblStudentInfoList.innerHTML = renderStudentDataTable(foundStudents);
    }
}

function displayStudentInfoListAfterSaving(savedStudentId, actionType) {
    actionType       = actionType.toLowerCase().trim();
    foundStudents    = getArrayOfSearchedStudents();
    let savedStudent = getStudentById(foundStudents, savedStudentId);

    if (savedStudent) {
        tblStudentInfoList.innerHTML = renderStudentDataTable(foundStudents, actionType);

        if (actionType === ACTION_UPDATE_STUDENT) {
            currentTableRowIndex = findIndexOfItemByIdInArray(foundStudents, savedStudentId);
        }
    } else {
        resetFilterSearchForm();
        txtKeywordSearch.blur();
        tblStudentInfoList.innerHTML = renderStudentDataTable(students, actionType);

        if (actionType === ACTION_UPDATE_STUDENT) {
            currentTableRowIndex = findIndexOfItemByIdInArray(students, savedStudentId);
        }
    }
}

function renderStudentDataTable(arrayOfStudents, actionType = EMPTY_STRING) {
    let tableContent = TABLE_HEADER;
    let prefixTableRow;
    let studentId;

    let functionCallFromTableColumn;
    let functionCallFromEditLinkTag;
    let functionCallFromDeleteLinkTag;
    let functionCallFromCopyLinkTag;

    if (Array.isArray(arrayOfStudents) && arrayOfStudents.length) {
        let totalOfStudents = arrayOfStudents.length;

        let studentIdInfo = {
            previousStudentId : MINUS_ONE_NUMBER, 
            presentStudentId  : MINUS_ONE_NUMBER, 
            nextStudentId     : MINUS_ONE_NUMBER
        };

        arrayOfStudents.forEach(function(student, index) {
            studentId = student.id;
            setStudentIdInfo(studentIdInfo, index, arrayOfStudents);

            functionCallFromTableColumn = `
                setBgColorOfFocusedTableRow(this, 'table-column');
                setTimeout(function() {
                    loadStudentInfo(${studentId}, ${index}, '${ACTION_UPDATE_STUDENT}', false);
                }, 200);
                currentLocationFromTop = (document.documentElement.scrollTop || document.body.scrollTop);
                tableRowIndexBeforeUpdate = ${index};
            `;

            functionCallFromEditLinkTag = `
                setBgColorOfFocusedTableRow(this, 'link-tag');
                setTimeout(function() { scrollTopToFocusForm(${index}); }, 150);
                setTimeout(function() {
                    loadStudentInfo(${studentId}, ${index}, '${ACTION_UPDATE_STUDENT}');
                }, 200);
            `;

            functionCallFromDeleteLinkTag = `deleteStudent(${studentId}, this, 'link-tag')`;

            functionCallFromCopyLinkTag = `
                scrollTopToFocusForm(${index});
                resetBgColorOfAllTableRows();
                setTimeout(function() {
                    loadStudentInfo(${studentId}, ${index}, '${ACTION_ADD_STUDENT}');
                }, 50);
            `;

            index++;
            actionType = actionType.toLowerCase().trim();

            if (actionType === ACTION_ADD_STUDENT && index === 1) {
                prefixTableRow = '<tr class="hidden-row"';
            } else {
                prefixTableRow = (index % 2 === 0) ? '<tr class="even-order"' : '<tr';
            }

            tableContent += `
                ${prefixTableRow} tabindex="2" 
                onkeydown="processOnKeyDownTableRow(
                    event, this, ${index - 1}, ${totalOfStudents}, 
                    ${studentIdInfo.previousStudentId}, 
                    ${studentIdInfo.presentStudentId}, 
                    ${studentIdInfo.nextStudentId}
                )">
                    <td onclick="${functionCallFromTableColumn}" 
                        data-student-info="Số thứ tự" align="center" class="col-order">
                        <div>${setStringForOrderNumber(index, totalOfStudents)}</div>
                    </td>
                    <td onclick="${functionCallFromTableColumn}" 
                        data-student-info="Họ và tên">
                        <div>${student.fullName}</div>
                    </td>
                    <td onclick="${functionCallFromTableColumn}" 
                        data-student-info="Địa chỉ Email" class="col-email">
                        <div>${student.emailAddress}</div>
                    </td>
                    <td onclick="${functionCallFromTableColumn}" 
                        data-student-info="Số điện thoại">
                        <div>${student.phoneNumber}</div>
                    </td>
                    <td onclick="${functionCallFromTableColumn}" 
                        data-student-info="Quê quán">
                        <div>${student.homeTown}</div>
                    </td>
                    <td onclick="${functionCallFromTableColumn}" 
                        data-student-info="Giới tính" align="center">
                        <div>${student.gender}</div>
                    </td>
                    <td data-student-info="Thao tác" align="center">
                        <div>
                            <a href="javascript:void(0);" onclick="${functionCallFromEditLinkTag}" 
                               title="Click để sửa thông tin sinh viên ${student.fullName}">Sửa</a> | 
                            <a href="javascript:void(0);" onclick="${functionCallFromDeleteLinkTag}" 
                               title="Click để xóa thông tin sinh viên ${student.fullName}">Xóa</a> | 
                            <a href="javascript:void(0);" onclick="${functionCallFromCopyLinkTag}" 
                               title="Click để copy thông tin sinh viên ${student.fullName}">Copy</a>
                        </div>
                    </td>
                </tr>
            `;
        });
    } else {
        tableContent += `
            <tr class="no-data-found">
                <td align="center" colspan="${TABLE_COLUMN_COUNT}">Không tìm thấy dữ liệu</td>
            </tr>
        `;
    }

    return tableContent;
}

function setStudentIdInfo(studentIdInfo, index, arrayOfStudents) {
    let lengthOfArray = arrayOfStudents.length;

    if (index === 0) {
        studentIdInfo.previousStudentId     = MINUS_ONE_NUMBER;
        studentIdInfo.presentStudentId      = arrayOfStudents[index].id;

        if (lengthOfArray > 1) {
            studentIdInfo.nextStudentId     = arrayOfStudents[index + 1].id;
        } else {
            studentIdInfo.nextStudentId     = MINUS_ONE_NUMBER;
        }
    } else if (index === lengthOfArray - 1) {
        if (index > 0) {
            studentIdInfo.previousStudentId = arrayOfStudents[index - 1].id;
        } else {
            studentIdInfo.previousStudentId = MINUS_ONE_NUMBER;
        }

        studentIdInfo.presentStudentId      = arrayOfStudents[index].id;
        studentIdInfo.nextStudentId         = MINUS_ONE_NUMBER;
    } else {
        studentIdInfo.previousStudentId     = arrayOfStudents[index - 1].id;
        studentIdInfo.presentStudentId      = arrayOfStudents[index].id;
        studentIdInfo.nextStudentId         = arrayOfStudents[index + 1].id;
    }
}

function processOnKeyDownTableRow(event, sourceElementObject, tableRowIndex, tableRowTotal, previousStudentId, presentStudentId, nextStudentId) {
    // Handle when end-user press Up Arrow key on the keyboard.
    if (event.keyCode === 38) {
        processForUpArrowKey(sourceElementObject, tableRowIndex, previousStudentId);
    }

    // Handle when end-user press Down Arrow key on the keyboard.
    if (event.keyCode === 40) {
        processForDownArrowKey(sourceElementObject, tableRowIndex, tableRowTotal, nextStudentId);
    }

    // Handle when end-user press Delete key on the keyboard.
    if (event.keyCode === 46) {
        deleteStudent(presentStudentId, sourceElementObject, 'table-row');
    }
}

function processForUpArrowKey(sourceElementObject, tableRowIndex, previousStudentId) {
    if (tableRowIndex > 0) {
        tableRowIndex--;
        sourceElementObject = sourceElementObject.previousElementSibling;
        sourceElementObject.focus();

        setBgColorOfFocusedTableRow(sourceElementObject, 'table-row');
        setTimeout(function() {
            loadStudentInfo(previousStudentId, tableRowIndex, ACTION_UPDATE_STUDENT, false);
        }, 200);

        currentLocationFromTop = (document.documentElement.scrollTop || document.body.scrollTop);
    }
}

function processForDownArrowKey(sourceElementObject, tableRowIndex, tableRowTotal, nextStudentId) {
    if (tableRowIndex < tableRowTotal - 1) {
        tableRowIndex++;
        sourceElementObject = sourceElementObject.nextElementSibling;
        sourceElementObject.focus();

        setBgColorOfFocusedTableRow(sourceElementObject, 'table-row');
        setTimeout(function() {
            loadStudentInfo(nextStudentId, tableRowIndex, ACTION_UPDATE_STUDENT, false);
        }, 200);

        currentLocationFromTop = (document.documentElement.scrollTop || document.body.scrollTop);
    }
}

function loadStudentInfo(studentId, tableRowIndex, actionType, isStudentFormFocused = true) {
    let student           = getStudentById(students, studentId);

    txtFullName.value     = student.fullName;
    txtEmailAddress.value = student.emailAddress;
    txtPhoneNumber.value  = student.phoneNumber;
    txtHomeTown.value     = student.homeTown;

    let genderText = student.gender.toLowerCase().trim();
    if (genderText === 'nam') {
        radMale.checked   = true;
    } else if (genderText === 'nữ') {
        radFemale.checked = true;
    } else {
        radMale.checked   = false;
        radFemale.checked = false;
    }

    actionType = actionType.toLowerCase().trim();
    if (actionType === ACTION_ADD_STUDENT) {
        btnSaveStudentInfo.value     = ACTION_ADD_STUDENT;
        btnSaveStudentInfo.innerText = 'Thêm mới';

        currentStudentId     = MINUS_ONE_NUMBER;
        currentTableRowIndex = MINUS_ONE_NUMBER;
    } else if (actionType === ACTION_UPDATE_STUDENT) {
        btnSaveStudentInfo.value     = ACTION_UPDATE_STUDENT;
        btnSaveStudentInfo.innerText = 'Cập nhật';

        currentStudentId     = studentId;
        currentTableRowIndex = tableRowIndex;
    } else {
        btnSaveStudentInfo.value     = ACTION_UNDEFINED;
        btnSaveStudentInfo.innerText = 'Chưa xác định';

        currentStudentId     = MINUS_ONE_NUMBER;
        currentTableRowIndex = MINUS_ONE_NUMBER;
    }

    displayErrorInfo([]);
    resetEffectForStudentForm();

    if (isStudentFormFocused) {
        txtFullName.focus();
    }
}

function resetStudentForm(isStudentFormFocused = true) {
    currentStudentId      = MINUS_ONE_NUMBER;
    currentTableRowIndex  = MINUS_ONE_NUMBER;

    txtFullName.value     = EMPTY_STRING;
    txtEmailAddress.value = EMPTY_STRING;
    txtPhoneNumber.value  = EMPTY_STRING;
    txtHomeTown.value     = EMPTY_STRING;

    radMale.checked       = false;
    radFemale.checked     = false;

    btnSaveStudentInfo.value     = ACTION_ADD_STUDENT;
    btnSaveStudentInfo.innerText = 'Thêm mới';

    displayErrorInfo([]);
    resetEffectForStudentForm();

    if (isStudentFormFocused) {
        txtFullName.focus();
    }

    resetBgColorOfAllTableRows();
}

function resetEffectForStudentForm() {
    setEffectForTextInput(true, txtFullName);
    setEffectForTextInput(true, txtEmailAddress);
    setEffectForTextInput(true, txtPhoneNumber);
    setEffectForTextInput(true, txtHomeTown);

    setEffectForRadioButton(true, radMale);
    setEffectForRadioButton(true, radFemale);
}

function initializeGlobalStudentId() {
    localStorage.setItem('global_student_id', getGlobalStudentId());
}

function getGlobalStudentId() {
    let globalStudentId = localStorage.getItem('global_student_id');
    let studentInfoList = localStorage.getItem('students');

    let currentStudents;
    let maxStudentId;

    if (globalStudentId && globalStudentId.length > 0) {
        if (studentInfoList && studentInfoList != '[]') {
            currentStudents = JSON.parse(studentInfoList.trim());
            maxStudentId    = findMaxNumber(parseInt(currentStudents[0].id), currentStudents.length);

            if (!/^[0-9]+$/.test(globalStudentId)) {
                globalStudentId = (maxStudentId + 1).toString();
            } else if (parseInt(globalStudentId) <= maxStudentId) {
                globalStudentId = (maxStudentId + 1).toString();
            }
        } else {
            globalStudentId = '1';
        }
    } else {
        if (studentInfoList && studentInfoList != '[]') {
            currentStudents = JSON.parse(studentInfoList.trim());
            maxStudentId    = findMaxNumber(parseInt(currentStudents[0].id), currentStudents.length);

            globalStudentId = (maxStudentId + 1).toString();
        } else {
            globalStudentId = '1';
        }
    }

    return globalStudentId;
}

function setGlobalStudentId(globalStudentId) {
    localStorage.setItem('global_student_id', globalStudentId);
}
/* ------ End Functions Declaration ------*/