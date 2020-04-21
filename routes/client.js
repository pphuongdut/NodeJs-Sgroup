const express = require('express');
const router = express.Router();
const {
    loginRender,
    registerRender,
    loginMethod,
    registerMethod,
    logoutMethod,
} = require('../app/Client/User/Controllers');
const {
    productsRender,
    detailProductRender,
} = require('../app/Client/Products/Product/product.Controller');
const {
    detailProductTypeRender,
} = require('../app/Client/Products/Product_type/product_type.Controller');
const {
    verifynotAuthentication,
    verifyAuthentication,
} = require('../app/Client/User/Middlewares');
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
router.route('/product-type/:id').get(detailProductTypeRender);
module.exports = router;
