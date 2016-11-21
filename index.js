const Configz = require('./src/configz.js');
const NullStorage = require('./src/storages/null.js');

module.exports = {
    server: Configz,
    storage: {
        none: NullStorage,
    },
}
