const express = require('express');
const router = express.Router();
const {
    productsRender,
    loginRender,
    registerRender,
    detailProductRender,
    loginMethod,
    registerMethod,
    logoutMethod,
} = require('../app/Client/Controllers');
const {
    verifynotAuthentication,
    verifyAuthentication,
} = require('../app/Client/Middlewares');
const {
    validatorRegister,
    validatorLogin,
} = require('../app/Admin/Auth/Validators/Validator');
// home render
router.get('/JudoStore', productsRender);
//login
router
    .route('/login')
    .get(verifynotAuthentication, loginRender)
    .post(loginMethod);
//register
router
    .route('/register')
    .get(verifynotAuthentication, registerRender)
    .post(registerMethod);
//logout
router.post('/logout', logoutMethod);
//route relate product
router.route('/product/:id').get(detailProductRender);
//delete Product
// router.route('/product/:id/delete').post(deleteProduct);
// router.route('/product/:id/edit').post(editProduct);
module.exports = router;
