const EventEmitter = require('events');

class NullStorage extends EventEmitter {
    constructor(data) {
        super();
        this._data = data || {};
    }

    getData() {
        return this._data;
    }

    update() {}

    deleteKey() {}
}

module.exports = NullStorage;
