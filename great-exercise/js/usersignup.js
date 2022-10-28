
var teachers = [];
var soTinChi;
var now = JSON.parse(localStorage.getItem('now'));
var index = now;
//nêu chưa có thì tạo teachers
if (localStorage.getItem('teachers') == '') {
    var temp2 = [1, 2, 3, 3, 2, 2, 3, 3, 1, 3, 2, 1, 2, 3, 2, 2, 2, 3];
    localStorage.setItem('soTinChi', JSON.stringify(temp2));
    teachers = [];
    soTinChi = JSON.parse(localStorage.getItem('soTinChi'));
} else {
    teachers = JSON.parse(localStorage.getItem("teachers"));
}






function signUp() {
    userName = document.getElementById('sign-up__username').value;
    passWord = document.getElementById('sign-up__password').value;
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
        var ck = 0;
        for (var i = 0; i < teachers.length; i++){
            for (var j = 0; j < teachers[i].students.length;j++){
                if ((userName == teachers[i].userName && passWord == teachers[i].passWord) ||
                    (userName == teachers[i].students[j].userName && passWord == teachers[i].students[j].passWord)) {
                    alert("Tên đăng nhập và mật khẩu đã được sử dụng. Vui lòng đăng kí lại!");
                    ck = 1;
                }  
            };
            
        };
        if (ck == 0) {
            teachers[teachers.length] = {
                userName: userName,
                passWord: passWord,
                name: "",
                students: [],
            };
            localStorage.setItem("now", JSON.stringify(teachers.length-1));
            localStorage.setItem('teachers', JSON.stringify(teachers));
            console.log(teachers);
            location.href = './listStudents.html';
            
        }
        document.getElementById('sign-up__username').value = "";
        document.getElementById('sign-up__password').value = "";
        document.getElementById('sign-up__confirm-password').value="";
    }
}
// đã đk xong

function saveTeacher() {
    teachers[index].name = document.getElementById('teacher-name').value;
    teachers[index].userName = document.getElementById('teacher-username').value;
    teachers[index].passWord = document.getElementById('teacher-password').value;
    localStorage.setItem('teachers', JSON.stringify(teachers));
    alert('Thông tin đã được lưu');
}


