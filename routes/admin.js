const express = require('express');
const router = express.Router();

const authmiddleware = require('../app/Admin/Auth/Middlewares/Auth.middleware');
const {
    validateRegisterUser,
} = require('../app/Admin/Auth/Middlewares/Auth.middleware');
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
router.get('/users', authmiddleware.verifyAuthentication, usersRender);
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
    .get(authmiddleware.verifynotAuthentication, registerRender)
    .post(registerMethod);
//logout
router.post('/logout', logoutMethod);

//view user

router.route('/users/:id').get(authmiddleware.verifyAuthentication, userView);

// edit user
router.route('/edit/:id').post(authmiddleware.verifyAuthentication, userEdit);

//delete user
router
    .route('/delete/:id')
    .post(authmiddleware.verifyAuthentication, userDelete);

module.exports = router;
