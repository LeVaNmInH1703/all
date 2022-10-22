
/* ------ Start Global Variables Declaration ------*/
var divAddNotificationList      = document.getElementById("divAddNotificationList");
var divUpdateNotificationList   = document.getElementById("divUpdateNotificationList");
var divDeleteNotificationList   = document.getElementById("divDeleteNotificationList");
var divAlertNotificationList    = document.getElementById("divAlertNotificationList");

var timeoutAddNotification;
var timeoutRemoveAddNotifications;
var timeoutCollapseAddNotification;
var timeoutRemoveLastAddNotification;
var divAddNotification;

var timeoutUpdateNotification;
var timeoutRemoveUpdateNotifications;
var timeoutCollapseUpdateNotification;
var timeoutRemoveLastUpdateNotification;
var divUpdateNotification;

var timeoutDeleteNotification;
var timeoutRemoveDeleteNotifications;
var timeoutCollapseDeleteNotification;
var timeoutRemoveLastDeleteNotification;
var divDeleteNotification;

var timeoutAlertNotification;
var timeoutRemoveAlertNotifications;
var timeoutCollapseAlertNotification;
var timeoutRemoveLastAlertNotification;
var divAlertNotification;
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
function sendNotification(actionType, studentFullName) {
    actionType = actionType.toLowerCase().trim();

    if (actionType === ACTION_ADD_STUDENT) //'add'
        sendAddNotification(studentFullName);
    else if (actionType === ACTION_UPDATE_STUDENT) //'update'
        sendUpdateNotification(studentFullName);
    else if (actionType === ACTION_DELETE_STUDENT) //'delete'
        sendDeleteNotification(studentFullName);
}

function sendAddNotification(studentFullName) {
    clearTimeout(timeoutAddNotification);
    clearTimeout(timeoutRemoveAddNotifications);
    clearTimeout(timeoutCollapseAddNotification);
    clearTimeout(timeoutRemoveLastAddNotification);

    divAddNotificationList.innerHTML += `
        <div class="notification">
            <font color='#ffff00'>Thêm mới thành công</font> sinh viên <font color='#ffff00'>${studentFullName}</font> !
        </div>
    `;

    let divNotifications = document.querySelectorAll('div#divAddNotificationList div.notification');
    divAddNotification = divNotifications[divNotifications.length - 1];

    timeoutAddNotification = setTimeout(function() {
        divAddNotification.classList.toggle('add-notification');
    }, 100);

    timeoutRemoveAddNotifications = setTimeout(function() {
        while (divAddNotificationList.childElementCount > 1) {
            divAddNotificationList.removeChild(divAddNotificationList.firstChild);
        }
    }, 1500);

    timeoutCollapseAddNotification = setTimeout(function() {
        divAddNotification.classList.toggle('collapse-notification');
    }, 2500);

    timeoutRemoveLastAddNotification = setTimeout(function() {
        while (divAddNotificationList.hasChildNodes()) {
            divAddNotificationList.removeChild(divAddNotificationList.firstChild);
        }
    }, 3500);
}

function sendUpdateNotification(studentFullName) {
    clearTimeout(timeoutUpdateNotification);
    clearTimeout(timeoutRemoveUpdateNotifications);
    clearTimeout(timeoutCollapseUpdateNotification);
    clearTimeout(timeoutRemoveLastUpdateNotification);

    divUpdateNotificationList.innerHTML += `
        <div class="notification">
            <font color='#ffff00'>Cập nhật thành công</font> dữ liệu về sinh viên <font color='#ffff00'>${studentFullName}</font> !
        </div>
    `;

    let divNotifications = document.querySelectorAll('div#divUpdateNotificationList div.notification');
    divUpdateNotification = divNotifications[divNotifications.length - 1];

    timeoutUpdateNotification = setTimeout(function() {
        divUpdateNotification.classList.toggle('update-notification');
    }, 100);

    timeoutRemoveUpdateNotifications = setTimeout(function() {
        while (divUpdateNotificationList.childElementCount > 1) {
            divUpdateNotificationList.removeChild(divUpdateNotificationList.firstChild);
        }
    }, 1500);

    timeoutCollapseUpdateNotification = setTimeout(function() {
        divUpdateNotification.classList.toggle('collapse-notification');
    }, 2500);

    timeoutRemoveLastUpdateNotification = setTimeout(function() {
        while (divUpdateNotificationList.hasChildNodes()) {
            divUpdateNotificationList.removeChild(divUpdateNotificationList.firstChild);
        }
    }, 3500);
}

function sendDeleteNotification(studentFullName) {
    clearTimeout(timeoutDeleteNotification);
    clearTimeout(timeoutRemoveDeleteNotifications);
    clearTimeout(timeoutCollapseDeleteNotification);
    clearTimeout(timeoutRemoveLastDeleteNotification);

    divDeleteNotificationList.innerHTML += `
        <div class="notification">
            <font color='#ffff00'>Xóa thành công</font> dữ liệu của sinh viên <font color='#ffff00'>${studentFullName}</font> !
        </div>
    `;

    let divNotifications = document.querySelectorAll('div#divDeleteNotificationList div.notification');
    divDeleteNotification = divNotifications[divNotifications.length - 1];

    timeoutDeleteNotification = setTimeout(function() {
        divDeleteNotification.classList.toggle('delete-notification');
    }, 100);

    timeoutRemoveDeleteNotifications = setTimeout(function() {
        while (divDeleteNotificationList.childElementCount > 1) {
            divDeleteNotificationList.removeChild(divDeleteNotificationList.firstChild);
        }
    }, 1500);

    timeoutCollapseDeleteNotification = setTimeout(function() {
        divDeleteNotification.classList.toggle('collapse-notification');
    }, 2500);

    timeoutRemoveLastDeleteNotification = setTimeout(function() {
        while (divDeleteNotificationList.hasChildNodes()) {
            divDeleteNotificationList.removeChild(divDeleteNotificationList.firstChild);
        }
    }, 3500);
}

function sendAlertNotification(alertMessage, displayTime = 3500, backgroundColor = '#e08119') {
    clearTimeout(timeoutAlertNotification);
    clearTimeout(timeoutRemoveAlertNotifications);
    clearTimeout(timeoutCollapseAlertNotification);
    clearTimeout(timeoutRemoveLastAlertNotification);

    divAlertNotificationList.innerHTML += `<div style="background-color: ${backgroundColor};" class="notification">${alertMessage}</div>`;

    let divNotifications = document.querySelectorAll('div#divAlertNotificationList div.notification');
    divAlertNotification = divNotifications[divNotifications.length - 1];

    timeoutAlertNotification = setTimeout(function() {
        divAlertNotification.classList.toggle('alert-notification');
    }, 100);

    timeoutRemoveAlertNotifications = setTimeout(function() {
        while (divAlertNotificationList.childElementCount > 1) {
            divAlertNotificationList.removeChild(divAlertNotificationList.firstChild);
        }
    }, 1500);

    timeoutCollapseAlertNotification = setTimeout(function() {
        divAlertNotification.classList.toggle('collapse-notification');
    }, displayTime);

    timeoutRemoveLastAlertNotification = setTimeout(function() {
        while (divAlertNotificationList.hasChildNodes()) {
            divAlertNotificationList.removeChild(divAlertNotificationList.firstChild);
        }
    }, (displayTime + 1000));
}
/* ------ End Functions Declaration ------*/