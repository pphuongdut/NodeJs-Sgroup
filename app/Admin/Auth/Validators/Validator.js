const { check } = require('express-validator');
// validator
const validatorRegister = 
[
    check('password', 'password more than 6 degits').isLength({ min: 6 }),
    check('confirmpassword').custom((value, { req ,res}) => {
        if (value !== req.body.password) {
            throw new Error('Confirm password is incorrect');
        }
        return true;
    }),
];
const validatorLogin = 
    [check('email', 'invalid Email').notEmpty()];
module.exports = {
    validatorRegister,
    validatorLogin,
};
