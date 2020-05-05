const knex = require('../../../database/knex');
const slugify = require('slugify');
const moment = require('moment');
//render
const newPostRender = async (req, res) => {
    return res.render('client/pages/new-post', {
        categories: await knex('categories').select('*'),
        product_types: await knex('product_types').select('*'),
        tags: await knex('tags').select('*'),
        usernow: req.session.user,
    });
};

const postRender = async (req, res) => {
    const posts = await knex('posts')
        .leftJoin('categories', 'posts.category_id', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .select('*');
    const tags = await knex('tags').select('*');
    return res.render('client/pages/post-main', {
        title: 'Post',
        posts,
        moment,
        product_types: await knex('product_types').select('*'),
        categories: await knex('categories').select('*'),
        products: await knex('products').select('*'),
        tags,
    });
};
const postDetailRender = async (req, res) => {
    const posts = await knex('posts')
        .leftJoin('categories', 'posts.category_id', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .select('*');
    const postdetail = await knex('posts')
        .where({
            post_slug: req.params.id,
        })
        .leftJoin('categories', 'posts.category_id', 'categories.category_id')
        .leftJoin('users', 'posts.user_id', 'users.id')
        .select('*');
    const tag_of_post = await knex('post_tags')
        .leftJoin('posts', 'post_tags.post_id', 'posts.post_id')
        .leftJoin('tags', 'post_tags.tag_id', 'tags.tag_id')
        .where({
            post_slug: req.params.id,
        })
        .select('*');
    console.log(postdetail);
    const tags = await knex('tags').select('*');
    return res.render('client/pages/postdetail', {
        title: postdetail.post_title,
        posts,
        postdetail: postdetail,
        product_types: await knex('product_types').select('*'),
        categories: await knex('categories').select('*'),
        products: await knex('products').select('*'),
        moment,
        tags,
        posts,
        tag_of_post,
    });
};
//method

const newPostMethod = async (req, res) => {
    const post_id = await knex('posts')
        .insert({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            category_id: req.body.category_id,
            user_id: req.session.user.id,
            post_slug: slugify(req.body.post_title) + '-' + Date.now(),
            img_src: req.body.imgPost,
        })
        .returning('post_id');
    const tag = req.body.tags;
    const tags = tag.split(' ');
    for (index = 0; index < tags.length; ++index) {
        const tag_exist = await knex('tags')
            .where({
                tag_name: tags[index],
            })
            .first('*');
        console.log(tag_exist);
        if (typeof tag_exist != 'undefined') {
            if (tags[index] != ' ') {
                const tag_id = tag_exist.tag_id;
                await knex('post_tags').insert({
                    tag_id: tag_id,
                    post_id: post_id,
                });
            }
        } else {
            const tag_id = await knex('tags').insert({
                tag_name: tags[index],
            });
            await knex('post_tags').insert({
                tag_id: tag_id,
                post_id: post_id,
            });
        }
    }
    return res.redirect('/posts');
};
module.exports = {
    newPostRender,
    newPostMethod,
    postRender,
    postDetailRender,
};
