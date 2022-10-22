
/* ------ Start Global Variables Declaration ------*/
var divPageContainer                = document.querySelector('div.container');
var divHelpSettingIcon              = document.getElementById('divHelpSettingIcon');
var divOuterAngleUpArea             = document.querySelector('div.help-setting-box-container div.outer-angle-up-area');
var divInnerAngleUpArea             = document.querySelector('div.help-setting-box-container div.inner-angle-up-area');
var divHelpSettingBox               = document.querySelector('div.help-setting-box-container div.help-setting-box');

var litResetFilterSearchForm        = document.getElementById('litResetFilterSearchForm');
var litResetWindowPosition          = document.getElementById('litResetWindowPosition');
var litHelpFilterSearch             = document.getElementById('litHelpFilterSearch');
var litListShortcutKeys             = document.getElementById('litListShortcutKeys');
var litIntroduceProduct             = document.getElementById('litIntroduceProduct');

var divOverlayFullScreen            = document.getElementById('divOverlayFullScreen');
var winHelpFilterSearch             = document.getElementById('winHelpFilterSearch');
var winListShortcutKeys             = document.getElementById('winListShortcutKeys');
var winIntroduceProduct             = document.getElementById('winIntroduceProduct');
var divClosePopupWindow             = null;

var isWindowHelpFilterSearchCreated = false;
var isWindowListShortcutKeysCreated = false;
var isWindowIntroduceProductCreated = false;
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
window.onkeydown                    = function() { processOnKeyDownPage(event); }

divHelpSettingIcon.onclick          = function() { processHelpSettingBox(); }
litResetFilterSearchForm.onclick    = function() { refreshFilterSearchForm(); }
litResetWindowPosition.onclick      = function() { resetDefaultPositionOfWindow(); }
litHelpFilterSearch.onclick         = function() { processWindowHelpFilterSearch(); }
litListShortcutKeys.onclick         = function() { processWindowListShortcutKeys(); }
litIntroduceProduct.onclick         = function() { processWindowIntroduceProduct(); }

function processOnKeyDownPage(event) {
    // Handle when end-user press Escape key on the keyboard.
    if (event.keyCode === 27) {
        if (boxAlertContainer.className.toLowerCase().indexOf('hidden-overlay') === -1) {
            alertCancel(currentActiveElement, function() {});
            return;
        }

        if (boxConfirmContainer.className.toLowerCase().indexOf('hidden-overlay') === -1) {
            confirmCancel(currentActiveElement, function() {});
            return;
        }

        if (divOverlayFullScreen.className.toLowerCase().indexOf('hidden-overlay') === -1) {
            hideOverlayFullScreen();
            return;
        }

        if (divHelpSettingIcon.className.toLowerCase() === 'focused-menu') {
            hideHelpSettingBox();
            return;
        }

        if (divImportSettingBox.className.toLowerCase().indexOf('hidden') === -1) {
            hideImportSettingBox();
            return;
        }

        if (divAdvanceSettingIcon.className.toLowerCase() === 'transformed-menu') {
            hideAdvanceSettingBox();
            return;
        }
    }

    // Handle when end-user press Ctrl+Window (both Left and Right Window key) on the keyboard.
    if (event.ctrlKey && (event.keyCode === 91 || event.keyCode === 92)) {
        if (divAdvanceSettingIcon.className.toLowerCase() !== 'transformed-menu') {
            showAdvanceSettingBox();
            return;
        }

        if (divHelpSettingIcon.className.toLowerCase() !== 'focused-menu') {
            showHelpSettingBox();

            if (divImportSettingBox.className.toLowerCase().indexOf('hidden') === -1) {
                hideImportSettingBox();
            }
            return;
        }
    }
}

function processHelpSettingBox() {
    if (divHelpSettingIcon.className.toLowerCase() !== 'focused-menu') {
        showHelpSettingBox();

        if (divImportSettingBox.className.toLowerCase().indexOf('hidden') === -1) {
            hideImportSettingBox();
        }
    } else {
        hideHelpSettingBox();
    }
}

function showHelpSettingBox() {
    divHelpSettingIcon.classList.toggle('focused-menu');
    divOuterAngleUpArea.classList.remove('hidden-angle-up-area');
    divInnerAngleUpArea.classList.remove('hidden-angle-up-area');

    setDisplayOfListItemsForResponsive();

    divHelpSettingBox.classList.remove('hidden-help-setting-box-1');
    divHelpSettingBox.classList.remove('hidden-help-setting-box-2');
    divHelpSettingBox.classList.toggle('visible-help-setting-box');
}

function setDisplayOfListItemsForResponsive() {
    if (window.getComputedStyle(divSettingBoxHeader).width === '0px' || 
        window.getComputedStyle(divSettingBoxHeader).height === '0px' || 
        window.getComputedStyle(divSettingBoxHeader).cursor === 'default') {
        litResetWindowPosition.style.display = 'none';
    } else {
        litResetWindowPosition.style.display = 'block';
    }
}

