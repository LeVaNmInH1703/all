
function toast({
    type = "",
    name = "",
    content=""
}) {
    const main = document.getElementById("msg-ctn");
    if (main) {
        // const main = mains[0];
        const msg = document.createElement("div");
        const autoRemove = setTimeout(function () {
            main.removeChild(msg);
        },3500)
        const icons = {
            success: "fas fa-check-circle",
            error: "fas fa-exclamation-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
        }
        const icon = icons[type];
        const colors = {
            success: "green",
            info: "blue",
            warning: "orangered",
            error:"red"
        }
        const color = colors[type];
        msg.onclick = function (e) {
            // nếu mà click gần .msg__close thì
            if (e.target.closest(".msg__close")) {
                main.removeChild(msg);
                clearTimeout(autoRemove);
            }
        }
        msg.classList.add("msg");
        msg.style.animation = `truot-ra 0.5s ease-in-out,bien-mat 0.5s 3s linear forwards`;
        msg.innerHTML = ` 
            <div class="msg__icon" style="color:${color}">
                <i class="${icon}"></i>
            </div>
            <div class="msg__title">
                <div class="msg__title-name " style="color:${color}">${name}</div>
                <div class="msg__title-content">${content}</div>
            </div>
            <div class="msg__close">
                <i class="fas fa-times"></i>
            </div>`;
        msg.style.borderLeft = `3px ${color} solid`;
        main.appendChild(msg);
    }
    
}
function showSuccess (){
    toast({
        type:"success",
        name:"Thành công",
        content:"Xin chúc mừng"
    });
}
function showInfo (){
    toast({
        type:"info",
        name:"Hân hạnh",
        content:"Vui lòng check lại thông tin!"
    });
}
function showWarning (){
    toast({
        type:"warning",
        name:"Cảnh báo",
        content:"Có một thông tin được nhập sai!"
    });
}
function showError (){
    toast({
        type:"error",
        name:"Lỗi",
        content:"Vui lòng thử lại!"
    });
}




// function toast({
//     title = "",
//     message = "",
//     type = "info",
//     duration = 3000,
// }) {
//     const main = document.getElementById("toast");
//     if (main) {
//         const toast = document.createElement("div");

//         const autoRemoveId = setTimeout(function () {
//         main.removeChild(toast);
//         }, duration + 1000);
//         // gọi hàm này sau duration + 1000 ms

//         toast.onclick = function (e) {
//         if (e.target.closest(".toast__close")) {
//             main.removeChild(toast);
//             clearTimeout(autoRemoveId);
//         }
//         // target "mục tiêu" trả về cái gì mình click vào
//         };

//         const icons = {
//         success: "fas fa-check-circle",
//         error: "fas fa-exclamation-circle",
//         info: "fas fa-info-circle",
//         warning: "fas fa-exclamation-circle",
//         };
//         const icon = icons[type];
//         const delay = (duration / 1000).toFixed(2);
//         toast.classList.add("toast", `toast--${type}`);
//         toast.style.animation = `slideInLeft ease 1s,fadeout linear 1s ${delay}s forwards`;
//         toast.innerHTML = `
//                 <div class="toast__icon">
//                     <i class="${icon}"></i>
//                 </div>
//                 <div class="toast__body">
//                     <h3 class="toast__title">${title}</h3>
//                     <p class="toast__msg">${message}</p>
//                 </div>
//                 <div class="toast__close">
//                     <i class="fas fa-times"></i>
//                 </div>
//             `;
//         main.appendChild(toast);
// }
// }

// function showSuccessToast() {
// toast({
//     title: "Success",
//     message: "đúng",
//     type: "success",
//     duration: 5000,
// });
// }

// function showErrorToast() {
// toast({
//     title: "Error",
//     message: "Sai",
//     type: "error",
//     duration: 5000,
// });
// }
// function showInfoToast() {
// toast({
//     title: "Info",
//     message: "Bình thường nhé!",
//     type: "info",
//     duration: 5000,
// });
// }
// function showWarningToast() {
// toast({
//     title: "Warning",
//     message: "Cảnh báo nhé bro!",
//     type: "warning",
//     duration: 5000,
// });
// }
