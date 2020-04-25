const moment = require('moment');
const knex = require('../../../../database/knex');

// render
const usersRender = async (req, res) => {
    return res.render('admin/pages/table', {
        title: 'Users',
        users: await knex('users').select('*'),
        usernow: req.session.user,
        moment,
    });
};

// method
const userView = async (req, res, Promise) => {
    return res.render('admin/pages/userprofile', {
        title: 'user',
        users: await knex('users')
            .where({
                user_slug: req.params.id,
            })
            .select('*'),
        usernow: req.session.user,
        moment,
    });
};

const userEdit = async (req, res) => {
    await knex('users')
        .where({
            id: req.params.id,
        })
        .update({
            fullname: req.body.fullname,
            username: req.body.username,
        });
    return res.redirect('/admin/users');
};

const userDelete = async (req, res) => {
    await knex('users')
        .where({
            id: req.params.id,
        })
        .delete();
    return res.redirect('/admin/users');
};
module.exports = {
    usersRender,
    userView,
    userEdit,
    userDelete,
};
