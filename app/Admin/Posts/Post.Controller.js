const moment = require('moment');
const knex = require('../../../database/knex');
const slugify = require('slugify');
// Render
const postRender = async (req, res) => {
    const joinpost = await knex('posts')
        .leftJoin('categories', 'posts.category_id ', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .select('*');
    return res.render('admin/pages/posts', {
        title: 'posts',
        usernow: req.session.user,
        posts: joinpost,
        moment,
    });
};
const postDetailRender = async (req, res) => {
    const joinpost = await knex('posts')
        .leftJoin('categories', 'posts.category_id ', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .where({
            post_slug: req.params.id,
        })
        .first('*');
    return res.render('admin/pages/postdetail', {
        title: 'post',
        usernow: req.session.user,
        post: joinpost,
        moment,
    });
};
const postEdit = async (req, res) => {
    const { category_id, post_title, post_content } = req.body;
    await knex('posts')
        .where({
            post_slug: req.params.id,
        })
        .update({
            post_title: post_title,
            post_slug: slugify(post_title) + '-' + Date.now(),
            post_content: post_content,
            category_id: category_id,
        });
    return res.redirect('/admin/posts');
};
const postEditClient = async (req, res) => {
    const { category_id, post_title, post_content } = req.body;
    await knex('posts')
        .where({
            post_slug: req.params.id,
        })
        .update({
            post_title: post_title,
            post_slug: slugify(post_title) + '-' + Date.now(),
            post_content: post_content,
            category_id: category_id,
        });
    return res.redirect('/posts');
};
const postDelete = async (req, res) => {
    await knex('posts')
        .where({
            post_slug: req.params.id,
        })
        .delete();
    console.log('delete ok');
    return res.redirect('/admin/posts');
};
const postDeleteClient = async (req, res) => {
    await knex('posts')
        .where({
            post_slug: req.params.id,
        })
        .delete();
    console.log('delete ok');
    return res.redirect('/posts');
};

module.exports = {
    postRender,
    postDetailRender,
    postEdit,
    postEditClient,
    postDelete,
    postDeleteClient,
};
