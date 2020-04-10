const moment = require('moment');
const knex = require('../../../../../database/knex');
const productTypeRender = async (req, res) => {
    const usernow = req.session.user;
    const joinProducts = await knex('products')
        .where({
            product_type_id: req.params.id,
        })
        .leftJoin(
            'product_types',
            'products.product_type_id ',
            'product_types.id',
        )
        .leftJoin('users', 'products.user_id', 'users.id')
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
        .where({ id: req.params.id })
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
        });
        return res.redirect('/admin/products');
    }
};
const productTypeEdit = async (req, res) => {
    const { product_type_name } = req.body;
    const onlyProductType = await knex('product_types')
        .where({ product_type_name: product_type_name })
        .select('*');
    if (onlyProductType.length !== 0) {
        return res.redirect('/admin/products');
    }
    if (onlyProductType.length == 0) {
        await knex('product_types')
            .where({
                id: req.params.id,
            })
            .update({
                product_type_name: product_type_name,
            });
        return res.redirect('/admin/products');
    }
};
const productTypeDelete = async (req, res) => {
    await knex('product_types')
        .where({
            id: req.params.id,
        })
        .delete();
    console.log('deleted');
    return res.redirect('/admin/products');
};
module.exports = {
    productTypeMethod,
    productTypeRender,
    productTypeEdit,
    productTypeDelete,
};
