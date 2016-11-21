class NullStorage {
    constructor(data) {
        this._data = data || {};
    }

    getData() {
        return this._data;
    }

    update() {}

    deleteKey() {}
}

module.exports = NullStorage;
