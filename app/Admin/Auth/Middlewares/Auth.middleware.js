const { check } = require('express-validator');

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
const validateRegisterUser = (req,res,next) => {
    
    return [
        check('req.body.email', 'Invalid email').isEmail(),
        check('req.body.password', 'password more than 6 degits').isLength({
            min: 6,
        }),
    ];
};

module.exports = { verifyAuthentication, verifynotAuthentication, validateRegisterUser};
