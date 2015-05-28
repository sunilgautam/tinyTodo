var responder = {
    notFound: function(next, msg) {
        var err = new Error(msg || 'Not Found');
        err.status = 404;
        return next(err);
    }
};

module.exports = responder;