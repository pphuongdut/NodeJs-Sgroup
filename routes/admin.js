const express = require('express');
const router = express.Router();
const {
    verifynotAuthentication,
    verifyAuthentication,
    validatorRegister,
} = require('../app/Admin/Auth/Middlewares/Auth.middleware');
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
    productTypeMethod,
    productTypeEdit,
    productTypeDelete
} = require('../app/Admin/Products/Controllers/Products.controller');
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
    .post(verifynotAuthentication, loginMethod);

//register
router
    .route('/register')
    .get(verifynotAuthentication, registerRender)
    .post(validatorRegister, registerMethod);
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
router
    .route('/products')
    .get(verifyAuthentication, productsRender)
//add product type
router.route('/addProductType').get(verifyAuthentication, productsRender).post(verifyAuthentication, productTypeMethod)
// edit product type
router.route('/editProductType/:id').put(verifyAuthentication, productTypeEdit);

//delete product type
router.route('/deleteProductType/:id').delete(verifyAuthentication, productTypeDelete);
module.exports = router;
