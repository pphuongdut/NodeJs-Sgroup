const moment = require('moment');
const knex = require('../../../../../database/knex');
const slugify = require('slugify');
const productTypesRender = async (req, res) => {
    const usernow = req.session.user;
    const joinProductTypes = await knex('product_types')
        .leftJoin('users', 'product_types.user_id', 'users.id')
        .select(
            'product_types.id as product_type_id',
            'fullname',
            'product_type_name',
            'product_type_slug',
        );
    return res.render('admin/pages/product_types', {
        title: ' Product types',
        usernow: usernow,
        product_types: joinProductTypes,
        moment,
    });
};

const productTypeRender = async (req, res) => {
    const usernow = req.session.user;
    const joinProducts = await knex('products')
        .leftJoin(
            'product_types',
            'products.product_type_id ',
            'product_types.id',
        )
        .leftJoin('users', 'products.user_id', 'users.id')
        .where({
            product_type_slug: req.params.id,
        })
        .select(
            'product_type_name',
            'products.id as product_id',
            'products.user_id as user_id',
            'products.product_type_id as product_type_id',
            'product_name',
            'product_description',
            'fullname',
        );
    const joinProductTypes = await knex('product_types')
        .where({ product_type_slug: req.params.id })
        .select('*');
    console.log(joinProductTypes);
    return res.render('admin/pages/product_type', {
        title: ' Product type',
        usernow: usernow,
        product_types: joinProductTypes,
        products: joinProducts,
        moment,
    });
};
//Method
const productTypeMethod = async (req, res, next) => {
    const { product_type_name } = req.body;
    const usernow = req.session.user;
    const onlyProductType = await knex('product_types')
        .where({ product_type_name: product_type_name })
        .select('*');
    console.log(onlyProductType);
    if (onlyProductType.length !== 0) {
        console.log('trùng tên');
        return res.redirect('/admin/products');
    }
    if (onlyProductType.length == 0) {
        await knex('product_types').insert({
            product_type_name: product_type_name,
            user_id: usernow.id,
            product_type_slug: slugify(product_type_name) + '-' + Date.now(),
        });
        return res.redirect('/admin/product-types');
    }
};
const productTypeEdit = async (req, res) => {
    const { product_type_name } = req.body;
    const onlyProductType = await knex('product_types')
        .where({ product_type_name: product_type_name })
        .select('*');
    if (onlyProductType.length !== 0) {
        return res.redirect('/admin/product-types');
    }
    if (onlyProductType.length == 0) {
        await knex('product_types')
            .where({
                id: req.params.id,
            })
            .update({
                product_type_name: product_type_name,
            });
        return res.redirect('/admin/product-types');
    }
};
const productTypeDelete = async (req, res) => {
    await knex('product_types')
        .where({
            id: req.params.id,
        })
        .delete();
    console.log('deleted');
    return res.redirect('/admin/product-types');
};
module.exports = {
    productTypeMethod,
    productTypeRender,
    productTypeEdit,
    productTypeDelete,
    productTypesRender,
};
