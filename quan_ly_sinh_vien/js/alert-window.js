
/* ------ Start Global Variables Declaration ------*/
var boxAlertContainer    = document.getElementById('boxAlertContainer');
var winAlertBeforeChange = document.getElementById('winAlertBeforeChange');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
function alertBeforeChange(title, content, buttonLabelText, focusedElementBeforeAlert, callbackAlert) {
    createContentOfAlertWindow(title, content, buttonLabelText);
    addFeaturesForAlertWindow(winAlertBeforeChange, focusedElementBeforeAlert, callbackAlert);
    showAlertWindow();

    let btnAlertOk      = document.getElementById('btnAlertOk');
    btnAlertOk.onclick  = function() { alertOk(focusedElementBeforeAlert, callbackAlert); }
    btnAlertOk.focus();
}

function createContentOfAlertWindow(title, content, buttonLabelText) {
    winAlertBeforeChange.innerHTML = `
        <div class="header-area">
            <div class="left-item">
                <img src="./images/suntech_logo.png">
                <label>${title}</label>
            </div>
            <div class="right-item" tabindex="0" title="Click để Đóng hộp thoại này">&times;</div>
        </div>

        <div class="main-area">
            <div class="content">
                ${content}
            </div>
            <div class="action">
                <button type="button" id="btnAlertOk" tabindex="0">${buttonLabelText}</button>
            </div>
        </div>
    `;
}

function addFeaturesForAlertWindow(divAlertWindow, focusedElementBeforeAlert, callbackAlert) {
    let divCloseAlertWindow = document.querySelector(`div#${divAlertWindow.id} div.header-area div.right-item`);
    divCloseAlertWindow.onclick = function() { alertCancel(focusedElementBeforeAlert, callbackAlert); }

    moveAlertWindow(divAlertWindow);
}

function moveAlertWindow(divAlertWindow) {
    var currentCoordinateX  = 0, 
        currentCoordinateY  = 0, 
        startCoordinateX    = 0, 
        startCoordinateY    = 0;

    let divAlertWindowHeader = document.querySelector(`div#${divAlertWindow.id} div.header-area`);

    if (divAlertWindowHeader) {
        divAlertWindowHeader.onmousedown = dragMouseDown;
    } else {
        divAlertWindow.onmousedown = dragMouseDown;
    }

    function dragMouseDown(event) {
        event = event || window.event;

        startCoordinateX        = event.clientX;
        startCoordinateY        = event.clientY;

        document.onmousemove    = moveAlertWindow;
        document.onmouseup      = stopMovingAlertWindow;
    }

    function moveAlertWindow(event) {
        event = event || window.event;

        currentCoordinateX      = startCoordinateX - event.clientX;
        currentCoordinateY      = startCoordinateY - event.clientY;

        startCoordinateX        = event.clientX;
        startCoordinateY        = event.clientY;

        divAlertWindow.style.left = (divAlertWindow.offsetLeft - currentCoordinateX) + "px";
        divAlertWindow.style.top  = (divAlertWindow.offsetTop - currentCoordinateY) + "px";
    }

    function stopMovingAlertWindow() {
        document.onmousemove    = null;
        document.onmouseup      = null;
    }
}

function showAlertWindow() {
    let scrollbarWidth = getVerticalScrollbarWidthOfPage();

    if (scrollbarWidth > 0) {
        document.body.setAttribute('style', `overflow: hidden; padding-right: ${scrollbarWidth}px;`);
        boxAlertContainer.setAttribute('style', `padding-right: ${scrollbarWidth}px;`);
    }

    boxAlertContainer.classList.remove('hidden-overlay');
    boxAlertContainer.classList.add('visible-overlay');

    winAlertBeforeChange.removeAttribute('style');
    winAlertBeforeChange.classList.remove('hidden-window');
    winAlertBeforeChange.classList.remove('hidden-window-2');
    winAlertBeforeChange.classList.add('visible-window');
}

function alertOk(focusedElementBeforeAlert, callbackAlert) {
    hideAlertWindow();
    focusedElementBeforeAlert.focus();
    callbackAlert(true);
}

function alertCancel(focusedElementBeforeAlert, callbackAlert) {
    hideAlertWindow();
    focusedElementBeforeAlert.focus();
    callbackAlert(false);
}

function hideAlertWindow() {
    document.body.removeAttribute('style');

    boxAlertContainer.removeAttribute('style');
    boxAlertContainer.classList.remove('visible-overlay');
    boxAlertContainer.classList.add('hidden-overlay');

    winAlertBeforeChange.classList.remove('visible-window');
    winAlertBeforeChange.classList.add('hidden-window');
    setTimeout(function() { winAlertBeforeChange.classList.add('hidden-window-2'); }, 250);
}
/* ------ End Functions Declaration ------*/