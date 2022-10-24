function signUp() {

    var userName = document.getElementById('sign-up__username').value;
    var passWord = document.getElementById('sign-up__password').value;
    var confirmPassWord = document.getElementById('sign-up__confirm-password').value;
    
    var ck1 = 0, ck2 = 0, ck3 = 0, ck4 = 0;
    if (userName == "") {
        document.getElementById("sign-up__username-null").style.display = 'block';
        ck1 = 1;
    } else {
        ck1 = 0;
        document.getElementById("sign-up__username-null").style.display = 'none';      
    }
    if (passWord == "") {
        ck2 = 1;
        document.getElementById("sign-up__password-null").style.display = "block";
    } else {
        ck2 = 0;
        document.getElementById("sign-up__password-null").style.display = "none";
    }
    if (confirmPassWord == "") {
        ck3 = 1;
        document.getElementById("sign-up__confirm-password-null").style.display = "block";
    } else {
        ck3 = 0;
        document.getElementById("sign-up__confirm-password-null").style.display = "none";
        if (confirmPassWord != passWord && passWord != '') {
            ck4 = 1;
            document.getElementById("sign-up__confirm-password-false").style.display = "block";
        } else {
            ck4 = 0;
            document.getElementById("sign-up__confirm-password-false").style.display = "none";
        }
    }

    if (ck1 == 0 && ck2 == 0 && ck3 == 0 && ck4 == 0) {
        var students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem('students')) : [];
        var ck = 0;
        for (var i = 0; i < students.length; i++){
            if (userName == students[i].userName) {
                alert("Tên đăng nhập đã được sử dụng. Vui lòng dùng tên khác!");
                ck = 1;
            }  
        };
        if (ck == 0) {
            students.push({
                userName: `${userName}`,
                passWord: `${passWord}`,
            })
            localStorage.setItem('students', JSON.stringify(students));
            console.log(students);
            location.href = './transcript.html';
            
        }
        document.getElementById('sign-up__username').value = "";
        document.getElementById('sign-up__password').value = "";
        document.getElementById('sign-up__confirm-password').value="";
    }
    
    
}
function test() {
    console.log('áodfjljasdf');
    // var temp = [{
    //     userName: 'le',
    //     passWord: '211202032',
    //     scores: {
    //         giaoDucTheChatF2DQT: 9.0,
    //         giaoDucTheChatF2THI: 7.0,
    //     }
        
    // }]
    // localStorage.setItem("students", JSON.stringify(temp));
    // var students = localStorage.getItem("students") ? JSON.parse(localStorage.getItem('students')) : [];
    // console.log(students.length);
}