
/* ------ Start Global Variables Declaration ------*/
var btnMinimizeForm = document.getElementById('btnMinimizeForm');
var btnMaximizeForm = document.getElementById('btnMaximizeForm');
var divStudentForm  = document.querySelector('div.form-student');
var headingLine     = document.querySelector('div.form-student h3');
/* ------ End Global Variables Declaration ------*/

/* ------ Start Functions Declaration ------*/
// When the end-user clicks the 'Minimize Form' Button, the Browser will hide the whole Student Form.
btnMinimizeForm.onclick = function() { minimizeStudentForm(); }

function minimizeStudentForm() {
    divStudentForm.classList.remove('visible-form-student');
    divStudentForm.classList.toggle('hidden-form-student-1');

    setTimeout(function() {
        headingLine.style.opacity = '0';
    }, 530);

    setTimeout(function() {
        divStudentForm.classList.toggle('hidden-form-student-2');
    }, 550);

    setTimeout(function() {
        btnMaximizeForm.style.opacity = '1';
        btnMaximizeForm.style.display = 'inline-block';
    }, 880);
}

// When the end-user clicks the 'Maximize Form' Button, the Browser will display the whole Student Form.
btnMaximizeForm.onclick = function() { maximizeStudentForm(); }

function maximizeStudentForm() {
    divStudentForm.classList.remove('hidden-form-student-1');
    divStudentForm.classList.remove('hidden-form-student-2');
    divStudentForm.classList.toggle('visible-form-student');

    headingLine.style.opacity = '1';
    btnMaximizeForm.style.opacity = '0';
    btnMaximizeForm.style.display = 'none';
}
/* ------ End Functions Declaration ------*/