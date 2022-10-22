
/* ------ Start Global Variables Declaration ------*/
var divOpeningIntro         = document.getElementById('divOpeningIntro');
var divOpeningIntroContent  = document.querySelector('div#divOpeningIntro div.main-area');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
function showOpeningIntro() {
    divPageContainer.classList.add('hidden-container');

    divOpeningIntro.classList.remove('hidden-overlay');
    divOpeningIntro.classList.add('visible-overlay');

    divOpeningIntroContent.classList.remove('hidden-main-area');
    divOpeningIntroContent.classList.add('visible-main-area');
}

function hideOpeningIntro() {
    divPageContainer.classList.remove('hidden-container');

    divOpeningIntro.classList.remove('visible-overlay');
    divOpeningIntro.classList.add('hidden-overlay');
}
/* ------ End Functions Declaration ------*/