function hideHelpSettingBox() {
    if (divOuterAngleUpArea.className.toLowerCase().indexOf('hidden-angle-up-area') === -1) {
        divHelpSettingBox.classList.remove('visible-help-setting-box');
        divHelpSettingBox.classList.toggle('hidden-help-setting-box-1');

        divOuterAngleUpArea.classList.add('hidden-angle-up-area');
        divInnerAngleUpArea.classList.add('hidden-angle-up-area');

        setTimeout(function() {
            divHelpSettingBox.classList.toggle('hidden-help-setting-box-2');
            divHelpSettingIcon.classList.remove('focused-menu');
        }, 500);
    }
}

function refreshFilterSearchForm() {
    hideHelpSettingBox();
    setTimeout(function() { resetFilterSearchForm(); }, 450);
}

function resetFilterSearchForm() {
    clearTextOfKeywordSearch();
    selGender.selectedIndex = 0;
}

function resetDefaultPositionOfWindow() {
    divSettingBoxContainer.removeAttribute('style');
    divSettingBoxContainer.classList.toggle('default-window-position');

    setTimeout(function() {
        hideHelpSettingBox();
        divSettingBoxContainer.classList.remove('default-window-position');
    }, 400);
}

function processWindowHelpFilterSearch() {
    if (divOverlayFullScreen.className.toLowerCase().indexOf('hidden-overlay') !== -1) {
        showOverlayFullScreen();
        hideWindowListShortcutKeys();
        hideWindowIntroduceProduct();

        if (!isWindowHelpFilterSearchCreated) {
            createWindowHelpFilterSearch();
            isWindowHelpFilterSearchCreated = true;
        }

        setTimeout(function() { showWindowHelpFilterSearch(); }, 500);
    } else {
        hideOverlayFullScreen();
    }
}

function processWindowListShortcutKeys() {
    if (divOverlayFullScreen.className.toLowerCase().indexOf('hidden-overlay') !== -1) {
        showOverlayFullScreen();
        hideWindowHelpFilterSearch();
        hideWindowIntroduceProduct();

        if (!isWindowListShortcutKeysCreated) {
            createWindowListShortcutKeys();
            isWindowListShortcutKeysCreated = true;
        }

        setTimeout(function() { showWindowListShortcutKeys(); }, 500);
    } else {
        hideOverlayFullScreen();
    }
}

function processWindowIntroduceProduct() {
    if (divOverlayFullScreen.className.toLowerCase().indexOf('hidden-overlay') !== -1) {
        showOverlayFullScreen();
        hideWindowHelpFilterSearch();
        hideWindowListShortcutKeys();

        if (!isWindowIntroduceProductCreated) {
            createWindowIntroduceProduct();
            isWindowIntroduceProductCreated = true;
        }

        setTimeout(function() { showWindowIntroduceProduct(); }, 500);
    } else {
        hideOverlayFullScreen();
    }
}

function showOverlayFullScreen() {
    setTimeout(function() { divPageContainer.classList.add('hidden-container'); }, 650);

    divOverlayFullScreen.classList.remove('hidden-overlay');
    divOverlayFullScreen.classList.add('visible-overlay');
}

function hideOverlayFullScreen() {
    if (winHelpFilterSearch.className.toLowerCase().indexOf('visible-popup-window') !== -1) {
        hideWindowHelpFilterSearch();
    }

    if (winListShortcutKeys.className.toLowerCase().indexOf('visible-popup-window') !== -1) {
        hideWindowListShortcutKeys();
    }

    if (winIntroduceProduct.className.toLowerCase().indexOf('visible-popup-window') !== -1) {
        hideWindowIntroduceProduct();
    }

    setTimeout(function() {
        divPageContainer.classList.remove('hidden-container');

        divOverlayFullScreen.classList.remove('visible-overlay');
        divOverlayFullScreen.classList.add('hidden-overlay');
    }, 550);
}

function showWindowHelpFilterSearch() {
    winHelpFilterSearch.classList.remove('hidden-popup-window');
    winHelpFilterSearch.classList.add('visible-popup-window');

    setDivClosePopupWindow();    
}

function hideWindowHelpFilterSearch() {
    winHelpFilterSearch.classList.remove('visible-popup-window');
    winHelpFilterSearch.classList.add('hidden-popup-window');
}

function showWindowListShortcutKeys() {
    winListShortcutKeys.classList.remove('hidden-popup-window');
    winListShortcutKeys.classList.add('visible-popup-window');

    setDivClosePopupWindow();    
}

function hideWindowListShortcutKeys() {
    winListShortcutKeys.classList.remove('visible-popup-window');
    winListShortcutKeys.classList.add('hidden-popup-window');
}

function showWindowIntroduceProduct() {
    winIntroduceProduct.classList.remove('hidden-popup-window');
    winIntroduceProduct.classList.add('visible-popup-window');

    setDivClosePopupWindow();
}

function hideWindowIntroduceProduct() {
    winIntroduceProduct.classList.remove('visible-popup-window');
    winIntroduceProduct.classList.add('hidden-popup-window');
}

function setDivClosePopupWindow() {
    divClosePopupWindow = getDivClosePopupWindow();
    divClosePopupWindow.onclick = function() { closePopupWindow(); }
}

function getDivClosePopupWindow() {
    return document.querySelector('*.visible-popup-window div.header-area div.right-item');
}

function closePopupWindow() {
    hideOverlayFullScreen();
}
/* ------ End Functions Declaration ------*/