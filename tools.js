class Tools {
    validateNotEmptyNotString(value) {
        return value.length > 0 && typeof value === 'string';
    }
}

module.exports = new Tools;