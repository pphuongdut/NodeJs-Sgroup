const knex = require('../../../database/knex');
const moment = require('moment');
const slugify = require('slugify');
//render
const categoryRender = async (req, res) => {
    const joinCategories = await knex('categories')
        .leftJoin('users', 'categories.user_id', 'users.id')
        .select('*');
    return res.render('admin/pages/categories', {
        title: 'Categories',
        categories: joinCategories,
        moment,
        usernow: req.session.user.id,
    });
};
const categoryDetailRender = async (req, res) => {
    const posts = await knex('posts')
        .leftJoin('categories', 'posts.category_id', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .where({
            category_slug: req.params.id,
        })
        .select('*');
    return res.render('admin/pages/categorydetail', {
        title: posts.post_title,
        usernow: req.session.user.id,
        posts,
        product_types: await knex('product_types').select('*'),
        moment,
        categories: await knex('categories')
            .where({
                category_slug: req.params.id,
            })
            .select('*'),
    });
};
//method
const categoryMethod = async (req, res, next) => {
    const { category_name } = req.body;
    const onlyCategory = await knex('categories')
        .where({ category_name: category_name })
        .select('*');
    if (onlyCategory.length == 0) {
        await knex('categories').insert({
            category_name: category_name,
            user_id: req.session.user.id,
            category_slug: slugify(category_name) + '-' + Date.now(),
        });
    }
    return res.redirect('/admin/categories');
};
const categoryEdit = async (req, res) => {
    const { category_name } = req.body;
    const onlycategory = await knex('categories')
        .where({ category_name: category_name })
        .select('*');
    if (onlycategory.length !== 0) {
        return res.redirect('/admin/categories');
    }
    if (onlycategory.length == 0) {
        await knex('categories')
            .where({
                category_slug: req.params.id,
            })
            .update({
                category_name: category_name,
                category_slug: slugify(category_name) + '-' + Date.now(),
            });
        return res.redirect('/admin/categories');
    }
};
const categoryDelete = async (req, res) => {
    await knex('categories')
        .where({
            category_slug: req.params.id,
        })
        .delete();
    console.log('deleted');
    return res.redirect('/admin/categories');
};
module.exports = {
    categoryRender,
    categoryDetailRender,
    categoryMethod,
    categoryEdit,
    categoryDelete,
};
