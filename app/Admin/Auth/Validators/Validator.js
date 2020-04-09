const { check } = require('express-validator');

// validator
const validatorRegister = (req, res, next) => {
    return [
        check('password', 'password more than 6 degits').isLength({ min: 6 }),
    ];
};
module.exports = {
    validatorRegister,
};