// now là giáo viên
if (teachers.length > 0) {
    now = teachers[now];
    if (document.getElementById('teacher-name')) {
        document.getElementById('teacher-name').value = now.name;
    }
    if (document.getElementById('teacher-username')) {
        document.getElementById('teacher-username').value = now.userName;
    }
    if(document.getElementById('teacher-password'))
        document.getElementById('teacher-password').value = now.passWord;
    if(document.getElementById('show-password'))
        document.getElementById('show-password').onclick = function () {
            if (this.checked) {
                document.getElementById('teacher-password').setAttribute('type','text');
            } else {
                document.getElementById('teacher-password').setAttribute('type','password');
            }
        }
    
    if(document.getElementById('themSinhVien'))
        document.getElementById('themSinhVien').onclick = function () {
            if (this.checked) {
                document.getElementById('createStudent').style.display='block'
            } else {
                document.getElementById('createStudent').style.display='none'
            }
        }

    var soSv = now.students.length;

    if (soSv > 0) {
        if(document.querySelector('.status-primary h3'))
            document.querySelector('.status-primary h3').innerText = `${soSv}`;
        // điểm tổng kết cả năm he 4 nhỏ hơn 1 
        var soSvTamNgungHoc = 0;
        for (var i = 0; i < soSv;i++){
            if (now.students[i].scoresTb1[6] < 1)
                soSvTamNgungHoc++;
        };
        if(document.querySelector('.status-warning h3'))
            document.querySelector('.status-warning h3').innerText = `${soSvTamNgungHoc}`;
        // điểm kthp nhỏ hơn 4
        var soSvNoMon = 0;
        for (var i = 0; i < soSv;i++){
            if (now.students[i].scoresTb2[2] < 4 ||
                now.students[i].scoresTb2[5] < 4 ||
                now.students[i].scoresTb2[8] < 4 ||
                now.students[i].scoresTb2[11] < 4 ||
                now.students[i].scoresTb2[14] < 4 ||
                now.students[i].scoresTb2[17] < 4 ||
                now.students[i].scoresTb2[20] < 4 ||
                now.students[i].scoresTb2[23] < 4 ||
                now.students[i].scoresTb2[26] < 4 ||
                now.students[i].scoresTb2[29] < 4 ||
                now.students[i].scoresTb2[32] < 4 ||
                now.students[i].scoresTb2[35] < 4 ||
                now.students[i].scoresTb2[38] < 4 ||
                now.students[i].scoresTb2[41] < 4 ||
                now.students[i].scoresTb2[44] < 4 ||
                now.students[i].scoresTb2[47] < 4 ||
                now.students[i].scoresTb2[50] < 4 ||
                now.students[i].scoresTb2[53] < 4
                )
                soSvNoMon++;
        };
        if(document.querySelector('.status-success h3'))
            document.querySelector('.status-success h3').innerText = `${soSvNoMon}`;
        
        // điểm hệ 4 <2
        var soSvCanhBao = 0;
        for (var i = 0; i < soSv;i++){
            if (now.students[i].scoresTb1[6] < 2 && now.students[i].scoresTb1[6] >= 1)
                soSvCanhBao++;
        };
        if(document.querySelector('.status-danger h3'))
            document.querySelector('.status-danger h3').innerText = `${soSvCanhBao}`;
        var listStudentsTop = now.students;
        for (var i = 0; i < listStudentsTop.length;i++){
            for (var j = 0; j < listStudentsTop.length;j++ ){
                if (listStudentsTop[i].scoresTb1[2] > listStudentsTop[j].scoresTb1[2]) {
                    var temp = listStudentsTop[i];
                    listStudentsTop[i] = listStudentsTop[j];
                    listStudentsTop[j] = temp;
                }
            };
        };
        var innerHTMLListStudentTop = '';
        var min = listStudentsTop.length > 5 ? 5 : listStudentsTop.length;
        for (var i = 0; i < min; i++){
            innerHTMLListStudentTop +=`<tr>
                    <td>${i+1}</td>
                    <td>${listStudentsTop[i].name}</td>
                    <td>${listStudentsTop[i].scoresTb1[2]}</td>
                </tr>
                
                `
            
        };
        if(document.querySelector(".card table tbody"))
            document.querySelector(".card table tbody").innerHTML = innerHTMLListStudentTop;
        // điểm trên 3.6
        var soSvTren36 = 0;
        for (var i = 0; i < soSv;i++){
            if (now.students[i].scoresTb1[6] >= 3.6)
                soSvTren36++;
        };
        if(document.querySelector('#diem-xs'))
            document.querySelector('#diem-xs').innerText = `${soSvTren36}/${soSv}`;
        soSvTren36 = soSvTren36 * 100 / soSv;
        if(document.querySelector('.bg-success'))
            document.querySelector('.bg-success').style.width=`${soSvTren36}%`
        // điểm trên 3.2
        var soSvTren32 = 0;
        for (var i = 0; i < soSv;i++){
            if (now.students[i].scoresTb1[6] >= 3.2 && now.students[i].scoresTb1[6] < 3.6)
                soSvTren32++;
        };
        if(document.querySelector('#diem-kha'))
            document.querySelector('#diem-kha').innerText = `${soSvTren32}/${soSv}`;
        soSvTren32 = soSvTren32 * 100 / soSv;
        if(document.querySelector('.bg-primary'))
            document.querySelector('.bg-primary').style.width=`${soSvTren32}%`
        // điểm trên 2.5
        var soSvTren25 = 0;
        for (var i = 0; i < soSv;i++){
            if (now.students[i].scoresTb1[6] >= 2.5 && now.students[i].scoresTb1[6] < 3.2)
                soSvTren25++;
        };
        if(document.querySelector('#diem-tb'))
            document.querySelector('#diem-tb').innerText = `${soSvTren25}/${soSv}`;
        soSvTren25 = soSvTren25 * 100 / soSv;
        if(document.querySelector('.bg-warning'))
            document.querySelector('.bg-warning').style.width=`${soSvTren25}%`
        // điểm dưới 2.5
        var soSvDuoi25 = 0;
        for (var i = 0; i < soSv;i++){
            if (now.students[i].scoresTb1[6] < 2.5)
                soSvDuoi25++;
        };
        if(document.querySelector('#diem-yeu'))
            document.querySelector('#diem-yeu').innerText = `${soSvDuoi25}/${soSv}`;
        soSvDuoi25 = soSvDuoi25 * 100 / soSv;
        if(document.querySelector('.bg-danger'))
            document.querySelector('.bg-danger').style.width=`${soSvDuoi25}%`

        var listStudents = now.students;
        var innerHTMLListStudent = '';
        for (var i = 0; i < soSv;i++){
            innerHTMLListStudent += `
                <tr>
                    <th scope="row">${i+1}</th>
                    <td>${listStudents[i].name}</td>
                    <td>${listStudents[i].userName}</td>
                    <td>${listStudents[i].passWord}</td>
                    <td>
                    <button type="button" class="btn btn-primary btn-sm" onclick="xemDiem(${i});">
                        Xem Điểm
                    </button>
                    <button type="button" class="btn btn-secondary btn-sm" onclick="suaDiem(${i});">
                        Sửa
                    </button>
                    </td>
                </tr>
            `
        };
        if(document.querySelector('.list-student-tbody'))
            document.querySelector('.list-student-tbody').innerHTML = innerHTMLListStudent;
    }

}


function xemDiem(i) {
    localStorage.setItem('sinhVienThu', `${i}`);
    location.href='./transcript.html'
}

function suaDiem(i) {
    localStorage.setItem('sinhVienThu', `${i}`);
    location.href='./inputScores.html'
}