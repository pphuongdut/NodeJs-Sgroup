const knex = require('../../../database/knex');
const slugify = require('slugify');
const moment = require('moment');
const categoryDetailRender = async (req, res) => {
    const posts = await knex('posts')
        .leftJoin('categories', 'posts.category_id', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .where({
            category_slug: req.params.id,
        })
        .select('*');
    return res.render('client/pages/categorydetail', {
        title: posts.post_title,
        usernow: req.session.user.id,
        posts,
        product_types: await knex('product_types').select('*'),
        moment,
        categories: await knex('categories').select('*'),
    });
};
module.exports = {
    categoryDetailRender,
};
