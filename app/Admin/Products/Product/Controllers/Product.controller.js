const moment = require('moment');
const knex = require('../../../../../database/knex');
const path = require('path');
// Render
const productsRender = async (req, res) => {
    const usernow = req.session.user;
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
        usernow: usernow,
        product_types: joinProductTypes,
        products: joinProducts,
        moment,
    });
};

const productMethod = async (req, res, Promise) => {
    const usernow = req.session.user;
    const { product_name, product_description, product_type_id } = req.body;
    console.log(req.body);
    await knex('products').insert({
        product_name: product_name,
        product_type_id: product_type_id,
        product_description: product_description,
        user_id: usernow.id,
    });
    return res.redirect('/admin/products');
};

const productEdit = async (req, res) => {
    const { product_name, product_description } = req.body;
    await knex('products')
        .where({
            id: req.params.id,
        })
        .update({
            product_name: product_name,
            product_description: product_description,
        });
    return res.redirect('/admin/products');
};
const productDelete = async (req, res) => {
    console.log(req.params.id);
    await knex('products')
        .where({
            id: req.params.id,
        })
        .delete();
    console.log('delete ok');
    return res.redirect('/admin/products');
};
const productUploadfile = async (req, res) => {
    console.log(req.file);
    await knex('products').where({ id: req.params.id }).update({
        img_src: req.file.filename,
    });
    return res.redirect('/admin/products');
};
module.exports = {
    productsRender,
    productMethod,
    productEdit,
    productDelete,
    productUploadfile,
};