function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function yesOrFake(rows) {
    if (!rows.length) {
        return false;
    }
    else {
        return true;
    }
}

function generateRandomCode() {
    var code = Math.floor(Math.random() * 100000000);
    return code.toString().padStart(8, '0');
}

module.exports = {
    getOffset,
    emptyOrRows,
    yesOrFake,
    generateRandomCode
}