module.exports = (data, arr) => arr.reduce((d, k, i) => {
    if (i === arr.length - 1) {
        return delete d[k]
    } else if (d[k] !== undefined) {
        return d[k];
    }

    return {};
}, data);
