module.exports = (key) => {
    if (key in process.env) {
        return process.env[key];
    }
    return null;
}