const knex = require('../../database/knex');
const productsRender = async (req, res) => {
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
    console.log(products_clothes);
    return res.render('client/products', {
        products,
        products_clothes,
    });
};
module.exports = {
    productsRender,
};
