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
const validatorRegister = (req,res,next) => {
     return [
         check('password', 'password more than 6 degits').isLength({ min: 6 }),
         check('email').custom(async value => {
             await knex('table_users')
                 .where({ email: value })
                 .select('email')
                 .then(result => {
                     if (result.length !== 0) {
                         throw new Error('Email is already in use');
                     } else {
                         return true;
                     }
                 });
         }),
         check('confirmpassword').custom((value, { req }) => {
             if (value !== req.body.password) {
                 throw new Error(
                     'Confirmpassword does not match ',
                 );
             } else {
                 return true;
             }
         }),
     ];
}
module.exports = {
    verifyAuthentication,
    verifynotAuthentication,
    validatorRegister
};
