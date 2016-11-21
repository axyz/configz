module.exports = (data, arr, value) => arr.reduce((d, k, i) => {
    if (i === arr.length - 1) {
        return d[k] = value
    } else if (d[k] !== undefined) {
        return d[k];
    }

    d[k] = {};
    return d[k];
}, data);
