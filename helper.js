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

module.exports = {
    getOffset,
    emptyOrRows,
    yesOrFake
}