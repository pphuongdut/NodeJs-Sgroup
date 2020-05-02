const knex = require('../../../database/knex');
const moment = require('moment');
//render
const tagRender = async (req, res) => {
    const tags = await knex('post_tags')
        .leftJoin('tags', 'post_tags.tag_id', 'tags.tag_id')
        .select('*');
    const posts = await knex('posts')
        .leftJoin('post_tags', 'posts.post_id', 'post_tags.post_id')
        .where({
            tag_id: req.params.id,
        })
        .select('*');
    return res.render('client/pages/post-tag', {
        title: 'POST TAG',
        posts,

        moment,
        product_types: await knex('product_types').select('*'),
        categories: await knex('categories').select('*'),
        products: await knex('products').select('*'),
        tags,
    });
};

module.exports = {
    tagRender,
};
