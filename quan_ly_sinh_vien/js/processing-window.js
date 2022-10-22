
/* ------ Start Global Variables Declaration ------*/
var boxProcessContainer    = document.getElementById('boxProcessContainer');
var winProcessBeforeChange = document.getElementById('winProcessBeforeChange');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
function showProcessWindow(content) {
    createContentOfProcessWindow(content);
    setStyleOfProcessWindow();
}

function createContentOfProcessWindow(content) {
    winProcessBeforeChange.innerHTML = `
        <div class="main-area">
            <div class="content">
                ${content}
            </div>
            <div class="spinner"></div>
        </div>
    `;
}

function setStyleOfProcessWindow() {
    let scrollbarWidth = getVerticalScrollbarWidthOfPage();

    if (scrollbarWidth > 0) {
        document.body.setAttribute('style', `overflow: hidden; padding-right: ${scrollbarWidth}px;`);
        boxProcessContainer.setAttribute('style', `padding-right: ${scrollbarWidth}px;`);
    }

    boxProcessContainer.classList.remove('hidden-overlay');
    boxProcessContainer.classList.add('visible-overlay');

    winProcessBeforeChange.removeAttribute('style');
    winProcessBeforeChange.classList.remove('hidden-window');
    winProcessBeforeChange.classList.remove('hidden-window-2');

    winProcessBeforeChange.classList.add('visible-window');
    setTimeout(function() { winProcessBeforeChange.classList.add('visible-window-2'); }, 100);
}

function hideProcessWindow() {
    document.body.removeAttribute('style');

    boxProcessContainer.removeAttribute('style');
    boxProcessContainer.classList.remove('visible-overlay');
    boxProcessContainer.classList.add('hidden-overlay');

    winProcessBeforeChange.classList.remove('visible-window');
    winProcessBeforeChange.classList.remove('visible-window-2');

    winProcessBeforeChange.classList.add('hidden-window');
    setTimeout(function() { winProcessBeforeChange.classList.add('hidden-window-2'); }, 800);
}
/* ------ End Functions Declaration ------*/