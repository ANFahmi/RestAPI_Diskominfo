const logRequest = (req, res, next) => {
    console.log('Hit PATH: ', req.path);
    next();
}

module.exports = logRequest;