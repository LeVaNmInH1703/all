function login() {
    var userName = document.getElementById("login__username").value;
    console.log(userName);
    var passWord = document.getElementById("login__password").value;
    console.log(passWord);

    if (userName == "") {
        document.getElementById('login__username-null').style.display = 'block';
    } else {
        document.getElementById('login__username-null').style.display = 'none';
    }
    if (passWord == "") {
        document.getElementById('login__password-null').style.display = 'block';
    } else {
        document.getElementById('login__password-null').style.display = 'none';      
    }
    if (userName != '' && passWord != ''){
        document.getElementById("login__username").value = "";
        document.getElementById("login__password").value = "";
        location.href = './transcript.html';
    }
    
}