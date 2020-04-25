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
const {
    newPostMethod,
    newPostRender,
    postRender,
    postDetailRender,
} = require('../app/Client/Post/Post.Controller');
const {
    categoryDetailRender,
} = require('../app/Client/Categories/Category.Controller');
// home render
router.get('/Judostore', productsRender);
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
//Product
router.route('/product/:id').get(detailProductRender);
//Product Type
router.route('/product-type/:id').get(detailProductTypeRender);

// POSTs
router.route('/new-post').get(newPostRender).post(newPostMethod);
router.route('/posts').get(postRender);
router.route('/post/:id').get(postDetailRender);
// CATEGORIES
router.route('/category/:id').get(categoryDetailRender);
module.exports = router;
