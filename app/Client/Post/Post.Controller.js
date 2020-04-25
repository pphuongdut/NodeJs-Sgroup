const knex = require('../../../database/knex');
const slugify = require('slugify');
const moment = require('moment');
//render
const newPostRender = async (req, res) => {
    return res.render('client/pages/new-post', {
        categories: await knex('categories').select('*'),
        product_types: await knex('product_types').select('*'),
        usernow: req.session.user,
    });
};

const postRender = async (req, res) => {
    return res.render('client/pages/post', {
        title: 'Post',
        posts: await knex('posts')
            .leftJoin('users', 'posts.user_id', 'users.id')
            .select('*'),
        usernow: req.session.user.id,
        moment,
        product_types: await knex('product_types').select('*'),
        categories: await knex('categories').select('*'),
    });
};
const postDetailRender = async (req, res) => {
    const postdetail = await knex('posts')
        .where({
            post_slug: req.params.id,
        })
        .leftJoin('users', 'posts.user_id', 'users.id')
        .select('*');
    return res.render('client/pages/postdetail', {
        title: postdetail.post_title,
        usernow: req.session.user.id,
        posts: postdetail,
        product_types: await knex('product_types').select('*'),
        moment,
    });
};
//method
const newPostMethod = async (req, res) => {
    await knex('posts').insert({
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        category_id: req.body.category_id,
        user_id: req.session.user.id,
        post_slug: slugify(req.body.post_title) + '-' + Date.now(),
    });
    return res.redirect('/posts');
};
module.exports = {
    newPostRender,
    newPostMethod,
    postRender,
    postDetailRender,
};
