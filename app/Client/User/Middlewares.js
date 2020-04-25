// check user to login
const verifyAuthentication = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/Judostore');
};
const verifynotAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    return res.redirect('/Judostore');
};

module.exports = {
    verifyAuthentication,
    verifynotAuthentication,
};
