var imgHeight = 170;
var imgWidth = 120;
var autoSpin = true;
var spinSpeed = 12;//1 vòng hết 6 s
var r = 240;
var ctn = document.getElementById("ctn");
var ctnSpin = document.getElementById("ctn__spin");
ctnSpin.style.width = imgWidth + 'px';
ctnSpin.style.height = imgHeight + 'px';
var imgTag = document.getElementsByTagName("img");
var videoTag = document.getElementsByTagName("video");
var elem = [...imgTag,...videoTag];
//chú ý là setTimeout khi gọi hàm k có ()
setTimeout(changeR, 2000);
if (autoSpin) {
    ctnSpin.style.animation = `spin ${spinSpeed}s linear infinite`;
};

function changeR() {
    for (var i = 0; i < elem.length; i++){
        elem[i].style.transform = "rotateY(" + (i * 360 / elem.length) + "deg) translateZ(" + r + "px) ";
        elem[i].style.transition = "transform 5s";
        elem[i].style.transitionDelay = ((elem.length-i)/2) + 's';
    }
};
var fx=0, fy=0, sx=0, sy=0, tx=0, ty=0, dx=0, dy=0;
function stopSpin(autoSpin) {
    ctnSpin.style.animationPlayState = autoSpin ? "running" : "paused";
}
function changeCtn() {
    ctn.style.transform = "rotateX(" + (-ty) + "deg) rotateY(" + tx + "deg)";
}

document.onmousewheel = function (e) {
    r += e.wheelDelta;
    changeR();
};
document.onpointerdown = function (e) {
    clearInterval(changeCtn.timer);
    stopSpin(false);
    fx = e.clientX;
    fy = e.clientY;
    console.log(fx,fy);
    this.onpointermove = function (e) {
        sx = e.clientX;
        sy = e.clientY;
        dx = sx - fx;
        dy = sy - fy;
        tx += dx * 0.1;
        ty += dy * 0.1;
        changeCtn();
        fx = sx;
        fy = sy;
    };
    this.onpointerup = function (e) {
        stopSpin(true);
        changeCtn.timer = setInterval(function () {
            dx *= 0.99;
            dy *= 0.99;
            tx += dx*0.1;
            ty += dy*0.1;
            changeCtn();
        }, 17);
        this.onpointermove = this.onpointerup = null;
    }
    return 0;
}