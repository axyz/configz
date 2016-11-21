module.exports = (config) => (req, res) => {
    const path = req.params[0];
    const pathArray = path.split('/');

    config.deleteKey(pathArray);

    res.json(true);
}
