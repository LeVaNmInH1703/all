function signUp() {
    var students = [];
    var userName = document.getElementById('sign-up__username').value;
    var passWord = document.getElementById('sign-up__password').value;
    var confirmPassWord = document.getElementById('sign-up__confirm-password').value;
    if (userName == "") {
        document.getElementById("sign-up__username-null").style.display = 'block';
    } else {
        document.getElementById("sign-up__username-null").style.display = 'none';      
    }
    if (passWord == "") {
        document.getElementById("sign-up__password-null").style.display = "block";
    } else {
        document.getElementById("sign-up__password-null").style.display = "none";
    }
    if (confirmPassWord == "") {
        document.getElementById("sign-up__confirm-password-null").style.display = "block";
    } else {
        document.getElementById("sign-up__confirm-password-null").style.display = "none";
        if (confirmPassWord != passWord && passWord != '') {
            document.getElementById("sign-up__confirm-password-false").style.display = "block";
        } else {
            document.getElementById("sign-up__confirm-password-false").style.display = "none";
        }
    }
    // console.log(confirmPassWord,passWord);
    if()
    location.href = './transcript.html';

}