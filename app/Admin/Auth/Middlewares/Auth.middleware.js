const { check, validationResult } = require('express-validator');

// check user to login
const verifyAuthentication = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/admin/login');
};
const verifynotAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    return res.redirect('/admin/users');
};


module.exports = {
    verifyAuthentication,
    verifynotAuthentication,
};
