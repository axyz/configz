const Oggetti = require('./src/oggetti.js');
const NullStorage = require('./src/storages/null.js');

module.exports = {
    server: Oggetti,
    storage: {
        none: NullStorage,
    },
}
