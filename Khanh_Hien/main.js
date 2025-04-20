//khai báo các biến có bán kính, bool tự quay, tốc dộ quay,khung ảnh
var radius = 240; 
var autoRotate = true; 
var rotateSpeed = -100; 
var imgWidth = 120;
var imgHeight = 170; 
setTimeout(init, 1000);
//select đến các id
var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aEle= ospin.getElementsByTagName('img');

//gán chiều rộng và dài cho ảnh
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
//viết hàm cho nó quây thành hình tròn và gọi
function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 5s";
    // aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}
//viết hàm auto quay
if (autoRotate) {
  ospin.style.animation = `spinRevert ${Math.abs(rotateSpeed)}s infinite linear`;
}
//viết hàm có dừng hay không khi click
function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}
// sx sy là tọa độ ban đầu của chuột
//nx ny là lúc sau
//des xy là độ biến thiên
//tx ty là kết quả được cập nhập cho transform
var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 45,
    tY = 45;



//viết hàm thay đổi transform
function applyTranform(obj) {
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}
//viết hàm khi bấm chuột xuống = dừng tự quay + dừng quay quán tính + lấy tọa độ x,y

document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    playSpin(false);
    //lấy x và y theo khu vực nội tuyến
  var sX = e.clientX,
        sY = e.clientY;
    //khi chuột chuyển động = lấy tọa độ x,y ,tính toàn thay đổi +
    // gọi hàm thay đổi transform cập nhập giá trị cho x, y cũ
  this.onpointermove = function (e) {
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };
    //khi nhậc chuột lên = bật tự quay + hàm quán tính
    this.onpointerup = function (e) {
        playSpin(true);
    // hàm quán tính = setinterval + giảm dần tốc độ + cập nhập thay đổi + gọi hàm thay đổi
      odrag.timer = setInterval(function () {
        desX *= 0.99;
        desY *= 0.99;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
    }, 17);
    //xóa bắt sự kiện
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};
//khi lăn chuột = cập nhập cho bán kính + gọi hàm thay đổi
document.onmousewheel = function(e) {
  radius += e.wheelDelta;
  init(0.1);
};