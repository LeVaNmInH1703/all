
/* ------ Start Constants Declaration ------*/
const WINDOW_HEADER = `
    <div class="header-area">
        <div class="left-item">
            <img src="./images/suntech_logo.jpg">
            <label>Chương trình Quản lý Sinh viên</label>
        </div>
        <div class="right-item" title="Click để đóng cửa sổ này">&times;</div>
    </div>
`;
/* ------ End Constants Declaration ------*/

/* ------ Start Functions Declaration ------*/
function createWindowHelpFilterSearch() {
    winHelpFilterSearch.innerHTML = `
        ${WINDOW_HEADER}
        <div class="main-area">
            <h3>Hướng dẫn Tìm kiếm và Lọc thông tin</h3>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        Để tìm các sinh viên có Họ và Tên chứa chữ Bình
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Nhập vào TextBox: Bình hoặc bình
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Chương trình <span class="highlight">không phân biệt chữ hoa chữ thường.</span>
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        Để tìm các sinh viên có Tên là Bình
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Nhập vào TextBox: Bình$ hoặc bình$
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        Để tìm các sinh viên có <span class="highlight">Họ là Nguyễn & Tên là Bình</span>
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Nhập vào TextBox: "^Nguyễn Bình$" hoặc "^nguyễn + bình$"
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Họ và Tên <span class="highlight">phân tách nhau bởi dấu cách hoặc dấu cộng.</span>
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        Để tìm các sinh viên có Tên là Tâm hoặc Bình hoặc An
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Nhập vào TextBox: Tâm$; Bình$; An$
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Các giá trị cần tìm kiếm <span class="highlight">cách nhau bởi dấu phẩy hoặc chấm phẩy.</span>
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        Để tìm các sinh viên dùng Gmail hoặc Số điện thoại bắt đầu bằng 0912
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Nhập vào TextBox: @gmail.com; ^0912
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createWindowListShortcutKeys() {
    winListShortcutKeys.innerHTML = `
        ${WINDOW_HEADER}
        <div class="main-area">
            <h3>Danh sách Phím tắt hỗ trợ người dùng</h3>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        <span class="highlight">Phím Tab & Shift + Tab</span>
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Di chuyển con trỏ chuột trên Form nhập thông tin & Tìm kiếm/Lọc.
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        <span class="highlight">Phím Enter</span>
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Submit & Xác nhận hoàn tất các thao tác Thêm/Sửa/Xóa.
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Thực hiện Tìm kiếm/Lọc.
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        <span class="highlight" id="keyArrowUpDown">
                            Phím
                            <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
                            <i class="fa fa-arrow-circle-down" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Di chuyển con trỏ chuột trong Danh sách sinh viên để xem thông tin chi tiết & tiến hành Cập nhật (nếu cần).
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        <span class="highlight">Phím Del (Delete)</span>
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Xóa thông tin sinh viên đang focus trong Danh sách.
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        <span class="highlight">Phím Esc (Escape)</span>
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Đóng cửa sổ Tìm kiếm/Lọc.
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Đóng hộp thoại Tiện ích bổ sung.
                    </div>
                </div>
            </div>

            <div class="example">
                <div class="heading">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    <div class="text">
                        <span class="highlight">
                            Phím Ctrl + <i class="fa fa-windows" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Mở cửa sổ Tìm kiếm/Lọc.
                    </div>
                </div>
                <div class="content">
                    <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    <div class="text">
                        Mở hộp thoại Tiện ích bổ sung.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createWindowIntroduceProduct() {
    winIntroduceProduct.innerHTML = `
        ${WINDOW_HEADER}
        <div class="main-area">
            <h2>JavaScript Case Study</h2>
            <h3>Student Management Program</h3>

            <div class="line">
                <div class="heading">
                    <span class="text">Phiên bản</span>:
                </div>
                <div class="content">
                    2.5.1 (04/2020)
                </div>
            </div>

            <div class="line">
                <div class="heading">
                    <span class="text">Người thực hiện</span>:
                </div>
                <div class="content">
                    Tùng Nguyễn - Học viên Lớp
                    <span class="highlight"> Front End 4</span>
                </div>
            </div>

            <div class="line">
                <div class="heading">
                    <span class="text"></span>&nbsp;
                </div>
                <div class="content">
                    Trung tâm Đào tạo Lập trình
                    <span class="highlight"> SUNTECH VIỆT NAM</span>
                </div>
            </div>
        </div>
    `;
}
/* ------ End Functions Declaration ------*/