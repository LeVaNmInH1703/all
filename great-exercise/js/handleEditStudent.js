
function createStudent() {
    var soTinChi = JSON.parse(localStorage.getItem('soTinChi'));
    var now = JSON.parse(localStorage.getItem('now'));
    var teachers = JSON.parse(localStorage.getItem('teachers'));
    var name = document.querySelector('#full-name');
    var userName = document.querySelector('#user-name');
    var passWord = document.querySelector('#password');
    var confirmPassWord = document.querySelector('#confirm-password');

    var ck = 1;
    if (name.length==0) {
        ck = 0;
        alert("Vui lòng nhập Họ và Tên");
    }
    if (userName.length==0) {
        ck = 0;
        alert("Vui lòng nhập Tên đăng nhập");
    }
    if (passWord.length==0) {
        ck = 0;
        alert("Vui lòng nhập Mật khẩu");
    }
    if (confirmPassWord.length==0) {
        ck = 0;
        alert("Vui lòng nhập lại Mật khẩu");
    }
    if (passWord.value!=''&&confirmPassWord.value!=''&&passWord.value!=confirmPassWord.value) {
        ck = 0;
        alert("Nhập lại mật khẩu không đúng");
    }



    if (ck) {
        var ck2 = 1;
        for (var i = 0; i < teachers.length; i++){
            if (userName.value == teachers[i].userName && passWord.value == teachers[i].passWord) {
                alert("Tên đăng nhập và mật khẩu đã được sử dụng. Vui lòng chọn tài khoản khác nhé!");
                    ck2 = 0;
                    break;
            }
            for (var j = 0; j < teachers[i].students.length;j++){
                if (userName.value == teachers[i].students[j].userName && passWord.value == teachers[i].students[j].passWord) {
                    alert("Tên đăng nhập và mật khẩu đã được sử dụng. Vui lòng chọn tài khoản khác nhé!");
                    ck2 = 0;
                    break;
                }
            };
        };
        
        if (ck2) {
            var student = {
                name: `${name.value}`,
                passWord: `${passWord.value}`,
                scoresTb1:[],
                scoresTb2:[],
                userName: `${userName.value}`
            };
            var dqt = document.querySelectorAll('.score tr td:nth-child(2) input');
            var thi = document.querySelectorAll('.score tr td:nth-child(3) input');
            var kthp = [];
            kthp.length = dqt.length;
        
            for (var i = 0; i < dqt.length; i++){
                student.scoresTb2.push(parseFloat(dqt[i].value));
                student.scoresTb2.push(parseFloat(thi[i].value));
                kthp[i] = (parseFloat(dqt[i].value) + parseFloat(thi[i].value)) / 2.0;
                student.scoresTb2.push(kthp[i]);
            };
        
            var diem = 0;
            var diem2 = 0;
            for (var i = 0; i < 8; i++){
                diem += student.scoresTb2[2 + i * 3] * soTinChi[i];
                diem2 += student.scoresTb2[2 + i * 3];
            }
            diem /= 19.0;
            diem = Math.round(diem * 100) / 100;
            student.scoresTb1[0] = diem;
            diem2 /= 8.0;
            diem2 = Math.round(diem2 * 100) / 100;
            student.scoresTb1[8] = diem2;
        
            diem = 0;
            diem2 = 0;
            for (var i = 8; i < 18; i++){
                diem += student.scoresTb2[2 + i * 3] * soTinChi[i];
                diem2 += student.scoresTb2[2 + i * 3];
            }
            diem /= 21.0;
            diem = Math.round(diem * 100) / 100;
            student.scoresTb1[1] = diem;
            diem2 /= 10.0;
            diem2 = Math.round(diem2 * 100) / 100;
            student.scoresTb1[9] = diem2;
            student.scoresTb1[10] = student.scoresTb1[11] = Math.round((student.scoresTb1[8] * 8 + diem2 * 10) / 18 * 100) / 100;
            student.scoresTb1[2] = student.scoresTb1[3] = Math.round(((student.scoresTb1[0] * 19 + diem * 21) / 40) * 100) / 100;
        
            for (var i = 4; i < 8; i++){
                student.scoresTb1[i + 8] = Math.round((student.scoresTb1[i + 8 - 4] / 2.5) * 100) / 100;
                student.scoresTb1[i] = Math.round((student.scoresTb1[i - 4] / 2.5) * 100) / 100;
            };
            console.log(teachers[now].students);
            teachers[now].students.push(student);
            localStorage.setItem('teachers', JSON.stringify(teachers));
            location.reload();
        }
        
    }
   

}