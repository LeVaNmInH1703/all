
/* ------ Start Constants Declaration ------*/
const TABLE_COLUMN_COUNT    = 7;
const TABLE_HEADER          = `
    <tr id="first-row">
        <td id="col-header-order">No</td>
        <td>Họ và Tên</td>
        <td id="col-header-email">Địa chỉ Email</td>
        <td>Điện thoại</td>
        <td id="col-header-hometown">Quê quán</td>
        <td>Giới tính</td>
        <td id="col-header-action">Thao tác</td>
    </tr>
`;
/* ------ End Constants Declaration ------*/

/* ------ Start Functions Declaration ------*/
function getGenderText(genderValue) {
    let genderText;

    switch (genderValue) {
        case '1':
            genderText = 'Nam';
            break;

        case '2':
            genderText = 'Nữ';
            break;

        default:
            genderText = 'Undefined Gender';
            break;
    }

    return genderText;
}

function getGenderValue(genderText) {
    let genderValue;
    genderText = genderText.toLowerCase().trim();

    switch (genderText) {
        case 'nam':
            genderValue = '1';
            break;

        case 'nữ':
            genderValue = '2';
            break;

        default:
            genderValue = 'Undefined Gender';
            break;
    }

    return genderValue;
}

function standardizePhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/( |\.|\+)+/g, EMPTY_STRING).trim();

    phoneNumber = phoneNumber.replace(/^(.{4})(.{3})(.{2,3})(.*)/, '$1.$2.$3.$4');

    phoneNumber = phoneNumber.replace(/\.$/, EMPTY_STRING);

    return phoneNumber;
}

function setStringForNumberValue(valueOfNumber) {
    if (valueOfNumber < 0) {
        return 'Invalid Value Of Number';
    } else if (valueOfNumber >= 0 && valueOfNumber < 10) {
        return ('0' + valueOfNumber.toString());
    } else {
        return valueOfNumber.toString();
    }
}

function setStringForOrderNumber(orderNumber, objectTotal) {
    if (orderNumber < 1) {
        return 'Invalid Order Number !!!';
    } else if (objectTotal < 1) {
        return 'Invalid Total of Students !!!';
    } else if (orderNumber > objectTotal) {
        return 'Invalid Input Value of Parameters !!!';
    } else {
        return padLeftByZeroForNumber(orderNumber, findNearestPowerOfTen(objectTotal));
    }
}

function padLeftByZeroForNumber(integerNumber, length) {
    let resultString = integerNumber.toString().trim();

    while (resultString.length < length) {
        resultString = '0' + resultString;
    }

    return resultString;
}

/**
Find the nearest power of ten (p) for any integer number (n).
- if n = 0 then p = 0.
- if n > 0 then 10^(p-1) <= n < 10^p.
- if n < 0 then 10^(p-1) <= -n < 10^p.
*/
function findNearestPowerOfTen(integerNumber) {
    if (integerNumber == 0) {
        return 0;
    }

    if (integerNumber < 0) {
        integerNumber = -integerNumber;
    }

    let nearestPowerOfTen = 0;

    while (integerNumber > 0) {
        nearestPowerOfTen++;
        integerNumber = parseInt(integerNumber / 10);
    }

    return nearestPowerOfTen;
}

function setBgColorOfFocusedTableRow(sourceElementObject, sourceElementType) {
    sourceElementType = sourceElementType.toLowerCase().trim();
    let focusedTableRow;

    if (sourceElementType === 'table-row' || sourceElementType === 'row') {
        focusedTableRow = sourceElementObject;
    } else if (sourceElementType === 'table-column' || sourceElementType === 'column') {
        focusedTableRow = sourceElementObject.parentNode;
    } else if (sourceElementType === 'link-tag' || sourceElementType === 'link') {
        focusedTableRow = sourceElementObject.parentNode.parentNode.parentNode;
    } else {
        return;
    }

    if (focusedTableRow) {
        resetBgColorOfAllTableRows();

        if (focusedTableRow.className) {
            let focusedClassName = focusedTableRow.className.toLowerCase().trim();

            if (focusedClassName.indexOf('focused-row') === -1) {
                focusedTableRow.className += ' focused-row';
            }
        } else {
            focusedTableRow.className = 'focused-row';
        }
    }
}

