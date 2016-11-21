module.exports = (config) => (req, res) => {
    const path = req.params[0];
    const pathArray = path.split('/');
    const body = req.body;

    if (body.value) {
        config.setKey(pathArray, body);
    }
    res.json(true);
}
