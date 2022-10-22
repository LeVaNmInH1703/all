
/* ------ Start Functions Declaration ------*/
function handleExceptionsForPage() {
    // Handle exception of localStorage which is not supported by some Browsers in some cases.
    handleExceptionOfLocalStorage();
}

function handleExceptionOfLocalStorage() {
    let currentBrowser = getCurrentBrowser().toLowerCase().trim();
    let exceptionObject = {
        messageForAlertNotification : EMPTY_STRING, 
        messageForStudentDataTable  : EMPTY_STRING
    };

    if (typeof(localStorage) === 'undefined') {
        if (currentBrowser === 'edge') {
            throwExceptionMessagesInEdge(exceptionObject);
        } else {
            throwExceptionMessagesInOtherBrowsers(exceptionObject);
        }
    }

    if (currentBrowser === 'safari on ios' && !isLocalStorageSupportedByBrowser()) {
        throwExceptionMessagesInSafari(exceptionObject);
    }
}

function throwExceptionMessagesInEdge(exceptionObject) {
    exceptionObject.messageForAlertNotification = `
        Chức năng này không khả dụng do Microsoft Edge không hỗ trợ lưu trữ dữ liệu khi chạy trực tiếp HTML File.<br>
        Bạn vui lòng chạy File chương trình qua http/https server.<br>
        Hoặc bạn có thể sử dụng Trình duyệt khác như: Chrome, Opera hoặc Firefox.
    `;

    exceptionObject.messageForStudentDataTable = `
        Microsoft Edge không hỗ trợ lưu trữ dữ liệu (Local Storage) khi chạy trực tiếp HTML File.<br>
        Bạn vui lòng chạy File chương trình qua http/https server (localhost, GitHub, ...).<br>
        Hoặc bạn có thể sử dụng Trình duyệt khác như: Chrome, Opera hoặc Firefox.
    `;

    throw exceptionObject;
}

function throwExceptionMessagesInOtherBrowsers(exceptionObject) {
    exceptionObject.messageForAlertNotification = `
        Chức năng này không khả dụng do Trình duyệt hiện tại không hỗ trợ lưu trữ dữ liệu.<br>
        Bạn vui lòng chuyển qua Trình duyệt khác như: Chrome, Opera hoặc Firefox để sử dụng chương trình.
    `;

    exceptionObject.messageForStudentDataTable = `
        Trình duyệt hiện tại không hỗ trợ lưu trữ dữ liệu (Local Storage).<br>
        Bạn vui lòng chuyển qua Trình duyệt khác như: Chrome, Opera hoặc Firefox để sử dụng chương trình.
    `;

    throw exceptionObject;
}

function throwExceptionMessagesInSafari(exceptionObject) {
    exceptionObject.messageForAlertNotification = `
        Chức năng này không khả dụng do Safari trên iOS hiện tại không hỗ trợ lưu trữ dữ liệu khi chạy ở chế độ riêng tư (Private).<br>
        Bạn vui lòng chuyển Trình duyệt sang chế độ thông thường để sử dụng chương trình.
    `;

    exceptionObject.messageForStudentDataTable = `
        Safari trên iOS hiện tại không hỗ trợ lưu trữ dữ liệu khi chạy ở chế độ riêng tư (Private).<br>
        Bạn vui lòng chuyển Trình duyệt sang chế độ thông thường để sử dụng chương trình.
    `;

    throw exceptionObject;
}

function isLocalStorageSupportedByBrowser() {
    let storage = window.sessionStorage;

    try {
        storage.setItem('testKey', 'testValue');
        storage.removeItem('testKey');

        return true;
    } catch (exception) {
        return false;
    }
}

function handleUndefinedException(isFunctionCallOnLoadPage = true) {
    let currentBrowser = getCurrentBrowser().toLowerCase().trim();
    let messageForAlertNotification;
    let messageForStudentDataTable;

    if (currentBrowser === 'edge') {
        messageForAlertNotification = `
            Chức năng này không khả dụng do Microsoft Edge không hỗ trợ lưu trữ dữ liệu khi chạy trực tiếp HTML File.<br>
            Bạn vui lòng chạy File chương trình qua http/https server.<br>
            Hoặc bạn có thể sử dụng Trình duyệt khác như: Chrome, Opera hoặc Firefox.
        `;

        messageForStudentDataTable = `
            Microsoft Edge không hỗ trợ lưu trữ dữ liệu (Local Storage) khi chạy trực tiếp HTML File.<br>
            Bạn vui lòng chạy File chương trình qua http/https server (localhost, GitHub, ...).<br>
            Hoặc bạn có thể sử dụng Trình duyệt khác như: Chrome, Opera hoặc Firefox.
        `;
    } else {
        messageForAlertNotification = `
            Chức năng này không khả dụng do xảy ra lỗi chưa xác định.<br>
            Bạn vui lòng liên hệ với Tác giả của chương trình để được trợ giúp.
        `;

        messageForStudentDataTable = `
            Lỗi chưa xác định !!!<br>
            Bạn vui lòng liên hệ với Tác giả của chương trình để được trợ giúp.
        `;
    }

    if (isFunctionCallOnLoadPage) {
        initializeSettingsWhenException(messageForAlertNotification);
        renderTableForErrorInfo(messageForStudentDataTable);
    } else {
        sendAlertNotification(`${messageForAlertNotification}`, 6000);
    }
}

function renderTableForErrorInfo(exceptionMessage) {
    let tableContent = TABLE_HEADER;

    tableContent += `
        <tr class="error-info">
            <td align="center" colspan="${TABLE_COLUMN_COUNT}">
                ${exceptionMessage}
            </td>
        </tr>
    `;

    tblStudentInfoList.innerHTML = tableContent;
}
/* ------ End Functions Declaration ------*/