function resetBgColorOfAllTableRows() {
    let tableRowList = document.querySelectorAll('div.list-student table tr');

    for (let i = 0; i < tableRowList.length; i++) {
        tableRowList[i].classList.remove('focused-row');
    }
}

function setBgColorOfCurrentTableRow(tableRowIndex, actionType = EMPTY_STRING) {
    let tableRowList = document.querySelectorAll('div.list-student table tr:not(#first-row)');
    let currentTableRow = tableRowList[tableRowIndex];

    currentTableRow.classList.add('focused-row');
    actionType = actionType.toLowerCase().trim();

    if (actionType === ACTION_UPDATE_STUDENT) {
        setTimeout(function() {
            currentTableRow.classList.toggle('focused-row');
        }, 300);

        setTimeout(function() {
            currentTableRow.classList.toggle('focused-row');
        }, 800);
    }
}

// Using the Binary-Search Algorithm.
// The array of objects was sorted by key value before searching.
function findIndexOfItemInArray(arrayOfObjects, sortOrderInArray, propertyNameOfKey, searchedValue) {
    if (arrayOfObjects.length === 0) { return MINUS_ONE_NUMBER; }

    let startIndex = 0;
    let endIndex   = arrayOfObjects.length - 1;

    let middleIndex;
    sortOrderInArray = sortOrderInArray.toLowerCase().trim();

    if (sortOrderInArray === 'asc' || sortOrderInArray === 'ascending') {
        while (startIndex <= endIndex) {
            middleIndex = Math.floor((startIndex + endIndex) / 2);

            if (searchedValue < arrayOfObjects[middleIndex][propertyNameOfKey]) {
                endIndex = middleIndex - 1;
            } else if (searchedValue > arrayOfObjects[middleIndex][propertyNameOfKey]) {
                startIndex = middleIndex + 1;
            } else {
                return middleIndex;
            }
        }
    } else if (sortOrderInArray === 'desc' || sortOrderInArray === 'descending') {
        while (startIndex <= endIndex) {
            middleIndex = Math.floor((startIndex + endIndex) / 2);

            if (searchedValue < arrayOfObjects[middleIndex][propertyNameOfKey]) {
                startIndex = middleIndex + 1;
            } else if (searchedValue > arrayOfObjects[middleIndex][propertyNameOfKey]) {
                endIndex = middleIndex - 1;
            } else {
                return middleIndex;
            }
        }
    }

    return MINUS_ONE_NUMBER;
}

// The array of objects was sorted by descending value of ID before searching.
function findIndexOfItemByIdInArray(arrayOfObjects, searchedValue, sortOrderInArray = 'desc') {
    return findIndexOfItemInArray(arrayOfObjects, sortOrderInArray, 'id', searchedValue);
}

function getCurrentDateTime() {
    let currentDateTime = new Date();

    let strCurrentDateTime = ('00' + currentDateTime.getDate()).slice(-2) 
        + '-'
        + ('00' + (currentDateTime.getMonth() + 1)).slice(-2) 
        + '-'
        + currentDateTime.getFullYear() 
        + '_' 
        + ('00' + currentDateTime.getHours()).slice(-2) 
        + ('00' + currentDateTime.getMinutes()).slice(-2) 
        + ('00' + currentDateTime.getSeconds()).slice(-2)
    ;

    return strCurrentDateTime;
}

function findMaxNumber(number_1, number_2) {
    if (number_1 >= number_2) {
        return number_1;
    } else {
        return number_2;
    }
}

function getCurrentBrowser() {
    let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    if (isChrome) { return 'Chrome'; }

    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    if (isOpera) { return 'Opera'; }

    let isFirefox = typeof InstallTrigger !== 'undefined';

    if (isFirefox) { return 'Firefox'; }

    let isIE = false || !!document.documentMode;

    if (isIE) { return 'IE'; }

    let isEdge = !isIE && !!window.StyleMedia;

    if (isEdge) { return 'Edge'; }

    let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]"; 
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    if (isSafari) { return 'Safari'; }

    let userAgent = window.navigator.userAgent;
    let isSafariOniOS = (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));

    if (isSafariOniOS) { return 'Safari on iOS'; }

    // Detect the Blink Engine
    let isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isBlink) { return 'Blink'; }

    return 'Chrome';
}

function getVerticalScrollbarWidthOfPage() {
    return (window.innerWidth - document.documentElement.clientWidth);
}
/* ------ End Functions Declaration ------*/