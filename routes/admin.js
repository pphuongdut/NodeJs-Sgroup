const express = require('express');
const router = express.Router();
const authmiddleware = require('../app/Admin/Auth/Middlewares/Auth.middleware');
const validator = require('./validator');
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
router.use('/users', authmiddleware.verifyAuthentication, usersRender);
//home
router.get('/', homepageRender);
//login
router
    .route('/login')
    .get(authmiddleware.verifynotAuthentication, loginRender)
    .post(authmiddleware.verifynotAuthentication, loginMethod);

//register
router
    .route('/register')
    .get(
        authmiddleware.verifynotAuthentication,
        validator.validateRegisterUser(),
        registerRender,
    )
    .post(registerMethod);
//logout
router.post('/logout', logoutMethod);

//view user
router.route('/users/:id').get(authmiddleware.verifyAuthentication, userView);

// edit user
router.route('/:id/edit').put(authmiddleware.verifyAuthentication, userEdit);

//delete user
router
    .route('/:id/delete')
    .delete(authmiddleware.verifyAuthentication, userDelete);

module.exports = router;
