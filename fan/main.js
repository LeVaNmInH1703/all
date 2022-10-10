const box = document.querySelector("#box");

const so1 = document.querySelector("#so1");
const so2 = document.querySelector("#so2");
const so3 = document.querySelector("#so3");
const stop = document.querySelector("#stop");
const start = document.querySelector("#start");
var t;
var td;
// đây là 1 hàm nếu có 1 tham số truyền vào có thể thay () = tên tham số đó
let rotate = () => {
    box.style.animation = `quay linear ${td*3600}s`;
}

start.onclick = () => {
    box.style.animation = '';
    td = 6;
    rotate();
}
start.touchdown = () => {
    box.style.animation = '';
    td = 6;
    rotate();
}

so1.onclick = () => {
    box.style.animation = '';
    td = 3;
    rotate();
}

so2.onclick = () => {
    box.style.animation = "";
    td = 1.5;
    rotate();
}

so3.onclick = () => {
    box.style.animation = "";
    td = 0.75;
    rotate();
}

stop.onclick = () => {
    box.style.animation = "";
}