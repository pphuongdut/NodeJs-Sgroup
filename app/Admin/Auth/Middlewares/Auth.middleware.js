const { check, validationResult } = require('express-validator');

// check user to login
const verifyAuthentication = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/login');
};
const verifynotAuthentication = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    return res.redirect('/users');
};
// validator
const validateRegisterUser = (req, res, next) => {
    {
        check('req.body.password', 'Password more than 6 degits').isLength({
            min: 6,
        }),
            check(
                'req.body.confirmpassword',
                'Password need to confirm',
            ).equals('req.body.confirmpassword');
    }
    return next();
};

module.exports = {
    verifyAuthentication,
    verifynotAuthentication,
    validateRegisterUser,
};
