const {check} = require('express-validator');
let validateRegisterUser = () => {
    return [
        check('user.email', 'Invalid email').isEmail(),
        check('user.password', 'password more than 6 degits').isLength({
            min: 6,
        }),
    ];
};
module.exports = { validateRegisterUser};