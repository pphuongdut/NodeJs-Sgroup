const moment = require('moment');
const knex = require('../../../../database/knex');
// Render
const productsRender = async (req, res) => {
    const product_types = await knex('product_types').select('*');
    const joinProducts = await knex('products')
        .leftJoin(
            'product_types',
            'products.product_type_id ',
            'product_types.id',
        )
        .leftJoin('users', 'products.user_id', 'users.id')
        .select('*');
    const joinProductTypes = await knex('product_types')
        .leftJoin('users', 'product_types.user_id', 'users.id')
        .select('*');
    console.log(joinProducts);
    const usernow = req.session.user;
    return res.render('admin/pages/products', {
        title: ' Products',
        usernow: usernow,
        product_types: joinProductTypes,
        products: joinProducts,
        moment,
    });
};
const productTypeRender = async (req, res) => {
    const product_type_view = await knex('product_types').leftJoin('users','product_types.user_id','users.id')
        .where({ id: req.params.id })
        .select('*')
        .first();
    const usernow = req.session.user;
    return res.render('admin/pages/product_type', {
        title: 'product type',
        usernow: usernow,
        product_types: product_type_view,
        moment,
    });
};
//Method
const productTypeMethod = async (req, res, next) => {
    const { product_type_name } = req.body;
    const usernow = req.session.user;
    const onlyProductType = await knex('product_types')
        .where({ product_type_name: product_type_name })
        .select('product_type_name');
    if (onlyProductType.length !== 0) {
        return res.redirect('/products');
    } else
        await knex('product_types').insert({
            product_type_name: product_type_name,
            user_id: usernow.id,
        });

    // return res.redirect('/products');
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
    await knex('product_types')
        .where({
            id: req.params.id,
        })
        .delete();
    return res.redirect('/products');
};
const productMethod = async (req, res, Promise) => {
    const { product_name, product_description, product_type_id } = req.body;
    const idType = await knex('product_types')
        .where({ product_type_name: product_type_id })
        .select('*')
        .first();
    const usernow = req.session.user;
    console.log(req.body.product_type_id);
    console.log(req.product_name);
    await knex('products').insert({
        product_name: product_name,
        product_type_id: idType.id,
        product_description: product_description,
        user_id: usernow.id,
    });
    return res.redirect('/products');
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
    return res.redirect('/products');
};
const productDelete = async (req, res) => {
    await knex('products')
        .where({
            id: req.params.id,
        })
        .delete();
    return res.redirect('/products');
};
module.exports = {
    productsRender,
    productTypeMethod,
    productTypeRender,
    productTypeEdit,
    productTypeDelete,
    productMethod,
    productEdit,
    productDelete,
};
