const moment = require('moment');
const knex = require('../../../../database/knex');
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
            'products.user_id as user_id',
            'products.product_type_id as product_type_id',
            'product_name',
            'product_description',
            'fullname',
        );
    const joinProductTypes = await knex('product_types')
        .leftJoin('users', 'product_types.user_id', 'users.id')
        .select(
            'product_types.id as product_type_id',
            'fullname',
            'product_type_name',
        );
    return res.render('admin/pages/products', {
        title: ' Products',
        usernow: usernow,
        product_types: joinProductTypes,
        products: joinProducts,
        moment,
    });
};
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
        .select('*')
        // .leftJoin('users', 'product_types.user_id', 'users.id')
        // .select(
        //     'product_types.id as product_type_id',
        //     'users.fullname',
        //     'product_type_name',
        // );
        console.log(joinProductTypes)
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
        return res.redirect('/products');
    }
    if (onlyProductType.length == 0) {
        await knex('product_types').insert({
            product_type_name: product_type_name,
            user_id: usernow.id,
        });
        return res.redirect('/products');
    }
};
const productTypeEdit = async (req, res) => {
    const { product_type_name } = req.body;
    const onlyProductType = await knex('product_types')
        .where({ product_type_name: product_type_name })
        .select('*');
    if (onlyProductType.length !== 0) {
        return res.redirect('/products');
    }
    if (onlyProductType.length == 0) {
        await knex('product_types')
            .where({
                id: req.params.id,
            })
            .update({
                product_type_name: product_type_name,
            });
        return res.redirect('/products');
    }
};
const productTypeDelete = async (req, res) => {
    await knex('product_types')
        .where({
            id: req.params.id,
        })
        .delete();
    console.log('deleted');
    return res.redirect('/products');
};
const productMethod = async (req, res, Promise) => {
    const usernow = req.session.user;
    const { product_name, product_description, product_type_id } = req.body;
    console.log(req.body);
    const idType = await knex('product_types')
        .where({ product_type_name: product_type_id })
        .select('*')
        .first();
    console.log(idType);
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
    console.log(req.params.id);
    await knex('products')
        .where({
            id: req.params.id,
        })
        .delete();
    console.log('delete ok');
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
