const moment = require('moment');
const knex = require('../../../../../database/knex');
const path = require('path');
const slugify = require('slugify');
// Render
const productsRender = async (req, res) => {
    const joinProducts = await knex('products')
        .leftJoin(
            'product_types',
            'products.product_type_id ',
            'product_types.id',
        )
        .leftJoin('users', 'products.user_id', 'users.id')
        .select(
            'product_type_name',
            'products.id as product_id',
            'product_name',
            'product_description',
            'fullname',
            'product_slug',
        );
    const joinProductTypes = await knex('product_types')
        .leftJoin('users', 'product_types.user_id', 'users.id')
        .select(
            'product_types.id as product_type_id',
            'fullname',
            'product_type_name',
            'product_type_slug',
        );
    return res.render('admin/pages/products', {
        title: ' Products',
        usernow: req.session.user,
        product_types: joinProductTypes,
        products: joinProducts,
        moment,
    });
};

const productRender = async (req, res) => {
    const joinProduct = await knex('products')
        .where({ product_slug: req.params.id })
        .leftJoin(
            'product_types',
            'products.product_type_id ',
            'product_types.id',
        )
        .leftJoin('users', 'products.user_id', 'users.id')
        .select(
            'product_type_name',
            'products.id as product_id',
            'product_name',
            'product_description',
            'fullname',
            'product_slug',
        );
    return res.render('admin/pages/product', {
        title: ' Product',
        usernow: req.session.user,
        product: joinProduct,
        moment,
    });
};
//method
const productMethod = async (req, res, Promise) => {
    console.log(req.file);

    const { product_name, product_description, product_type_id } = req.body;
    console.log(req.body);
    await knex('products').insert({
        product_name: product_name,
        product_type_id: product_type_id,
        product_description: product_description,
        user_id: req.session.user.id,
        product_slug: slugify(product_name) + '-' + Date.now(),
        // img_src: req.file.filename,
    });
    return res.redirect('/admin/products');
};

const productEdit = async (req, res) => {
    await knex('products')
        .where({
            product_slug: req.params.id,
        })
        .update({
            product_name: req.body.product_name,
            product_description: req.body.product_description,
        });
    return res.redirect('/admin/products');
};

const productDelete = async (req, res) => {
    await knex('products')
        .where({
            product_slug: req.params.id,
        })
        .delete();
    return res.redirect('/admin/products');
};
const productUploadfile = async (req, res) => {
    await knex('products').where({ product_slug: req.params.id }).update({
        img_src: req.file.filename,
    });
    return res.redirect('/admin/products');
};
const productDeleteClient = async (req, res) => {
    await knex('products')
        .where({
            product_slug: req.params.id,
        })
        .delete();
    return res.redirect('/Judostore');
};
const productEditClient = async (req, res) => {
    await knex('products')
        .where({
            product_slug: req.params.id,
        })
        .update({
            product_name: req.body.product_name,
            product_description: req.body.product_description,
        });
    return res.redirect('/Judostore');
};

module.exports = {
    productsRender,
    productRender,
    productMethod,
    productEdit,
    productDelete,
    productUploadfile,
    productDeleteClient,
    productEditClient,
};
