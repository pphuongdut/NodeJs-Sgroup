const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
    verifynotAuthentication,
    verifyAuthentication,
} = require('../app/Admin/Auth/Middlewares/Auth.middleware');
const {
    verifynotAuthorization,
    verifyAuthorization,
} = require('../app/Admin/Auth/Middlewares/Authorization.middleware');
const {
    validatorRegister,
    validatorLogin,
} = require('../app/Admin/Auth/Validators/Validator');
const {
    loginRender,
    registerRender,
    homepageRender,
    dashboardRender,
    loginMethod,
    registerMethod,
    logoutMethod,
    addRole,
} = require('../app/Admin/Auth/Controllers/Auth.controller');
const {
    usersRender,
    userView,
    userEdit,
    userDelete,
} = require('../app/Admin/User/Controllers/User.controller');
const {
    productsRender,
    productMethod,
    productRender,
    productEdit,
    productDelete,
    productUploadfile,
    productDeleteClient,
    productEditClient,
} = require('../app/Admin/Products/Product/Controllers/Product.controller');
const {
    productTypeMethod,
    productTypesRender,
    productTypeRender,
    productTypeEdit,
    productTypeDelete,
} = require('../app/Admin/Products/Product_type/Controllers/Product_type.controller');
const {
    uploadFile,
} = require('../app/Admin/Products/Product/Middlewares/Product.middleware');
// users
router.route('/users').get(verifyAuthentication, usersRender);
//home
router.route('/').get(homepageRender);
//dashboard
router.get('/dashboard', dashboardRender);
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
//USER
//view user
router.route('/users/:id').get(verifyAuthentication, userView);

// edit user
router.route('/edit/:id').put(verifyAuthentication, userEdit);

//delete user
router.route('/delete/:id').delete(verifyAuthentication, userDelete);

// PRODUCT
//view products table
router.route('/products').get(verifyAuthentication, productsRender);
//view product types table
router.route('/product-types').get(verifyAuthentication, productTypesRender);
//add product type
router
    .route('/product-type/add')
    .get(verifyAuthentication, productsRender)
    .post(verifyAuthentication, productTypeMethod);
//view product type
router.route('/product-type/:id').get(verifyAuthentication, productTypeRender);
// edit product type
router
    .route('/product-type/:id/update')
    .put(verifyAuthentication, productTypeEdit);

//delete product type
router
    .route('/product-type/:id/delete')
    .delete(verifyAuthentication, productTypeDelete);

//view product
router.route('/product/:id').get(verifyAuthentication, productRender);

//add product
router
    .route('/product/add')
    .get(verifyAuthentication, productsRender)
    .post(verifyAuthentication, productMethod);
// edit product
router
    .route('/product/:id/update')
    .put(verifyAuthentication, verifyAuthorization, productEdit);
router
    .route('/product/:id/update/client')
    .put(verifyAuthentication, verifyAuthorization, productEditClient);
//delete product
router
    .route('/product/:id/delete')
    .delete(verifyAuthentication, verifyAuthorization, productDelete);
router
    .route('/product/:id/delete/client')
    .delete(verifyAuthentication, verifyAuthorization, productDeleteClient);
//upload.single('imgProduct')
router.route('/product/:id/add-img').post(uploadFile, productUploadfile);

//route relate role
router.route('/role/add').post(addRole);
module.exports = router;
