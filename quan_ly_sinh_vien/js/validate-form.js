
/* ------ Start Global Variables Declaration ------*/
var divErrorInfo = document.getElementById('divErrorInfo');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
function checkFullName(fullName) {
    if (isEmpty(fullName)) {
        errorDetails.push('Vui lòng nhập Họ và tên.');
        return false;
    } else if (fullName.length < 2) {
        errorDetails.push('Họ và tên dài tối thiểu 02 ký tự.');
        return false;
    } else if (fullName.length > 50) {
        errorDetails.push('Họ và tên dài tối đa 50 ký tự.');
        return false;
    }

    return true;
}

function checkEmailAddress(emailAddress) {
    if (isEmpty(emailAddress)) {
        errorDetails.push('Vui lòng nhập Địa chỉ Email.');
        return false;
    } else if (isInvalidEmailAddress(emailAddress)) {
        errorDetails.push('Email không đúng định dạng.');
        return false;
    }

    return true;
}

function checkPhoneNumber(phoneNumber) {
    if (isEmpty(phoneNumber)) {
        errorDetails.push('Vui lòng nhập Số điện thoại.');
        return false;
    } else {
        numberCharacterCount = phoneNumber.replace(/[^0-9]/g, EMPTY_STRING).trim().length;

        if (numberCharacterCount < 10) {
            errorDetails.push('Điện thoại cần ít nhất 10 ký tự số.');
            return false;
        } else if (numberCharacterCount > 15) {
            errorDetails.push('Điện thoại dài tối đa 15 ký tự số.');
            return false;
        } else if (isInvalidPhoneNumber(phoneNumber)) {
            errorDetails.push('Điện thoại không đúng định dạng.');
            return false;
        }
    }

    return true;
}

function checkHomeTown(homeTown) {
    if (isEmpty(homeTown)) {
        errorDetails.push('Vui lòng nhập Quê quán.');
        return false;
    }

    return true;
}

function checkGender(gender) {
    if (isEmpty(gender)) {
        errorDetails.push('Vui lòng chọn Giới tính.');
        return false;
    }

    return true;
}

function isEmpty(inputData) {
    return ((inputData === EMPTY_STRING) || (inputData.length === 0));
}

function isInvalidEmailAddress(emailAddress) {
    let emailAddressRegExp = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

    return !(emailAddressRegExp.test(emailAddress));
}

function isInvalidPhoneNumber(phoneNumber) {
    let phoneNumberRegExp = /^(\+{0,1}( )*)([0-9](( )*\.{0,1}( )*))*[0-9]{1}$/;

    return !(phoneNumberRegExp.test(phoneNumber));
}

function displayErrorInfo(errorInfoDetails) {
    if (errorInfoDetails.length > 0) {
        let errorContent = '<ul>';

        for (let i = 0; i < errorInfoDetails.length; i++) {
            errorContent += `
                <li>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    ${errorInfoDetails[i]}
                </li>
            `;
        }

        errorContent += '</ul>';

        divErrorInfo.innerHTML = errorContent;
        divErrorInfo.style.display = 'inline-block';
    } else {
        divErrorInfo.innerHTML = EMPTY_STRING;
        divErrorInfo.style.display = 'none';
    }
}

function setEffectForTextInput(isValidValue, textInputId) {
    if (!isValidValue) {
        textInputId.style.boxShadow = '0 0 5px #ff0000';

        textInputId.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 5px #ff0000';
        });

        textInputId.addEventListener('blur', function() {
            this.style.boxShadow = '0 0 5px #ff0000';
        });
    } else {
        textInputId.style.boxShadow = 'none';

        textInputId.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 5px #aaaaaa';
        });

        textInputId.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    }
}

function setEffectForRadioButton(isValidValue, radioButtonId, isOutlineHidden = true) {
    if (!isValidValue && !isOutlineHidden) {
        radioButtonId.style.outline = '2px solid #ff0000';
    } else {
        radioButtonId.style.outline = 'none';
    }

    radioButtonId.addEventListener('focus', function() {
        this.style.outline = '1px dotted #000000';
    });

    radioButtonId.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
}
/* ------ End Functions Declaration ------*/