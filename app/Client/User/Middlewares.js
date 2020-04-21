// check user to login
const verifyAuthentication = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/JudoStore');
};
const verifynotAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    return res.redirect('/JudoStore');
};

module.exports = {
    verifyAuthentication,
    verifynotAuthentication,
};
