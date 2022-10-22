
/* ------ Start Global Variables Declaration ------*/
var btnFilterSearch = document.getElementById('btnFilterSearch');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
btnFilterSearch.onclick = function() { filterSearch(); }

function filterSearch() {
    if (!Array.isArray(students) || students.length === 0) {
        sendAlertNotification(`
            Chức năng này hiện không khả dụng do chưa có dữ liệu sinh viên.<br>
            Bạn vui lòng nhập liệu trước khi thực hiện Tìm kiếm và Lọc.
        `, 4000);

        return;
    }

    foundStudents = getArrayOfSearchedStudents();
    displayStudentInfoListAfterSearching();

    if (btnSaveStudentInfo.value.toLowerCase().trim() === ACTION_UPDATE_STUDENT) {
        resetStudentForm(false);
    }
    divSettingBoxContainer.focus();
}

function getArrayOfSearchedStudents() {
    let searchedStudents = [];
    let searchedKeyword = txtKeywordSearch.value.trim();
    let selectedGenderValue = selGender.value;
    let genderValue;

    if (isEmpty(searchedKeyword)) {
        if (selectedGenderValue !== '1' && selectedGenderValue !== '2') {
            searchedStudents = students;
        } else {
            students.forEach(function(student, index) {
                genderValue = getGenderValue(student.gender);

                if (genderValue === selectedGenderValue) {
                    searchedStudents.push(student);
                }
            });
        }
    } else {
        let arrayOfSearchedValues = getArrayOfSearchedValues(searchedKeyword);
        let originalPhoneNumber;
        let searchedRegExp;
        let isGenderFiltered;

        if (selectedGenderValue !== '1' && selectedGenderValue !== '2') {
            isGenderFiltered = false;
        } else {
            isGenderFiltered = true;
        }

        students.forEach(function(student, index) {
            originalPhoneNumber = getOriginalPhoneNumber(student.phoneNumber);
            genderValue         = getGenderValue(student.gender);

            for (let i = 0; i < arrayOfSearchedValues.length; i++) {
                if (isRegularExpression(arrayOfSearchedValues[i])) {
                    searchedRegExp = new RegExp(reformatRegularExpression(arrayOfSearchedValues[i]));

                    if ((searchedRegExp.test(student.fullName.toLowerCase()) || 
                         searchedRegExp.test(student.emailAddress.toLowerCase()) || 
                         searchedRegExp.test(student.phoneNumber) || 
                         searchedRegExp.test(originalPhoneNumber))
                        && ((!isGenderFiltered) || (genderValue === selectedGenderValue))) {
                        searchedStudents.push(student);
                        break;
                    }
                } else {
                    if ((student.fullName.toLowerCase().indexOf(arrayOfSearchedValues[i]) !== -1 || 
                         student.emailAddress.toLowerCase().indexOf(arrayOfSearchedValues[i]) !== -1 || 
                         student.phoneNumber.indexOf(arrayOfSearchedValues[i]) !== -1 || 
                         originalPhoneNumber.indexOf(arrayOfSearchedValues[i]) !== -1)
                        && ((!isGenderFiltered) || (genderValue === selectedGenderValue))) {
                        searchedStudents.push(student);
                        break;
                    }
                }
            }
        });
    }

    return searchedStudents;
}

function getArrayOfSearchedValues(searchedKeyword) {
    searchedKeyword = searchedKeyword.trim().toLowerCase();

    searchedKeyword = searchedKeyword.replace(/^[,;\s]+/, EMPTY_STRING);

    searchedKeyword = searchedKeyword.replace(/[,;\s]+$/, EMPTY_STRING);

    return standardizeSearchedValues(searchedKeyword.split(/[,;]+/));
}

function standardizeSearchedValues(arrayOfSearchedValues) {
    let newArrayOfSearchedValues = [];
    let searchedPhoneNumberValue;

    for (let i = 0; i < arrayOfSearchedValues.length; i++) {
        arrayOfSearchedValues[i] = arrayOfSearchedValues[i].trim();

        if (isEmpty(arrayOfSearchedValues[i])) { continue; }

        if (/^(\d|\.|\+| )+$/.test(arrayOfSearchedValues[i])) {
            searchedPhoneNumberValue = reformatPhoneNumber(arrayOfSearchedValues[i]);

            if (searchedPhoneNumberValue !== arrayOfSearchedValues[i]) {
                newArrayOfSearchedValues.push(searchedPhoneNumberValue);
            }
        }

        newArrayOfSearchedValues.push(arrayOfSearchedValues[i]);
    }

    return newArrayOfSearchedValues;
}

function reformatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/( |\.|\+)+/g, EMPTY_STRING).trim();

    phoneNumber = phoneNumber.replace(/^(.{4})(.{1,3})(.*)/, '$1.$2.$3');

    phoneNumber = phoneNumber.replace(/\.$/, EMPTY_STRING);

    return phoneNumber;
}

function getOriginalPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/( |\.|\+)+/g, EMPTY_STRING).trim();

    return phoneNumber;
}

function isRegularExpression(inputData) {
    if (isEmpty(inputData)) { return false; }

    if (inputData.indexOf('^') !== -1 || 
        inputData.indexOf('$') !== -1) {
        return true;
    }

    return false;
}

function reformatRegularExpression(inputRegExpString) {
    if (inputRegExpString.charAt(0) === '^' && 
        inputRegExpString.charAt(inputRegExpString.length - 1) === '$') {
        inputRegExpString = inputRegExpString.replace(/( |\+)+/g, '.*');
    }

    return inputRegExpString;
}
/* ------ End Functions Declaration ------*/