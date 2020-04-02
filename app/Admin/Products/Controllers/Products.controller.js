const moment = require('moment');
const knex = require('../../../../database/knex');
// Render
const productsRender = async (req, res) => {
    const product_types = await knex('product_types').select('*');
    const usernow = req.session.user;
    return res.render('admin/pages/products', {
        title: ' Products',
        usernow: usernow,
        product_types: product_types,
        moment,
    });
};
//Method
const productTypeMethod = async (req, res, Promise) => {
    const product_type_name = req.body.product_type_name;
    const usernow = req.session.user;
    console.log(req.product_type_name);
    await knex('product_types').insert({
        product_type_name: product_type_name,
        user_id: usernow.id,
    });
    return res.redirect('/products');
};
const productTypeEdit = async (req, res) => {
    const { product_type_name } = req.body;
    await knex('product_types')
        .where({
            id: req.params.id,
        })
        .update({
            product_type_name: product_type_name,
        });
    return res.redirect('/products');
};
const productTypeDelete = async (req, res) => {
    const { product_type_name } = req.body;
    await knex('product_types').where({
        id: req.params.id
    }).delete()
    return res.redirect('/products')
};
module.exports = {
    productsRender,
    productTypeMethod,
    productTypeEdit,
    productTypeDelete
};
