module.exports = function(req, res, next) {
    if (typeof req.user != "undefined") {
        res.locals.user = req.user;
    }
    next();
};
