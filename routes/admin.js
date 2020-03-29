const express = require('express');
const router = express.Router();
const knex = require('../database/knex');

const {
    verifynotAuthentication,
    verifyAuthentication,
    validatorRegister,
} = require('../app/Admin/Auth/Middlewares/Auth.middleware');
const { check, validationResult } = require('express-validator');
const {
    loginRender,
    registerRender,
    homepageRender,
    loginMethod,
    registerMethod,
    logoutMethod,
} = require('../app/Admin/Auth/Controllers/Auth.controller');
const {
    usersRender,
    userView,
    userEdit,
    userDelete,
} = require('../app/Admin/User/Controllers/User.controller');
// users
router.get('/users', verifyAuthentication, usersRender);
//home
router.get('/', homepageRender);
//login
router
    .route('/login')
    .get(verifynotAuthentication, loginRender)
    .post(verifynotAuthentication, loginMethod);

//register
router
    .route('/register')
    .get(verifynotAuthentication, registerRender)
    .post(
        [
            check('password', 'password more than 6 degits').isLength({
                min: 6,
            }),
            check('email').custom(async value => {
                await knex('users')
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
                    throw new Error('Confirmpassword does not match ');
                } else {
                    return true;
                }
            }),
        ],
        registerMethod,
    );
//logout
router.post('/logout', logoutMethod);

//view user

router.route('/users/:id').get(verifyAuthentication, userView);

// edit user
router.route('/edit/:id').put(verifyAuthentication, userEdit);

//delete user
router.route('/delete/:id').delete(verifyAuthentication, userDelete);

module.exports = router;
