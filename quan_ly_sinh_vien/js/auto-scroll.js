
/* ------ Start Global Variables Declaration ------*/
var btnScrollTop              = document.getElementById('btnScrollTop');
var currentClassNameOfCss     = EMPTY_STRING;
var currentLocationFromTop    = 0;
var currentHeightOfSettingBox = 0;
var tableRowIndexBeforeUpdate = 0;
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
// When the end-user scrolls down 340px from the top of the page, show the 'Scroll Top' Button (btnScrollTop).
// document.documentElement.scrollTop => using for Chrome, Firefox, Microsoft Edge/IE and Opera.
// document.body.scrollTop => using for Safari.
window.onscroll = function() { processOnScroll(); }

function processOnScroll() {
    if (document.documentElement.scrollTop > 340 || document.body.scrollTop > 340) {
        btnScrollTop.style.opacity = '1';
        btnScrollTop.style.visibility = 'visible';

        btnScrollTop.style.backgroundColor = '#eeeeee';
        btnScrollTop.style.color = '#909090';
        btnScrollTop.style.borderColor = '#cccccc';

        btnScrollTop.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#dddddd';
            this.style.color = '#666666';
            this.style.borderColor = '#aaaaaa';
        });

        btnScrollTop.addEventListener("mouseout", function() {
            this.style.backgroundColor = '#eeeeee';
            this.style.color = '#909090';
            this.style.borderColor = '#cccccc';
        });
    } else {
        btnScrollTop.style.opacity = '0';
        btnScrollTop.style.visibility = 'hidden';
    }
}

// When the end-user clicks the 'Scroll Top' Button, the Browser will scroll to the top of the page smoothly.
btnScrollTop.onclick = function() { scrollTopOfPage(); }

function scrollTopOfPage() {
    let locationFromTop     = (document.documentElement.scrollTop || document.body.scrollTop);
    currentClassNameOfCss   = divAdvanceSettingIcon.className.toLowerCase();

    if (currentClassNameOfCss === 'transformed-menu') {
        currentHeightOfSettingBox = divSettingBoxContainer.offsetHeight;
    }

    let interval = setInterval(function() {
        window.scrollTo(0, locationFromTop);
        locationFromTop -= 100;

        if (locationFromTop <= -100) {
            clearInterval(interval);
        }
    }, 20);
}

function scrollTopToFocusForm(tableRowIndex) {
    let locationFromTop         = (document.documentElement.scrollTop || document.body.scrollTop);
    currentLocationFromTop      = locationFromTop;
    currentClassNameOfCss       = divAdvanceSettingIcon.className.toLowerCase();
    tableRowIndexBeforeUpdate   = tableRowIndex;

    if (currentClassNameOfCss === 'transformed-menu') {
        currentHeightOfSettingBox = divSettingBoxContainer.offsetHeight;
    }

    let interval = setInterval(function() {
        window.scrollTo(0, locationFromTop);
        locationFromTop -= 80;

        if (locationFromTop <= -80) {
            clearInterval(interval);
        }
    }, 40);
}

function scrollBackToFocusedTableRow() {
    let startLocation = 0;

    let interval = setInterval(function() {
        window.scrollTo(currentLocationFromTop, startLocation);
        startLocation += 100;

        if (startLocation > currentLocationFromTop) {
            startLocation -= 100;
            startLocation += (currentLocationFromTop % 100);
            window.scrollTo(currentLocationFromTop, startLocation);
            clearInterval(interval);
        }
    }, 20);
}

function getLocationFromTopOfTableRow(tableRowIndex) {
    let tableRowList        = document.querySelectorAll('div.list-student table tr:not(#first-row)');
    let tableRowObject      = tableRowList[tableRowIndex];
    let heightOfTableRow    = parseInt(window.getComputedStyle(tableRowObject).height); //tableRowObject.offsetHeight
    let distanceBetweenRows = parseInt(window.getComputedStyle(tableRowObject).marginBottom);

    let classNameOfCss      = divAdvanceSettingIcon.className.toLowerCase();
    let locationFromTop     = currentLocationFromTop;
    locationFromTop         += (tableRowIndex - tableRowIndexBeforeUpdate) * (heightOfTableRow + distanceBetweenRows);

    if (classNameOfCss !== currentClassNameOfCss) {
        if (classNameOfCss === 'transformed-menu') {
            currentHeightOfSettingBox = divSettingBoxContainer.offsetHeight;
            locationFromTop += currentHeightOfSettingBox;
        } else {
            locationFromTop -= currentHeightOfSettingBox;
        }
    }

    return locationFromTop;
}
/* ------ End Functions Declaration ------*/