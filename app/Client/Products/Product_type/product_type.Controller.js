const knex = require('../../../../database/knex');
const detailProductTypeRender = async (req, res) => {
    console.log(req.params.id);
    const products = await knex('products')
        .leftJoin(
            'product_types',
            'products.product_type_id',
            'product_types.id',
        )
        .where({ product_type_slug: req.params.id })
        .select('*');
    const product_types = await knex('product_types').select('*');
    return res.render('client/pages/product_type', {
        product_types: product_types,
        products: products,
        usernow: req.session.user,
    });
};
module.exports = { detailProductTypeRender };
