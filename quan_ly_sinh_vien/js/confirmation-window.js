
/* ------ Start Global Variables Declaration ------*/
var boxConfirmContainer     = document.getElementById('boxConfirmContainer');
var winConfirmBeforeChange  = document.getElementById('winConfirmBeforeChange');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
function confirmBeforeChange(title, content, focusedElementBeforeConfirm, callbackConfirmation, referenceFileName = EMPTY_STRING) {
    createContentOfConfirmationWindow(title, content);
    addFeaturesForConfirmationWindow(winConfirmBeforeChange, focusedElementBeforeConfirm, callbackConfirmation);
    showConfirmationWindow(referenceFileName);

    let btnConfirmOk            = document.getElementById('btnConfirmOk');
    btnConfirmOk.onclick        = function() { confirmOk(focusedElementBeforeConfirm, callbackConfirmation); }

    let btnConfirmCancel        = document.getElementById('btnConfirmCancel');
    btnConfirmCancel.onclick    = function() { confirmCancel(focusedElementBeforeConfirm, callbackConfirmation); }

    btnConfirmOk.focus();
}

function createContentOfConfirmationWindow(title, content) {
    winConfirmBeforeChange.innerHTML = `
        <div class="header-area">
            <div class="left-item">
                <img src="./images/suntech_logo.png">
                <label>${title}</label>
            </div>
            <div class="right-item" tabindex="0" title="Click để Hủy bỏ xác nhận & Đóng hộp thoại này">&times;</div>
        </div>

        <div class="main-area">
            <div class="content">
                ${content}
            </div>
            <div class="action">
                <button type="button" id="btnConfirmOk" tabindex="0">Đồng ý</button>
                <button type="button" id="btnConfirmCancel" tabindex="0">Hủy bỏ</button>
            </div>
        </div>
    `;
}

function addFeaturesForConfirmationWindow(divConfirmationWindow, focusedElementBeforeConfirm, callbackConfirmation) {
    let divCloseConfirmationWindow = document.querySelector(`div#${divConfirmationWindow.id} div.header-area div.right-item`);
    divCloseConfirmationWindow.onclick = function() { confirmCancel(focusedElementBeforeConfirm, callbackConfirmation); }

    moveConfirmationWindow(divConfirmationWindow);
}

function moveConfirmationWindow(divConfirmationWindow) {
    var currentCoordinateX  = 0, 
        currentCoordinateY  = 0, 
        startCoordinateX    = 0, 
        startCoordinateY    = 0;

    let divConfirmationWindowHeader = document.querySelector(`div#${divConfirmationWindow.id} div.header-area`);

    if (divConfirmationWindowHeader) {
        divConfirmationWindowHeader.onmousedown = dragMouseDown;
    } else {
        divConfirmationWindow.onmousedown = dragMouseDown;
    }

    function dragMouseDown(event) {
        event = event || window.event;

        startCoordinateX        = event.clientX;
        startCoordinateY        = event.clientY;

        document.onmousemove    = moveDivConfirmationWindow;
        document.onmouseup      = stopMovingConfirmationWindow;
    }

    function moveDivConfirmationWindow(event) {
        event = event || window.event;

        currentCoordinateX      = startCoordinateX - event.clientX;
        currentCoordinateY      = startCoordinateY - event.clientY;

        startCoordinateX        = event.clientX;
        startCoordinateY        = event.clientY;

        divConfirmationWindow.style.left = (divConfirmationWindow.offsetLeft - currentCoordinateX) + "px";
        divConfirmationWindow.style.top  = (divConfirmationWindow.offsetTop - currentCoordinateY) + "px";
    }

    function stopMovingConfirmationWindow() {
        document.onmousemove    = null;
        document.onmouseup      = null;
    }
}

function showConfirmationWindow(referenceFileName) {
    let scrollbarWidth = getVerticalScrollbarWidthOfPage();

    if (scrollbarWidth > 0) {
        document.body.setAttribute('style', `overflow: hidden; padding-right: ${scrollbarWidth}px;`);
        boxConfirmContainer.setAttribute('style', `padding-right: ${scrollbarWidth}px;`);
    }

    boxConfirmContainer.classList.remove('hidden-overlay');
    boxConfirmContainer.classList.add('visible-overlay');

    winConfirmBeforeChange.removeAttribute('style');
    winConfirmBeforeChange.classList.remove('hidden-window');
    winConfirmBeforeChange.classList.remove('hidden-window-2');
    winConfirmBeforeChange.classList.add('visible-window');

    if (referenceFileName && referenceFileName.trim() !== EMPTY_STRING) {
        winConfirmBeforeChange.classList.add(`${referenceFileName}`);
    }
}

function confirmOk(focusedElementBeforeConfirm, callbackConfirmation) {
    hideConfirmationWindow();
    focusedElementBeforeConfirm.focus();
    callbackConfirmation(true);
}

function confirmCancel(focusedElementBeforeConfirm, callbackConfirmation) {
    hideConfirmationWindow();
    focusedElementBeforeConfirm.focus();
    callbackConfirmation(false);
}

function hideConfirmationWindow() {
    document.body.removeAttribute('style');

    boxConfirmContainer.removeAttribute('style');
    boxConfirmContainer.classList.remove('visible-overlay');
    boxConfirmContainer.classList.add('hidden-overlay');

    winConfirmBeforeChange.classList.remove('visible-window');
    winConfirmBeforeChange.classList.add('hidden-window');
    setTimeout(function() { winConfirmBeforeChange.classList.add('hidden-window-2'); }, 600);
}
/* ------ End Functions Declaration ------*/