const knex = require('../../database/knex');
const productsRender = async (req, res) => {
    const products = await knex('products')
        .leftJoin(
            'product_types',
            'products.product_type_id',
            'product_types.id',
        )
        .select('*');

    console.log(products);
    return res.render('client/products', {
        products: products,
    });
};
module.exports = {
    productsRender,
};
