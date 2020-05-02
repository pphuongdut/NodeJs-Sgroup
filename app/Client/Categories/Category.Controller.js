const knex = require('../../../database/knex');
const slugify = require('slugify');
const moment = require('moment');
//render
const categoryDetailRender = async (req, res) => {
    const posts = await knex('posts')
        .leftJoin('categories', 'posts.category_id', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .where({
            category_slug: req.params.id,
        })
        .select('*');
    const tags = await knex('post_tags')
        .leftJoin('tags', 'post_tags.tag_id', 'tags.tag_id')
        .select('*');
    return res.render('client/pages/categorydetail', {
        title: posts.post_title,
        posts,
        product_types: await knex('product_types').select('*'),
        products: await knex('products').select('*'),
        moment,
        categories: await knex('categories').select('*'),
        tags,
    });
};
module.exports = {
    categoryDetailRender,
};
