const knex = require('../../../../database/knex');
const productsRender = async (req, res) => {
    const usernow = req.session.user;
    const product_types = await knex('product_types').select('*');
    const products = await knex('products')
        .leftJoin(
            'product_types',
            'products.product_type_id',
            'product_types.id',
        )
        .select('*');
    const products_clothes = await knex('products')
        .leftJoin(
            'product_types',
            'products.product_type_id',
            'product_types.id',
        )
        .where({ product_type_name: 'clothes' })
        .select('*');

    return res.render('client/pages/products', {
        product_types: product_types,
        products,
        products_clothes,
        usernow,
    });
};
const detailProductRender = async (req, res) => {
    const usernow = req.session.user;
    console.log(req.params.id);
    const products = await knex('products')
        .where({ product_slug: req.params.id })
        .select('*');
    const product_types = await knex('product_types').select('*');
    return res.render('client/pages/detail-product', {
        product_types: product_types,
        products: products,
        usernow,
    });
};

module.exports = {
    productsRender,
    detailProductRender,
};
