
/* ------ Start Global Variables Declaration ------*/
var divSettingBoxHeader = document.querySelector('div.setting-box-container div.setting-box-header');
var divSettingBoxFooter = document.querySelector('div.setting-box-container div.setting-box-footer');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
moveAdvanceSettingWindow(divSettingBoxContainer);

function moveAdvanceSettingWindow(divContainer) {
    var currentCoordinateX  = 0, 
        currentCoordinateY  = 0, 
        startCoordinateX    = 0, 
        startCoordinateY    = 0;

    if (divSettingBoxHeader || divSettingBoxFooter) {
        if (divSettingBoxHeader) {
            divSettingBoxHeader.onmousedown = dragMouseDown;
        }

        if (divSettingBoxFooter) {
            divSettingBoxFooter.onmousedown = dragMouseDown;
        }
    } else {
        divContainer.onmousedown = dragMouseDown;
    }

    function dragMouseDown(event) {
        event = event || window.event;

        startCoordinateX        = event.clientX;
        startCoordinateY        = event.clientY;

        document.onmousemove    = moveDivContainer;
        document.onmouseup      = stopMovingAdvanceSettingWindow;
    }

    function moveDivContainer(event) {
        divContainer.classList.remove('default-window-position');
        event = event || window.event;

        currentCoordinateX      = startCoordinateX - event.clientX;
        currentCoordinateY      = startCoordinateY - event.clientY;

        startCoordinateX        = event.clientX;
        startCoordinateY        = event.clientY;

        divContainer.style.left = (divContainer.offsetLeft - currentCoordinateX) + "px";
        divContainer.style.top  = (divContainer.offsetTop - currentCoordinateY) + "px";
    }

    function stopMovingAdvanceSettingWindow() {
        document.onmousemove    = null;
        document.onmouseup      = null;
    }
}
/* ------ End Functions Declaration ------*/