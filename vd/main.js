//khai báo các biến có bán kính, bool tự quay, tốc dộ quay,khung ảnh
var bk = 240;
var tu_quay = true;
var toc_do_quay = 60;//60 s quay hết 1 vòng
var rong = 120;
var cao = 170;

//select đến các id chọn tất cả img cho vào 1 mảng
var ctn = document.getElementById("ctn");
var quay_ctn = document.getElementById("quay_ctn");
var img = document.getElementsByTagName("img");
//gán chiều rộng và dài cho ảnh
quay_ctn.style.width = rong +"px";
quay_ctn.style.height = cao + "px";

setTimeout(init, 1000);

//viết hàm cho nó quây thành hình tròn và gọi
// rotateY quay theo i còn khoảng cách translateZ là giống nhau
// cài thời gian thực hiện cho nó
//cài thời gian delay cho cái sau phụ thuộc vào i
//chú ý kết thúc k có ;
function init() {
    for (var i = 0; i < img.length; i++){
        img[i].style.transform = "rotateY(" + (i * 360 / img.length) + "deg) translateZ(" + bk + "px)";
        img[i].style.transition = "transform 5s";
        // img[i].style.transitionDelay = ((img.length-i)) + "s";
    };
}


//viết câu lệnh auto quay

if(tu_quay) {
    quay_ctn.style.animation = `quay ${toc_do_quay}s linear infinite`;
}

//viết hàm có dừng hay không khi click
function playSpin(yes) {
    quay_ctn.style.animationPlayState = (yes ? "running" : "paused");
}

var fx, fy, nx, ny, desx = 0,
    desy = 0,
    tx = 45,
    ty = 45;

// sx sy là tọa độ ban đầu của chuột
//nx ny là lúc sau
//des xy là độ biến thiên
//tx ty là kết quả được cập nhập cho transform

//viết hàm thay đổi transform
function theo_chuot() {
    ctn.style.transform = "rotateX(" + (-ty) + "deg) rotateY(" + (tx) + "deg)";
}

//viết hàm khi bấm chuột xuống = dừng tự quay + dừng quay quán tính + lấy tọa độ x,y
document.onpointerdown = function (e) {
    clearInterval(ctn.timer);
    playSpin(false);
    fx = e.clientX,
    fy = e.clientY;
    //lấy x và y theo khu vực nội tuyến
    this.onpointermove = function (e) {
        nx = e.clientX,
        ny = e.clientY;
        desx = nx - fx;
        desy = ny - fy;
        tx += desx * 0.1;
        ty += desy * 0.1;
        theo_chuot();
        fx = nx;
        fy = ny;
        //khi chuột chuyển động = lấy tọa độ x,y ,tính toàn thay đổi +
        // gọi hàm thay đổi transform cập nhập giá trị cho x, y cũ
    };
    this.onpointerup = function (e) {
        //khi nhậc chuột lên = bật tự quay + hàm quán tính
        playSpin(true);
        ctn.timer = setInterval(function () {
            // hàm quán tính = setinterval + giảm dần tốc độ + cập nhập thay đổi + gọi hàm thay đổi
            desx *= 0.99;
            desy *= 0.99;
            tx += desx * 0.1;
            ty += desy * 0.1; 
            theo_chuot();
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    //xóa bắt sự kiện
    return false;
};
//khi lăn chuột = cập nhập cho bán kính + gọi hàm thay đổi
document.onmousewheel = function (e) {
    bk += e.wheelDelta;
    init();
};









