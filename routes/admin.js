const express = require('express');
const router = express.Router();
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
const {
    categoryRender,
    categoryMethod,
    categoryEdit,
    categoryDelete,
    categoryDetailRender,
} = require('../app/Admin/Categories/Category.controller');
const postController = require('../app/Admin/Posts/Post.Controller');
// admin render
router
    .route('/users')
    .get(verifyAuthentication, verifynotAuthorization, usersRender);

router
    .route('/')
    .get(verifynotAuthorization, verifynotAuthorization, homepageRender);
router.route('/dashboard').get(verifynotAuthorization, dashboardRender);
//admin method
router
    .route('/login')
    .get(verifynotAuthentication, loginRender)
    .post(loginMethod);

router
    .route('/register')
    .get(verifynotAuthentication, registerRender)
    .post(registerMethod);
router.post('/logout', logoutMethod);
//USER
router
    .route('/users/:id')
    .get(verifyAuthentication, verifynotAuthorization, userView);
router.route('/edit/:id').put(verifyAuthentication, userEdit);
router.route('/delete/:id').delete(verifyAuthentication, userDelete);

// Product Type

router.route('/product-types').get(verifyAuthentication, productTypesRender);
router
    .route('/product-type/add')
    .get(verifyAuthentication, productsRender)
    .post(verifyAuthentication, productTypeMethod);
router.route('/product-type/:id').get(verifyAuthentication, productTypeRender);
router
    .route('/product-type/:id/update')
    .put(verifyAuthentication, productTypeEdit);
router
    .route('/product-type/:id/delete')
    .delete(verifyAuthentication, productTypeDelete);
// Product
router.route('/products').get(verifyAuthentication, productsRender);
router.route('/product/:id').get(verifyAuthentication, productRender);
router
    .route('/product/add')
    .get(verifyAuthentication, productsRender)
    .post(verifyAuthentication, uploadFile.single('imgProduct'), productMethod);
router
    .route('/product/:id/update')
    .put(verifyAuthentication, verifyAuthorization, productEdit);
router
    .route('/product/:id/update/client')
    .put(verifyAuthentication, verifyAuthorization, productEditClient);
router
    .route('/product/:id/delete')
    .delete(verifyAuthentication, verifyAuthorization, productDelete);
router
    .route('/product/:id/delete/client')
    .delete(verifyAuthentication, verifyAuthorization, productDeleteClient);
router
    .route('/product/:id/add-img')
    .post(uploadFile.single('imgProduct'), productUploadfile);

//route relate role
router.route('/role/add').post(addRole);

//CATEGORIES
router.route('/categories').get(categoryRender).post(categoryMethod);
router.route('/category/:id/').get(categoryDetailRender);
router.route('/category/:id/delete').delete(categoryDelete);
router.route('/category/:id/update').put(categoryEdit);
// POSTS
router.route('/posts').get(postController.postRender);
router.route('/post/:id').get(postController.postDetailRender);
router.route('/post/:id/update').put(postController.postEdit);
router.route('/post/:id/delete').delete(postController.postDelete);
module.exports = router;
