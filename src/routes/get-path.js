module.exports = (config) => (req, res) => {
    const path = req.params[0];
    const pathArray = path.split('/');

    res.json(config.getKey(pathArray));
}
