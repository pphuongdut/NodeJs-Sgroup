const express = require('express');
const router = express.Router();

const {
    verifynotAuthentication,
    verifyAuthentication,
} = require('../app/Admin/Auth/Middlewares/Auth.middleware');
const { validatorRegister } = require('../app/Admin/Auth/Validators/Validator');
const {
    loginRender,
    registerRender,
    homepageRender,
    dashboardRender,
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
const {
    productsRender,
    productMethod,
    productEdit,
    productDelete,
    productUploadfile,
} = require('../app/Admin/Products/Product/Controllers/Product.controller');
const {
    productTypeMethod,
    productTypeRender,
    productTypeEdit,
    productTypeDelete,
} = require('../app/Admin/Products/Product_type/Controllers/Product_type.controller');
const {
    uploadFile,
} = require('../app/Admin/Products/Product/Middlewares/Product.middleware');
// users
router.get('/users', verifyAuthentication, usersRender);
//home
router.get('/', homepageRender);
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
//add product type
router
    .route('/product-type/add')
    .get(verifyAuthentication, productsRender)
    .post(verifyAuthentication, productTypeMethod);
//view product type
router.route('/product/:id').get(verifyAuthentication, productTypeRender);
// edit product type
router
    .route('/product-type/:id/update')
    .put(verifyAuthentication, productTypeEdit);

//delete product type
router
    .route('/product-type/:id/delete')
    .delete(verifyAuthentication, productTypeDelete);
//add product
router
    .route('/product/add')
    .get(verifyAuthentication, productsRender)
    .post(verifyAuthentication, productMethod);
// edit product
router.route('/product/:id/update').put(verifyAuthentication, productEdit);
//delete product
router.route('/product/:id/delete').delete(verifyAuthentication, productDelete);
router.route('/product/:id/add-img').post(uploadFile, productUploadfile);
//upload.single('imgProduct')
module.exports = router;
