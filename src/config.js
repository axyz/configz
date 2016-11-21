const getIn = require('./support/get-in.js');
const setIn = require('./support/set-in.js');
const deleteIn = require('./support/delete-in.js');

class Config {
    constructor(storage, broadcast = () => {}) {
        this._storage = storage;
        this._broadcast = broadcast;
        this._data = this._storage.getData();
    }

    getData() {
        return this._data;
    }

    getKey(key) {
        console.log(key)
        console.log(this._data)
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

        this._broadcast({
            type: 'update',
            body: {
                data: this.getData(),
                action: 'set',
                key,
                value: body.value,
            },
        });

        this._storage.update(this._data, key, body.value);
    }

    deleteKey(key) {
        if (Array.isArray(key)) {
            deleteIn(this._data, key);
        } else {
            delete this._data[key];
        }

        this._broadcast({
            type: 'update',
            body: {
                data: this.getData(),
                action: 'delete',
                key,
            },
        })

        this._storage.deleteKey(this._data, key);
    }
}

module.exports = Config;
