const getIn = require('./support/get-in.js');
const setIn = require('./support/set-in.js');
const deleteIn = require('./support/delete-in.js');
const EventEmitter = require('events');

class KeyValueStore extends EventEmitter {
    constructor(storage) {
        super();
        this._storage = storage;
        this._data = this._storage.getData();

        // storage is an EventEmitter and may emit 'change' events to refresh
        // the data, e.g. listening on S3 bucket updates
        this._storage.on('change', (data) => {
            this._data = data;
        });
    }

    getData() {
        return this._data;
    }

    getKey(key) {
        if (Array.isArray(key)) {
            return getIn(this._data, key, null);
        }

        return this._data[key] || null;
    }

    setKey(key, body) {
        if (Array.isArray(key)) {
            setIn(this._data, key, body.value);
        } else {
            this._data[key] = body.value;
        }

        this.emit('update', {
            type: 'set',
            data: this.getData(),
            key,
            value: body.value,
        });

        this._storage.update(this._data, key, body.value);
    }

    deleteKey(key) {
        if (Array.isArray(key)) {
            deleteIn(this._data, key);
        } else {
            delete this._data[key];
        }

        this.emit('update', {
            type: 'delete',
            data: this.getData(),
            key,
        });

        this._storage.deleteKey(this._data, key);
    }
}

module.exports = KeyValueStore;
